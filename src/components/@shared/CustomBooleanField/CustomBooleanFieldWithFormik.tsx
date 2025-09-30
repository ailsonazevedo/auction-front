import { IOSSwitch } from "@/components/@shared/Switch/Switch";
import {
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

interface Props {
  disabled?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  label?: string;
  onClick?: () => void;
}

const CustomBooleanFieldFormik = ({
  disabled = false,
  formikAndName,
  label,
  onClick,
}: Props) => {
  const { formik, name } = formikAndName;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, event.target.checked);
  };

  return (
    <FormControl component="fieldset">
      {label && <FormLabel component="legend">{label}:</FormLabel>}
      <FormGroup aria-label="position" row>
        <Tooltip
          placement="top"
          title={formik.values[name] ? "Desativar" : "Ativar"}
        >
          <IconButton
            disabled={disabled}
            onClick={onClick}
            sx={{ margin: 1, padding: 0 }}
          >
            <IOSSwitch
              checked={formik.values[name] ?? false}
              onChange={handleChange}
            />
          </IconButton>
        </Tooltip>
      </FormGroup>
    </FormControl>
  );
};

export { CustomBooleanFieldFormik };
