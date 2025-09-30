import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

import { LoadingIconsErros } from "../Error/LoadingIconsErros";

interface HasId {
  id: string;
}
interface Props<T extends HasId>
  extends Omit<
    AutocompleteProps<T, boolean, boolean, boolean>,
    "name" | "onChange" | "options" | "renderInput" | "value"
  > {
  IconAdd?: React.ElementType;
  customAction?: () => void;
  customLabel?: (option: T) => string;
  data: T[] | undefined;
  disabled?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  invalidateQuery: string[];
  label?: string;
  labelProp?: (keyof T)[] | keyof T;
  multiple?: boolean;
  separator?: string;
  statusData: { isError: boolean; isLoading: boolean };
  testId?: string;
}

/**
 * CustomAutocomplete component.
 *
 * @template T - The type of the data items.
 * @param {Props<HasId & T>} props - The component props.
 * @param {Array<HasId & T>} props.data - The data items for the autocomplete.
 * @param {Object} props.formikAndName - objeto do formik e o nome do formik value.
 * @param {Function} props.invalidateQuery - O array de query para o invalidateQuery.
 * @param {string} props.label - A label para o autocomplete.
 * @param {string} props.labelProp - A propriedade que vai ser a label do item.
 * @param {React.ElementType} [props.IconAdd=Add] - O icone que vai aparecer no botão de adicionar.
 * @param {boolean} [props.multiple=false] - Se vai ser multiple ou um single.
 * @param {Object} props.statusData - O status de erro e de loading da requisição.
 * @param {Function} props.customAction - Função customizada para o botão de ação.
 * @returns {JSX.Element} The CustomAutocomplete component.
 */
const CustomAutocomplete = <T,>({
  IconAdd = Add,
  customAction,
  customLabel,
  data,
  disabled,
  formikAndName,
  invalidateQuery,
  label,
  labelProp,
  multiple = false,
  separator = " - ",
  size = "medium",
  statusData,
  testId,
  ...rest
}: Props<HasId & T>) => {
  const { formik, name } = formikAndName;
  const { isError, isLoading } = statusData;
  const value = multiple
    ? (data?.filter((option) =>
        (formik.values?.[name] as string[])?.includes(option.id),
      ) ?? [])
    : (data?.find((option: HasId & T) => option.id === formik.values[name]) ??
      null);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ((HasId & T) | string)[] | NonNullable<(HasId & T) | string> | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<HasId & T>,
  ) => {
    const selectedIds = multiple
      ? (value as Array<HasId>).map((item) => item.id)
      : (value as HasId)?.id;
    formik.setFieldValue(name, selectedIds);
  };

  const getOptionLabel = (option: (HasId & T) | string) => {
    if (typeof option === "string") {
      return option;
    }
    if (customLabel) {
      return customLabel(option);
    }
    if (Array.isArray(labelProp)) {
      return labelProp.map((prop) => option[prop]).join(separator);
    }
    return String(option[labelProp as keyof typeof option]);
  };
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        width: "100%",
      }}
    >
      <Grid alignItems="center" container spacing={1}>
        <Grid item xs>
          <Autocomplete
            {...rest}
            clearText="Limpar"
            closeText="Fechar"
            disableCloseOnSelect={multiple}
            disablePortal
            disabled={isLoading || isError || disabled}
            getOptionLabel={getOptionLabel}
            id="combo-box-demo"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            limitTags={multiple ? 2 : undefined}
            loadingText="Buscando itens..."
            multiple={multiple}
            noOptionsText="Nenhum resultado encontrado"
            onChange={handleChange}
            openText="Abrir"
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
                        <Tooltip title="Erro ao buscar os dados">
                          <LoadingIconsErros
                            invalidateQuery={invalidateQuery}
                          />
                        </Tooltip>
                      )}
                    </>
                  ),
                }}
                data-testid={testId}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={
                  formik.touched[name] && formik.errors[name]?.toString()
                }
                label={isLoading ? "Buscando..." : label}
                onBlur={() => {
                  if (!multiple) {
                    formik.setFieldTouched(name, true);
                  }
                }}
                placeholder="Selecionar"
              />
            )}
            renderOption={(props, option, { selected }) => {
              return (
                <Tooltip
                  arrow
                  placement="top"
                  title={String(option[labelProp as keyof typeof option])}
                >
                  <li
                    {...props}
                    style={{
                      paddingBottom: multiple ? 2 : 4,
                      paddingTop: multiple ? 1 : 4,
                    }}
                  >
                    {multiple && (
                      <Checkbox
                        checked={selected}
                        size="small"
                        style={{ marginRight: 8 }}
                      />
                    )}
                    {getOptionLabel(option)}
                  </li>
                </Tooltip>
              );
            }}
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                minHeight: "44.5px",
              },
              minWidth: 180,
            }}
            value={value}
          />
        </Grid>
        {customAction && (
          <Grid item>
            <Tooltip placement="top" title="Adicionar">
              {IconAdd && (
                <IconAdd
                  onClick={customAction}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              )}
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export { CustomAutocomplete };
