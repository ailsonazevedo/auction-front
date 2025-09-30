import { IResponse } from "@/@types/IResponse";
import {
  Autocomplete,
  CircularProgress,
  SxProps,
  TextField,
  Tooltip,
  debounce,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";

import { LoadingIconsErros } from "../Error/LoadingIconsErros";

interface HasId {
  id: string;
}

interface SimpleAutocompleteFilterProps<T extends HasId> {
  apiEndpoint: {
    getList: (params: string) => Promise<IResponse<T>>;
  };
  customLabel?: (option: T) => string;
  disabled?: boolean;
  label?: string;
  labelProp?: keyof T;
  queryKey: string[];
  selectFields?: string;
  setState: React.Dispatch<React.SetStateAction<null | string>>;
  sortProp?: keyof T;
  state: null | string;
  sx?: SxProps;
  sxInput?: SxProps;
  testId?: string;
}

const SimpleAutocompleteFilter = <T extends HasId>({
  apiEndpoint,
  customLabel,
  disabled,
  label,
  labelProp,
  queryKey,
  selectFields = "",
  setState,
  sortProp,
  state,
  sx,
  sxInput,
  testId,
}: SimpleAutocompleteFilterProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const getOptionLabel = (option: T | string) => {
    if (typeof option === "string") return option;
    if (customLabel) return customLabel(option);
    if (labelProp) return String(option[labelProp]);
    return "";
  };

  const { data: initialItemData, isLoading: isLoadingInitial } = useQuery({
    enabled: !!state && isInitialLoading,
    queryFn: async (): Promise<IResponse<T>> => {
      const params = `?search=${state}${selectFields ? `&select=${selectFields}` : ""}`;
      return apiEndpoint.getList(params);
    },
    queryKey: [...queryKey, "initial", state],
    refetchOnWindowFocus: false,
    retry: false,
  });

  // 2. Lógica para buscar a lista (preview ou por termo)
  const {
    data: listData,
    isError: isErrorDataList,
    isLoading: isLoadingList,
  } = useQuery({
    enabled: !state || !isInitialLoading,
    queryFn: async (): Promise<IResponse<T>> => {
      const hasSearch = searchTerm.length >= 3;
      const limit = hasSearch ? -1 : 20;
      const searchFilter = hasSearch ? `&search=${searchTerm}` : "";
      const limitFilter = `&limit=${limit}`;
      const sort = `&sortBy=${String(sortProp ?? "nome")}:ASC`;
      const pageFilter = hasSearch ? "" : "&page=1";
      const select = selectFields ? `select=${selectFields}` : "";

      const params =
        `?${select}${searchFilter}${limitFilter}${pageFilter}${sort}`.replace(
          "?&",
          "?",
        );
      return apiEndpoint.getList(params);
    },
    queryKey: [...queryKey, "list", searchTerm],
    refetchOnWindowFocus: false,
  });

  // Efeito para definir o valor inicial uma única vez
  useEffect(() => {
    const initialItem = initialItemData?.data?.[0];
    if (initialItem && isInitialLoading) {
      setSelectedItem(initialItem);
      setInputValue(getOptionLabel(initialItem));
      setIsInitialLoading(false);
    }
    if (!initialItem && !isLoadingInitial) {
      setIsInitialLoading(false);
    }
  }, [initialItemData, isInitialLoading, isLoadingInitial]);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    [],
  );

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    setInputValue(value);
    debouncedSearch(value);

    if (value === "") {
      setState(null);
      setSelectedItem(null);
      setSearchTerm("");
    }
  };

  const handleChange = (event: React.SyntheticEvent, value: T | null) => {
    setSelectedItem(value);
    setState(value?.id || null);
    setInputValue(value ? getOptionLabel(value) : "");
  };

  const isLoading = isLoadingInitial || isLoadingList;
  const options = listData?.data || (selectedItem ? [selectedItem] : []);

  let noOptionsTextMessage;
  if (isLoading) {
    noOptionsTextMessage = <CircularProgress color="inherit" size={20} />;
  } else {
    noOptionsTextMessage =
      searchTerm.length >= 3
        ? "Nenhum item encontrado"
        : "Digite pelo menos 3 caracteres";
  }

  return (
    <Autocomplete
      blurOnSelect
      clearOnEscape
      clearText="Limpar"
      closeText="Fechar"
      disabled={disabled}
      filterOptions={(x) => x}
      getOptionLabel={getOptionLabel}
      id="simple-autocomplete-filter"
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      loading={isLoading}
      loadingText="Buscando..."
      noOptionsText={noOptionsTextMessage}
      onChange={handleChange}
      onInputChange={handleInputChange}
      openText="Abrir"
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                {isLoading && <CircularProgress color="inherit" size={20} />}
                {isErrorDataList && (
                  <Tooltip title="Erro ao buscar os dados">
                    <LoadingIconsErros invalidateQuery={queryKey} />
                  </Tooltip>
                )}
              </>
            ),
          }}
          data-testid={testId}
          label={label}
          placeholder="Digite para buscar..."
          size="small"
          sx={{
            minWidth: 180,
            ...sxInput,
            "& .MuiInputBase-root": { minHeight: "44.5px" },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {getOptionLabel(option)}
        </li>
      )}
      sx={{ minWidth: 180, ...sx }}
      value={selectedItem}
    />
  );
};

export { SimpleAutocompleteFilter };
