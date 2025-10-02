import { ICreateUser } from "@/@types/user/IProfile";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { SubmitButtons } from "@/components/@shared/Button/SubmitButton";
import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import {
  userSchemaCreate,
  userSchemaUpdate,
} from "@/components/admin/Forms/_yup/user";
import { useGetAllGroups } from "@/hooks/admin/groups/useGet/useGetAllGroups";
import { useGetPolicies } from "@/hooks/admin/policies/useGet/useGetPolicies";
import useForgotPassword from "@/hooks/auth/useForgotPassword/useForgotPassword";
import useCreateUser from "@/hooks/user/useCreate/useCreateUser";
import { useGetOneUser } from "@/hooks/user/useGet/useGetOneUser";
import { useUpdateUser } from "@/hooks/user/useUpdate/useUpdateUser";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import { generateRandomPassword } from "@/utils/functions/@shared/generateRandomPassword";
import {
  createGroupsMap,
  createPoliciesMap,
} from "@/utils/functions/@shared/map";
import { applyCnpjMask } from "@/utils/functions/@shared/masks/cnpjMask";
import { applyCpfMask } from "@/utils/functions/@shared/masks/cpfMask";
import { Refresh, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useFormik } from "formik";
import React, { useState } from "react";

interface IUserFormProps {
  userId: string | undefined;
}

const UserForm = ({ userId }: IUserFormProps) => {
  const { mutateAsync: updateUser } = useUpdateUser(["admin", "users"]);
  const { mutateAsync: createUser } = useCreateUser(["admin", "users"]);

  const { toggleDrawer } = useDrawerStore();

  const { mutateAsync: createForgotPassword } = useForgotPassword();

  const {
    data: UsersResult,
    isError: isErrorUsers,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetOneUser(userId ?? "");

  const { data: policiesData = [] } = useGetPolicies();

  const { data: groupsData = [] } = useGetAllGroups();

  const hancleSendEmail = async () => {
    await createForgotPassword({ email: UsersResult?.email });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showInputPassword, setShowInputPassword] = useState(false);

  const handleGeneratePassword = () => {
    setShowInputPassword(true);
    setShowPassword(true);
    const randomPassword = generateRandomPassword();
    formik.setFieldValue("password", randomPassword);
  };

  const formik = useFormik<Partial<ICreateUser>>({
    enableReinitialize: true,
    initialValues: {
      dateOfBirth: UsersResult?.dateOfBirth ?? "",
      docId: UsersResult?.docId ?? "",
      email: UsersResult?.email ?? "",
      groups: UsersResult?.groups ?? [],
      name: UsersResult?.name ?? "",
      password: "",
      policies: UsersResult?.policies ?? [],
    },
    onSubmit: async (values) => {
      const payload = {
        dateOfBirth: values.dateOfBirth,
        docId: values?.docId?.trim(),
        email: values?.email?.trim(),
        groups: values.groups,
        name: values?.name?.trim(),
        password: values.password,
        policies: values.policies,
      };

      if (userId) {
        if (!showInputPassword) {
          delete (payload as Partial<typeof payload>).password;
        }
        await updateUser({ data: payload, id: userId });
      } else {
        await createUser({
          ...payload,
          dateOfBirth: "2022-01-01",
          password: values.password,
        });
        toggleDrawer(false);
      }
    },
    validationSchema: userId ? userSchemaUpdate : userSchemaCreate,
  });

  if (isLoadingUsers || isFetchingUsers) {
    return <LoadingSkeleton />;
  }
  if (userId && isErrorUsers) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["admin", "users", userId]} />
      </Box>
    );
  }
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack margin={2} spacing={2}>
        <LocalizationProvider
          adapterLocale="pt-br"
          dateAdapter={AdapterDayjs}
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Stack direction={"row"} spacing={2}>
            <CustomTextField
              formikAndName={{ formik, name: "name" }}
              label="Nome"
            />
          </Stack>
          <CustomTextField
            formikAndName={{ formik, name: "email" }}
            label="Email"
            type="string"
          />
          <Divider />
          <DatePicker
            disableFuture
            format="DD/MM/YYYY"
            label="Data de Nascimento"
            onChange={(value) =>
              formik.setFieldValue("dateOfBirth", value, true)
            }
            slotProps={{
              textField: {
                error:
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth),
                helperText:
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth,
                variant: "outlined",
              },
            }}
            value={
              formik.values.dateOfBirth
                ? dayjs(formik.values.dateOfBirth)
                : null
            }
          />
          <CustomTextField
            formikAndName={{ formik, name: "docId" }}
            label="Número do documento"
            onChange={(e) => {
              const { value } = e.target;
              formik.setFieldValue(
                "docId",
                value.length <= 14 ? applyCpfMask(value) : applyCnpjMask(value),
              );
            }}
          />
          {showInputPassword && (
            <CustomTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              formikAndName={{ formik, name: "password" }}
              label="Senha"
              type={showPassword ? "text" : "password"}
            />
          )}
          <Divider />
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label">Políticas</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              {...formik.getFieldProps("policies")}
              fullWidth
              label="Políticas"
              multiple
              onChange={(event) => {
                formik.setFieldValue(
                  "policies",
                  event.target.value as string[],
                );
              }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[])
                    .map((value) => {
                      const label = createPoliciesMap(policiesData).get(value);
                      if (label) {
                        return <Chip key={value} label={label} />;
                      }
                      return null; // Retorna null para não renderizar nada se o ID não for encontrado
                    })
                    .filter(Boolean)}{" "}
                  {/* Remove elementos null */}
                </Box>
              )}
            >
              {policiesData.map((policy) => (
                <MenuItem key={policy._id} value={policy._id}>
                  {policy.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            // error={formik.touched.roles && Boolean(formik.errors.roles)}
            fullWidth
          >
            <InputLabel id="groups">Grupos</InputLabel>
            <Select
              // disabled={true}
              labelId="grupos"
              {...formik.getFieldProps("groups")}
              fullWidth
              label="Grupos"
              multiple
              onChange={(event) => {
                formik.setFieldValue("groups", event.target.value as string[]);
              }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[])
                    .map((value) => {
                      const label = createGroupsMap(groupsData).get(value);
                      if (label) {
                        return <Chip key={value} label={label} />;
                      }
                      return null; // Retorna null para não renderizar nada se o ID não for encontrado
                    })
                    .filter(Boolean)}{" "}
                  {/* Remove elementos null */}
                </Box>
              )}
            >
              {groupsData.map((cargo) => (
                <MenuItem key={cargo._id} value={cargo._id}>
                  {cargo.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {!userId && (
            <CustomTextField
              formikAndName={{ formik, name: "password" }}
              label="Senha"
              type="password"
            />
          )}

          <Grid container justifyContent="flex-end">
            <SubmitButtons
              additionalButton={
                <>
                  {userId && (
                    <Stack direction={"row"} spacing={2}>
                      <Button
                        color={"warning"}
                        onClick={handleGeneratePassword}
                        startIcon={<Refresh />}
                        variant="contained"
                      >
                        Senha temporária
                      </Button>
                      <Button
                        color="error"
                        disabled={formik.isSubmitting || !UsersResult?.email}
                        onClick={() => {
                          hancleSendEmail();
                        }}
                        startIcon={<Send />}
                        variant="contained"
                      >
                        Recuperar senha
                      </Button>
                    </Stack>
                  )}
                </>
              }
              edit={userId}
              formik={formik}
              handleCancelClick={() => toggleDrawer(false)}
              type={"modal"}
            />
          </Grid>
        </LocalizationProvider>
      </Stack>
    </form>
  );
};

export { UserForm };
