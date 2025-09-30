import { Box, FormLabel } from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ptBR } from "@mui/x-date-pickers/locales";
import { FormikProps } from "formik";
import moment from "moment";
import "moment/locale/pt-br";
import React from "react";

interface Props extends DatePickerProps<moment.Moment, boolean> {
  dataMes?: boolean;
  disableInput?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  inputLabel?: boolean;
  label: string;
  labelIcon?: React.ReactNode;
  minWidth?: string;
}

const CustomDataPickerInput = ({
  dataMes = false,
  disableInput,
  formikAndName,
  inputLabel = true,
  label,
  labelIcon,
  minWidth = "200px",
  ...rest
}: Props) => {
  const { formik, name } = formikAndName;
  return (
    <>
      {dataMes ? (
        <LocalizationProvider
          adapterLocale="pt-br"
          dateAdapter={AdapterMoment}
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Box style={{ minWidth }} width="100%">
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <DatePicker
              {...rest}
              format="MM/YYYY"
              onChange={(value) => {
                formik.setFieldValue(
                  name,
                  moment(value).format("YYYY-MM"),
                  true,
                );
              }}
              slotProps={{
                openPickerIcon: { color: "primary" },
                textField: {
                  color: "info",
                  error: formik.touched[name] && Boolean(formik.errors[name]),
                  fullWidth: true,
                  helperText:
                    formik.touched[name] && formik.errors[name]?.toString(),
                  id: name,
                  onBlur: () => {
                    formik.setFieldTouched(name, true);
                  },
                  variant: "outlined",
                },
              }}
              value={
                formik.values[name]
                  ? moment(formik.values[name], "YYYY-MM")
                  : null
              }
              views={["year", "month"]}
            />
          </Box>
        </LocalizationProvider>
      ) : (
        <LocalizationProvider
          adapterLocale="pt-br"
          dateAdapter={AdapterMoment}
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Box style={{ minWidth }} width="100%">
            {inputLabel && (
              <FormLabel htmlFor={name}>
                {label}
                {labelIcon}
              </FormLabel>
            )}
            <DatePicker
              disabled={disableInput}
              {...rest}
              format="DD/MM/YYYY"
              label={!inputLabel ? label : ""}
              onChange={(value) => {
                if (!value) {
                  formik.setFieldValue(name, "", true);
                } else {
                  formik.setFieldValue(
                    name,
                    moment(value).format("YYYY-MM-DD"),
                    true,
                  );
                }
              }}
              slotProps={{
                openPickerIcon: { color: "primary" },
                textField: {
                  color: "info",
                  disabled: disableInput,
                  error: formik.touched[name] && Boolean(formik.errors[name]),
                  fullWidth: true,
                  helperText:
                    formik.touched[name] && formik.errors[name]?.toString(),
                  id: name,
                  onBlur: () => {
                    formik.setFieldTouched(name, true);
                  },
                  variant: "outlined",
                },
              }}
              value={formik.values[name] ? moment(formik.values[name]) : null}
            />
          </Box>
        </LocalizationProvider>
      )}
    </>
  );
};

export { CustomDataPickerInput };
