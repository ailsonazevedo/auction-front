import { TextField, TextFieldProps, Tooltip } from "@mui/material";
import { FormikProps } from "formik";
import { ChangeEventHandler } from "react";

interface Props extends Omit<TextFieldProps, "name"> {
  InputProps?: any;
  disabled?: boolean;
  disabledField?: boolean;
  enableUpperCase?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  label?: string;
  mask?: (value: string) => string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  tooltipText?: string;
}

const CustomTextField = ({
  InputProps,
  disabled,
  disabledField = false,
  enableUpperCase = false,
  formikAndName,
  label,
  mask,
  onChange,
  tooltipText,
  ...rest
}: Props) => {
  const { formik, name } = formikAndName;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (mask) {
      value = mask(value);
    }

    if (onChange) {
      onChange(event as any);
      return;
    }

    formik.setFieldValue(name, value);
  };

  return (
    <Tooltip arrow placement="top" title={tooltipText ?? ""}>
      <TextField
        {...rest}
        error={
          formik.getFieldMeta(name).touched &&
          Boolean(formik.getFieldMeta(name).error)
        }
        {...formik.getFieldProps(name)}
        InputProps={{
          readOnly: disabledField,
          ...InputProps,
        }}
        disabled={disabled ?? formik.isSubmitting}
        fullWidth
        helperText={
          formik.getFieldMeta(name).touched &&
          formik.getFieldMeta(name).error?.toString()
        }
        inputProps={{
          onInput: enableUpperCase
            ? (e: any) => {
                const target = e.target as HTMLInputElement;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                target.value = target.value.toUpperCase();
                target.setSelectionRange(start, end);
              }
            : undefined,
          style: {
            textTransform: enableUpperCase ? "uppercase" : undefined,
          },
          ...rest.inputProps,
        }}
        label={label ?? ""}
        onChange={handleChange}
      />
    </Tooltip>
  );
};

export { CustomTextField };
