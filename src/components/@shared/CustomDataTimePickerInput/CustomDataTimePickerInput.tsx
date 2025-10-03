import { Box, FormLabel } from "@mui/material";
import {
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ptBR } from "@mui/x-date-pickers/locales";
import { FormikProps } from "formik";
import moment from "moment";
import React from "react";

moment.locale("pt-br");

interface Props extends DateTimePickerProps<moment.Moment, boolean> {
  disableInput?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  inputLabel?: boolean;
  label: string;
  labelIcon?: React.ReactNode;
  minWidth?: string;
}

const CustomDataTimePickerInput = ({
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
        <DateTimePicker
          disabled={disableInput}
          {...rest}
          format="DD/MM/YYYY HH:mm"
          label={!inputLabel ? label : ""}
          onChange={(value) => {
            if (!value) {
              formik.setFieldValue(name, "", true);
            } else {
              // Salva sempre em UTC ISO string
              formik.setFieldValue(name, moment(value).utc().format(), true);
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
          value={formik.values[name] ? moment.utc(formik.values[name]) : null}
        />
      </Box>
    </LocalizationProvider>
  );
};

export { CustomDataTimePickerInput };
