"use client";

import { PasswordVisibilityToggle } from "@/components/@shared/PasswordVisibleTogle/PasswordVisibleTogle";
import useLogin from "@/hooks/auth/useLogin/useLogin";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";

import { loginSchema } from "./_yup/loginShema";

export interface LoginType {
  subtext?: JSX.Element | JSX.Element[];
  title?: string;
}

const AuthLoginForm = ({ subtext, title }: LoginType) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isSuccess, mutateAsync: createLogin } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const formData = {
        email: values.email.trim(),
        password: values.password.trim(),
      };
      setShowPassword(false);
      await createLogin(formData);
    },

    validationSchema: loginSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {title ? (
        <Typography fontWeight="700" mb={1} variant="h3">
          {title}
        </Typography>
      ) : null}
      {subtext}
      <Stack>
        <Box mb={2}>
          <FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
            Email
          </FormLabel>
          <TextField
            disabled={formik.isSubmitting || isSuccess}
            error={formik.touched.email && Boolean(formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            id="email"
            variant="outlined"
            {...formik.getFieldProps("email")}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password" sx={{ fontWeight: "bold" }}>
            Senha
          </FormLabel>
          <Box position={"relative"}>
            <TextField
              InputProps={{
                endAdornment: (
                  <PasswordVisibilityToggle
                    isVisible={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                ),
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              id="password"
              sx={{ display: "relative" }}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...formik.getFieldProps("password")}
              disabled={formik.isSubmitting || isSuccess}
            />
          </Box>
        </Box>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          my={2}
        >
          <Typography
            component={Link}
            fontWeight="500"
            href="/esqueceu-senha"
            sx={{
              color: "#FD5426",
              textDecoration: "none",
            }}
          >
            Esqueceu a senha ?
          </Typography>
          <Typography
            component={Link}
            fontWeight="500"
            href="/registrar"
            sx={{
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            Criar uma conta
          </Typography>
        </Stack>
      </Stack>
      <Box color={"inherit"}>
        <Button
          color="secondary"
          disabled={formik.isSubmitting || isSuccess || !formik.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {formik.isSubmitting || isSuccess ? (
            <CircularProgress color="primary" data-testid="loading" size={24} />
          ) : (
            "Entrar"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default AuthLoginForm;
