"use client";

import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import { PasswordVisibilityToggle } from "@/components/@shared/PasswordVisibleTogle/PasswordVisibleTogle";
import useRegister from "@/hooks/auth/useRegister/useRegister";
import { applyCpfMask } from "@/utils/functions/@shared/masks/cpfMask";
import { Box, Button, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import "dayjs/locale/pt-br";
import { useFormik } from "formik";
import "moment/locale/pt-br";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

import { registerSchema } from "./_yup/registerSchema";

const AuthRegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: createProfile } = useRegister();

  const formik = useFormik({
    initialValues: {
      cpf: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    onSubmit: async (values) => {
      await createProfile(values);
      formik.resetForm();
      router.push("/entrar");
    },
    validationSchema: registerSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Stack gap={1} mb={2}>
          <Stack direction="row" spacing={2}>
            <CustomTextField
              formikAndName={{ formik, name: "first_name" }}
              label={"Nome"}
            />
            <CustomTextField
              formikAndName={{ formik, name: "last_name" }}
              label={"Sobrenome"}
            />
          </Stack>

          <CustomTextField
            formikAndName={{ formik, name: "email" }}
            label={"E-mail"}
            placeholder="seuemail@email.com"
            type="email"
          />
          <CustomTextField
            formikAndName={{ formik, name: "cpf" }}
            label={"CPF"}
            mask={applyCpfMask}
            placeholder="123.456.789-00"
          />

          <CustomTextField
            InputProps={{
              endAdornment: (
                <PasswordVisibilityToggle
                  isVisible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              ),
            }}
            formikAndName={{ formik, name: "password" }}
            label={"Senha"}
            type={showPassword ? "text" : "password"}
          />
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
    </form>
  );
};

export default AuthRegisterForm;
