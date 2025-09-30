import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import React, { ChangeEvent, useState } from "react";

interface Props extends Omit<TextFieldProps, "name"> {
  InputProps?: any;
  disabled?: boolean;
  disabledField?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  label?: string;
}

const formatCurrency = (value: string): string => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d)(\d{2})$/, "$1,$2") // Insere a vírgula antes dos últimos dois dígitos
    .replace(/(?=(\d{3})+(\D))\B/g, "."); // Insere pontos como separadores de milhar
};

const parseCurrency = (formattedValue: string) => {
  return Number(formattedValue.replace(/[^\d,-]/g, "").replace(",", "."));
};

const CustomInputMoney = ({
  InputProps,
  disabled,
  disabledField = false,
  formikAndName,
  label,
  ...rest
}: Props) => {
  const { formik, name } = formikAndName;
  const [localValue, setLocalValue] = useState<string>(
    formatCurrency(formik.values[name]?.toString() || ""),
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Formata o valor e define no estado local
    const formattedValue = formatCurrency(inputValue);
    setLocalValue(formattedValue);

    // Salva o valor como número no Formik
    const floatValue = parseCurrency(formattedValue);
    formik.setFieldValue(name, floatValue);
  };

  return (
    <TextField
      {...rest}
      InputProps={{
        readOnly: disabledField,
        ...InputProps,
        startAdornment: disabledField ? null : (
          <InputAdornment position="start">R$</InputAdornment>
        ),
      }}
      {...formik.getFieldProps(name)}
      disabled={disabled ?? formik.isSubmitting}
      error={
        formik.getFieldMeta(name).touched &&
        Boolean(formik.getFieldMeta(name).error)
      }
      fullWidth
      helperText={formik.touched[name] && formik.errors[name]?.toString()}
      label={label ?? ""}
      onChange={handleChange}
      value={localValue}
    />
  );
};

export { CustomInputMoney };
