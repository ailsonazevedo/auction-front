import { IGroup } from "@/@types/admin/groups/IGroup";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { useCreateGroup } from "@/hooks/admin/groups/useCreate/useCreateGroup";
import { useGetOneGroups } from "@/hooks/admin/groups/useGet/useGetOneGroups";
import useUpdateGroup from "@/hooks/admin/groups/useUpdate/useUpdateGroup";
import { useGetPolicies } from "@/hooks/admin/policies/useGet/useGetPolicies";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import { createPoliciesMap } from "@/utils/functions/@shared/map";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";

import { GroupSchema } from "./_yup/group";

interface IsCreate {
  idGroup?: string;
}

function GroupForm({ idGroup }: Readonly<IsCreate>) {
  const {
    data,
    isError: isErrorGroup,
    isFetching,
    isLoading,
  } = useGetOneGroups(idGroup ?? "");

  const { data: policiesData = [] } = useGetPolicies();

  const { toggleDrawer } = useDrawerStore();

  useEffect(() => {
    if (data?.name) {
      formik.setValues({ name: data.name, policies: data.policies });
    }
  }, [data]);

  const { mutateAsync: createGroup } = useCreateGroup();
  const { mutateAsync: updateGroup } = useUpdateGroup();
  const formik = useFormik<Partial<IGroup>>({
    initialValues: {
      name: "",
      policies: [],
    },
    onSubmit: async (values) => {
      const formData: Partial<IGroup> = {
        name: values.name,
        policies: values.policies,
      };
      if (idGroup) {
        await updateGroup({ id: idGroup, unitData: formData });
      } else {
        await createGroup(formData);
        toggleDrawer(false);
      }
    },
    validationSchema: GroupSchema,
  });

  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }
  if (idGroup && isErrorGroup) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["admin", "groups", idGroup]} />
      </Box>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <Stack margin={2} spacing={2}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            disabled={formik.isSubmitting}
            error={formik.touched.name && Boolean(formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            id="text-cpwd"
            placeholder="Nome"
            type="name"
            variant="outlined"
            {...formik.getFieldProps("name")}
          />
          <FormControl
            error={formik.touched.policies && Boolean(formik.errors.policies)}
            fullWidth
          >
            <InputLabel id="politicas-cargos-label">Políticas</InputLabel>
            <Select
              labelId="politicas-cargos-label"
              {...formik.getFieldProps("policies")}
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
              {policiesData.map((policies) => (
                <MenuItem key={policies._id} value={policies._id}>
                  {policies.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.policies && formik.errors.policies
                ? String(formik.errors.policies)
                : ""}
            </FormHelperText>
          </FormControl>
        </Box>
        <Grid container justifyContent="flex-end">
          <ButtonGroup>
            <Tooltip
              disableHoverListener={formik.dirty}
              title="Para salvar altere algum campo"
            >
              <span>
                <Button
                  color="primary"
                  disabled={!formik.dirty || formik.isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  {formik.isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </span>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Stack>
    </form>
  );
}

export { GroupForm };
