import {
  LocalizationProvider,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FormikProps } from "formik";
import React, { memo } from "react";

interface Props {
  disabled?: boolean;
  field?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  hideError?: boolean;
  label?: string;
}

const CustomTimePickerInput = memo(function CustomTimePickerInput({
  disabled,
  field = false,
  formikAndName,
  hideError = false,
  label,
  ...rest
}: Props) {
  const { formik, name } = formikAndName;
  const handleTouchHorarios = (field: string) => {
    formik.setFieldTouched(field, true, true);
  };
  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };
  const value = getValue(formik.values, name);
  const error = getValue(formik.errors, name);
  const touched = getValue(formik.touched, name);
  const handleChangeTimePicker = (
    field: string,
    newValue: dayjs.Dayjs | null,
  ) => {
    const formattedValue = newValue ? newValue.format("HH:mm") : "";
    formik.setFieldValue(field, formattedValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {!field ? (
        <TimePicker
          {...rest}
          ampm={false}
          disabled={disabled}
          label={label}
          onChange={(value) => handleChangeTimePicker(name, value)}
          slotProps={{
            textField: {
              error: touched && Boolean(error),
              helperText: !hideError ? touched && error?.toString() : false,
              id: name,
              onBlur: () => handleTouchHorarios(name),
            },
          }}
          sx={{ minWidth: "140px", width: "100%" }}
          value={value ? dayjs(value, "HH:mm") : null}
        />
      ) : (
        <TimeField
          {...rest}
          ampm={false}
          disabled={disabled}
          label={label}
          onChange={(value) => handleChangeTimePicker(name, value)}
          slotProps={{
            textField: {
              error: touched && Boolean(error),
              helperText: !hideError ? touched && error?.toString() : false,
              id: name,
              onBlur: () => handleTouchHorarios(name),
            },
          }}
          sx={{ minWidth: "140px", width: "100%" }}
          value={value ? dayjs(value, "HH:mm") : null}
        />
      )}
    </LocalizationProvider>
  );
});

export { CustomTimePickerInput };
