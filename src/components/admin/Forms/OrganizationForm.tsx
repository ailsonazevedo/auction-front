import { IOrganization } from "@/@types/admin/organizations/IOrganization";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { useCreateOrganization } from "@/hooks/admin/organizations/useCreate/useCreateOrganization";
import { useGetOneOrganization } from "@/hooks/admin/organizations/useGet/useGetOneOganization";
import { useUpdateOrganization } from "@/hooks/admin/organizations/useUpdate/useUpdateOrganization";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import { Box, Button, ButtonGroup, TextField, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";

import { organizationSchema } from "./_yup/organization";

interface OrganizationFormProps {
  organizationId?: string;
}

const OrganizationForm = ({ organizationId }: OrganizationFormProps) => {
  const { mutateAsync: updateOrganization } = useUpdateOrganization([
    "admin",
    "organizations",
  ]);
  const { mutateAsync: createOrganization } = useCreateOrganization([
    "admin",
    "organizations",
  ]);
  const { toggleDrawer } = useDrawerStore();

  const {
    data: OrganizationData,
    isError: isErrorOrganization,
    isFetching: isFetchingOrganization,
    isLoading: isLoadingOrganization,
  } = useGetOneOrganization(organizationId ?? "");

  const formik = useFormik<IOrganization>({
    enableReinitialize: true,
    initialValues: {
      name: OrganizationData?.name ?? "",
    },
    onSubmit: async (values: IOrganization) => {
      const formData = {
        name: values.name.trim(),
      };
      if (organizationId) {
        await updateOrganization({ data: formData, id: organizationId });
      } else {
        await createOrganization(formData);
        toggleDrawer(false);
      }
    },
    validationSchema: organizationSchema,
  });

  if (isLoadingOrganization || isFetchingOrganization) {
    return <LoadingSkeleton />;
  }

  if (organizationId && isErrorOrganization) {
    return (
      <Box>
        <AlertErrorWithReload
          invalidateQuery={["admin", "organizations", organizationId]}
        />
      </Box>
    );
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction={"row"} margin={2}>
        <TextField
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          {...formik.getFieldProps("name")}
          fullWidth
          label={"Nome"}
        />
      </Stack>
      <Box display={"flex"} justifyContent={"flex-end"} marginX={2}>
        <ButtonGroup>
          <Tooltip
            disableHoverListener={formik.dirty}
            title={"Para salvar altere algum campo"}
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
      </Box>
    </form>
  );
};

export default OrganizationForm;
