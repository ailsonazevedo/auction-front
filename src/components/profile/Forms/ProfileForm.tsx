import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithReload";
import { SubmitButtons } from "@/components/@shared/Button/SubmitButton";
import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { PasswordVisibilityToggle } from "@/components/@shared/PasswordVisibleTogle/PasswordVisibleTogle";
import { profileSchema } from "@/components/profile/Forms/_yup/profileSchema";
import { useGetOneUser } from "@/hooks/user/useGet/useGetOneUser";
import useUpdateProfile from "@/hooks/user/useUpdate/useUpdateProfile";
import { applyCpfMask } from "@/utils/functions/@shared/masks/cpfMask";
import { Box, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

interface Props {
  profileId: string;
}

const ProfileForm = ({ profileId }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: updateProfile } = useUpdateProfile([
    "profile",
    profileId,
  ]);

  const {
    data: profileData,
    isError: isErrorProfile,
    isLoading: isLoadingProfile,
  } = useGetOneUser(profileId);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cpf: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (profileId) {
        await updateProfile({
          data: values,
          id: profileId,
        });
      }
    },
    validationSchema: profileSchema,
  });

  useEffect(() => {
    if (profileData) {
      formik.setValues({
        cpf: profileData.cpf,
        email: profileData.user.email,
        first_name: profileData.user.first_name,
        last_name: profileData.user.last_name,
        password: "",
      });
    }
  }, [profileData]);

  if (isLoadingProfile) {
    return <LoadingSkeleton />;
  }
  if (profileId && isErrorProfile) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["portfolio", profileId]} />
      </Box>
    );
  }
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack margin={2} spacing={2}>
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

        <SubmitButtons
          formik={formik}
          handleCancelClick={() => {}}
          hideCancelButton
          type="modal"
        />
      </Stack>
    </form>
  );
};

export { ProfileForm };
