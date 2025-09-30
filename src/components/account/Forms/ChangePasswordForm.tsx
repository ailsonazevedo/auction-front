"use client";

import { PasswordVisibilityToggle } from "@/components/@shared/PasswordVisibleTogle/PasswordVisibleTogle";
import { useGetInfoLoggedUser } from "@/hooks/user/useGet/useGetInfoLoggedUser";
import { useUpdatePassword } from "@/hooks/user/useUpdate/useUpdatePassword";
import { Button, FormLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";

import { changePasswordSchema } from "./_yup/changePasswordSchema";

function ChangePasswordForm() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTwoFaValidated, setIsTwoFaValidated] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    retypenew: false,
  });

  const { mutateAsync: createUpdatePassword } = useUpdatePassword();
  const { data: UserDataInfo } = useGetInfoLoggedUser();

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      if (UserDataInfo?.isTwoFactorAuthenticationEnabled && !isTwoFaValidated) {
        setIsDrawerOpen(true);
        return;
      }

      const formData = {
        newPassword: values.newPassword.trim(),
        oldPassword: values.currentPassword.trim(),
      };
      const response = await createUpdatePassword(formData);
      if (response.status === 200) {
        formik.resetForm();
        setShowPassword({
          current: false,
          new: false,
          retypenew: false,
        });
        setIsTwoFaValidated(false);
      }
    },
    validationSchema: changePasswordSchema,
  });

  const handlePasswordToggle = (field: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormLabel htmlFor="text-cpwd">Senha Atual</FormLabel>
      <TextField
        InputProps={{
          endAdornment: (
            <PasswordVisibilityToggle
              isVisible={showPassword.current}
              onToggle={() => handlePasswordToggle("current")}
            />
          ),
        }}
        disabled={formik.isSubmitting}
        error={
          formik.touched.currentPassword &&
          Boolean(formik.errors.currentPassword)
        }
        fullWidth
        helperText={
          formik.touched.currentPassword && formik.errors.currentPassword
        }
        id="text-cpwd"
        type={showPassword.current ? "text" : "password"}
        variant="outlined"
        {...formik.getFieldProps("currentPassword")}
      />

      <FormLabel htmlFor="text-npwd">Nova Senha</FormLabel>
      <TextField
        InputProps={{
          endAdornment: (
            <PasswordVisibilityToggle
              isVisible={showPassword.new}
              onToggle={() => handlePasswordToggle("new")}
            />
          ),
        }}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        fullWidth
        helperText={formik.touched.newPassword && formik.errors.newPassword}
        id="text-npwd"
        type={showPassword.new ? "text" : "password"}
        variant="outlined"
        {...formik.getFieldProps("newPassword")}
        disabled={formik.isSubmitting}
      />

      <FormLabel htmlFor="text-conpwd">Confirmar Senha</FormLabel>
      <TextField
        InputProps={{
          endAdornment: (
            <PasswordVisibilityToggle
              isVisible={showPassword.retypenew}
              onToggle={() => handlePasswordToggle("retypenew")}
            />
          ),
        }}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        fullWidth
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        id="text-conpwd"
        type={showPassword.retypenew ? "text" : "password"}
        variant="outlined"
        {...formik.getFieldProps("confirmPassword")}
        disabled={formik.isSubmitting}
        value={formik.values.confirmPassword || ""}
      />

      <Button
        disabled={
          formik.isSubmitting ||
          (UserDataInfo?.isTwoFactorAuthenticationEnabled && !isTwoFaValidated)
        }
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
      >
        {formik.isSubmitting ? "Atualizando..." : "Alterar Senha"}
      </Button>
    </form>
  );
}

export { ChangePasswordForm };
