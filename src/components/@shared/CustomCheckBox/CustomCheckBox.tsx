import { Checkbox, FormControlLabel } from "@mui/material";
import { FormikProps } from "formik";

interface Props {
  checked: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  label: string;
  onChange: () => void;
}

const CustomCheckBoxField = ({
  checked,
  formikAndName,
  label,
  ...props
}: Props) => {
  const { formik, name } = formikAndName;
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          checked={checked}
          color="primary"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps(name)}
        />
      }
      label={label}
    />
  );
};

export { CustomCheckBoxField };
