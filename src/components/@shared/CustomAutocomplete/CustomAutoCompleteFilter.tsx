import {
  Autocomplete,
  CircularProgress,
  SxProps,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import React from "react";

import { LoadingIconsErros } from "../Error/LoadingIconsErros";

interface HasId {
  id: string;
}
interface Props<T extends HasId> extends Omit<TextFieldProps, "name"> {
  customLabel?: (option: T) => string;
  data: T[] | undefined;
  invalidateQuery: string[];
  label?: string;
  labelProp: keyof T;
  setState: React.Dispatch<React.SetStateAction<null | string>>;
  state: null | string;
  statusData: { isError: boolean; isLoading: boolean };
  sx?: SxProps;
  sxInput?: SxProps;
}

const CustomAutocompleteFilter = <T,>({
  customLabel,
  data,
  disabled,
  invalidateQuery,
  label,
  labelProp,
  setState,
  size = "small",
  state,
  statusData,
  sx,
  sxInput,
}: Props<HasId & T>) => {
  const { isError, isLoading } = statusData;

  const getOptionLabel = (option: (HasId & T) | string) => {
    if (typeof option === "string") {
      return option;
    }
    if (customLabel) {
      return customLabel(option);
    }
    return String(option[labelProp]);
  };

  return (
    <Autocomplete
      disabled={isLoading || isError || disabled}
      getOptionLabel={(option) => String(option[labelProp])}
      id="combo-box-demo"
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="Nenhum resultado encontrado"
      onChange={(_, value) => setState(value?.id ?? null)}
      options={data ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
                {isError && (
                  <LoadingIconsErros invalidateQuery={invalidateQuery} />
                )}
              </>
            ),
          }}
          label={isLoading ? "Buscando..." : label}
          placeholder="Selecionar"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              minHeight: size !== "small" ? "44.5px" : undefined,
            },
            minWidth: 180,
            ...sxInput,
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <Tooltip
          arrow
          placement="top"
          title={String(option[labelProp as keyof typeof option])}
        >
          <li {...props}>{getOptionLabel(option)}</li>
        </Tooltip>
      )}
      sx={{ minWidth: 180, ...sx }}
      value={data?.find((item) => item.id === state) || null}
    />
  );
};

export { CustomAutocompleteFilter };
