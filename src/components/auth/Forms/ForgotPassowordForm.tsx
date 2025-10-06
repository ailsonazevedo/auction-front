"use client";

import {
  URL_SUCESS_SEND_EMAIL,
  URL_TOKEN_RESET_PASSWORD,
} from "@/@URLQueries/auth/UForgoutPassword";
import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import { PasswordVisibilityToggle } from "@/components/@shared/PasswordVisibleTogle/PasswordVisibleTogle";
import useClearParams from "@/hooks/@shared/useClearParams";
import useForgotPassword from "@/hooks/auth/useForgotPassword/useForgotPassword";
import useResetPassword from "@/hooks/auth/useResetPassword/useResetPassword";
import {
  Box,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { decodeJwt } from "jose";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./_yup/forgotPasswordShema";

export default function AuthForgotPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSucessSendEmail, setIsSucessSendEmail] = useQueryState(
    URL_SUCESS_SEND_EMAIL,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );
  const [tokenReceived] = useQueryState(
    URL_TOKEN_RESET_PASSWORD,
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );
  const { mutateAsync: createForgotPassword, variables } = useForgotPassword();
  const { mutateAsync: resetPassword } = useResetPassword();
  const clearParams = useClearParams();

  const router = useRouter();
  const formik = useFormik({
    initialValues: isSucessSendEmail
      ? {
          newPassword: "",
          token: "",
        }
      : {
          email: "",
        },
    onSubmit: async (values) => {
      if (isSucessSendEmail) {
        await resetPassword(values);
      } else {
        await createForgotPassword(values);
        router.push("/entrar");
      }
    },
    validationSchema: isSucessSendEmail
      ? resetPasswordSchema
      : forgotPasswordSchema,
  });
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const handleEmailSent = async () => {
    const response = await createForgotPassword({ email: variables.email });
    if (response) {
      setIsDisabled(true);
      setTimer(30);
    }
  };
  useEffect(() => {
    if (tokenReceived) {
      const data = decodeJwt(tokenReceived);
      if (data.exp! < Math.floor(Date.now() / 1000)) {
        toast.error(
          "Token expirado, por favor, solicite um novo email de recuperação.",
        );
        clearParams();
        router.push("/esqueceu-senha");
      } else {
        formik.setFieldValue("token", data.token);
        formik.setFieldValue("email", data.email);
      }
    }
  }, [tokenReceived]);
  return (
    <>
      {!isSucessSendEmail && (
        <Typography
          color="textSecondary"
          fontWeight="400"
          textAlign="center"
          variant="subtitle2"
        >
          Por favor, insira o endereço de e-mail associado à sua conta e
          enviaremos um link para redefinir sua senha.
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        {isSucessSendEmail && tokenReceived ? (
          <>
            <Stack my={2} spacing={2}>
              <Box sx={{ width: "100%" }}>
                <FormLabel htmlFor="newPassword">Nova senha</FormLabel>
                <CustomTextField
                  InputProps={{
                    endAdornment: (
                      <PasswordVisibilityToggle
                        isVisible={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                      />
                    ),
                  }}
                  formikAndName={{ formik, name: "newPassword" }}
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                />
              </Box>
            </Stack>
          </>
        ) : (
          <Stack my={2} spacing={2}>
            <FormLabel htmlFor="reset-email">Email</FormLabel>
            <TextField
              disabled={formik.isSubmitting}
              error={formik.touched.email && Boolean(formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              id="reset-email"
              type="email"
              variant="outlined"
              {...formik.getFieldProps("email")}
            />
          </Stack>
        )}
        {isSucessSendEmail && (
          <Stack direction={"row"} gap={1} my={2}>
            <Typography
              color="textSecondary"
              fontWeight="400"
              textAlign="center"
              variant="subtitle2"
            >
              Não recebeu o email?
            </Typography>
            <Typography
              onClick={
                !isDisabled || !formik.isSubmitting
                  ? handleEmailSent
                  : undefined
              }
              style={{
                color: isDisabled ? "gray" : "blue",
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              {isDisabled ? `Aguarde ${timer} segundos` : "Enviar novamente"}
            </Typography>
          </Stack>
        )}

        <Stack spacing={2}>
          <Button
            color="primary"
            disabled={formik.isSubmitting || !formik.isValid}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {!isSucessSendEmail ? "Esqueci a senha" : "Resetar senha"}
          </Button>
          <Button
            color="primary"
            component={Link}
            fullWidth
            href="/entrar"
            size="large"
          >
            Voltar para o login
          </Button>
        </Stack>
      </form>
    </>
  );
}
