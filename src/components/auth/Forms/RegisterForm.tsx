"use client";

import { PasswordVisibilityToggle } from "@/components/@shared/PasswordVisibleTogle/PasswordVisibleTogle";
import { UNIT_ID } from "@/constants/services";
import useRegister from "@/hooks/auth/useRegister/useRegister";
import { applyCnpjMask } from "@/utils/functions/@shared/masks/cnpjMask";
import { applyCpfMask } from "@/utils/functions/@shared/masks/cpfMask";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br";
import { useFormik } from "formik";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

import { registerSchema } from "./_yup/registerSchema";

export interface RegisterType {
  subtext?: JSX.Element | JSX.Element[];
  subtitle: JSX.Element | JSX.Element[];
  title?: string;
}

const AuthRegisterForm = ({ subtext, subtitle, title }: RegisterType) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    first: false,
    second: false,
  });
  const { mutateAsync: createRegister } = useRegister();

  const formik = useFormik({
    initialValues: {
      cnpj: "",
      confirm_password: "",
      cpf: "",
      dateOfBirth: "",
      email: "",
      name: "",
      password: "",
      termsOfUse: false,
    },
    onSubmit: async (values) => {
      const formData = {
        cnpj: values.cnpj,
        cpf: values.cpf,
        dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
        email: values.email.trim(),
        name: values.name.trim(),
        password: values.password.trim(),
        profilePhoto: "",
        unitId: UNIT_ID,
      };

      await createRegister(formData);
      formik.resetForm();
      router.push("/entrar");
    },
    validationSchema: registerSchema,
  });

  const handlePasswordToggle = (field: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {title ? (
        <Typography fontWeight="700" mb={1} variant="h3">
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack gap={1} mb={2}>
          <FormLabel htmlFor="name">Nome</FormLabel>
          <TextField
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors?.name}
            {...formik.getFieldProps("name")}
            fullWidth
            id="name"
            placeholder="exemplo "
          />
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            disabled={formik.isSubmitting}
            error={formik.touched.email && Boolean(formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            id="email"
            placeholder="email@example.com"
            {...formik.getFieldProps("email")}
          />
          <LocalizationProvider
            adapterLocale="pt-br"
            dateAdapter={AdapterMoment}
            localeText={
              ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <FormLabel htmlFor="dateOfBirth">Data de Nascimento</FormLabel>
            <DatePicker
              disableFuture
              format="DD/MM/YYYY"
              onChange={(value) =>
                formik.setFieldValue("dateOfBirth", value, true)
              }
              slotProps={{
                leftArrowIcon: { color: "primary" },
                openPickerIcon: { color: "primary" },
                rightArrowIcon: { color: "primary" },
                switchViewIcon: { color: "primary" },
                textField: {
                  error:
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth),
                  helperText:
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth,
                  id: "dateOfBirth",
                },
              }}
            />
          </LocalizationProvider>

          <FormLabel htmlFor="cpf">CPF</FormLabel>
          <TextField
            error={formik.touched.cpf && Boolean(formik.errors.cpf)}
            helperText={formik.touched.cpf && formik.errors?.cpf}
            {...formik.getFieldProps("cpf")}
            fullWidth
            id="cpf"
            onChange={(e) => {
              const { value } = e.target;
              const cpf = applyCpfMask(value);
              formik.setFieldValue("cpf", cpf);
            }}
            placeholder="123.345.678-89"
          />
          <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
          <TextField
            error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
            helperText={formik.touched.cnpj && formik.errors?.cnpj}
            {...formik.getFieldProps("cnpj")}
            fullWidth
            id="cnpj"
            onChange={(e) => {
              const { value } = e.target;
              const cnpj = applyCnpjMask(value);
              formik.setFieldValue("cnpj", cnpj);
            }}
            placeholder="12.123.456/1000-98"
          />
          <FormLabel htmlFor="password">Senha</FormLabel>
          <TextField
            InputProps={{
              endAdornment: (
                <PasswordVisibilityToggle
                  isVisible={showPassword.first}
                  onToggle={() => handlePasswordToggle("first")}
                />
              ),
            }}
            autoComplete="new-password"
            disabled={formik.isSubmitting}
            error={formik.touched.password && Boolean(formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            id="password"
            placeholder="senha"
            type={showPassword.first ? "text" : "password"}
            {...formik.getFieldProps("password")}
          />
          <FormLabel htmlFor="confirm_password">Repetir senha</FormLabel>

          <TextField
            InputProps={{
              endAdornment: (
                <PasswordVisibilityToggle
                  isVisible={showPassword.second}
                  onToggle={() => handlePasswordToggle("second")}
                />
              ),
            }}
            autoComplete="new-password"
            disabled={formik.isSubmitting}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            fullWidth
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            id="confirm_password"
            placeholder="repetir senha"
            type={showPassword.second ? "text" : "password"}
            {...formik.getFieldProps("confirm_password")}
          />
          <Box mb={1}>
            <FormControlLabel
              control={
                <Checkbox
                  data-testid="checkbox-terms"
                  name="termsOfUse"
                  value={formik.values.termsOfUse}
                />
              }
              label={
                <Typography>
                  Eu aceito os{" "}
                  <Link
                    //TODO: alterar link para termos de uso
                    href="https://www.orimi.com/pdf-test.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Termos de Uso
                  </Link>
                  .
                </Typography>
              }
              onChange={formik.handleChange}
            />
          </Box>
        </Stack>
        <Button
          color="primary"
          disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {formik.isSubmitting ? (
            <CircularProgress color="primary" size={24} />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthRegisterForm;
