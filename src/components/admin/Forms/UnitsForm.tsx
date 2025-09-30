import { IUnit } from "@/@types/admin/unit/IUnit";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import useCreateUnit from "@/hooks/admin/unit/useCreate/useCreateUnit";
import useGetOneUnit from "@/hooks/admin/unit/useGet/useGetOneUnit";
import useUpdateUnit from "@/hooks/admin/unit/useUpdate/useUpdateUnit";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";

import { unitSchema } from "./_yup/unit";

interface IUnitFormProps {
  unitId: string | undefined;
}

const UnitsForm = ({ unitId }: IUnitFormProps) => {
  const { mutateAsync: updateUnit } = useUpdateUnit();

  const { mutateAsync: createUnit } = useCreateUnit();

  const { toggleDrawer } = useDrawerStore();

  const {
    data: unitData,
    isError: isErrorUnit,
    isFetching: isFetchingUnit,
    isLoading: isLoadingUnit,
  } = useGetOneUnit(unitId);

  const formik = useFormik<Partial<IUnit>>({
    enableReinitialize: true,
    initialValues: {
      name: unitData?.name ?? "",
    },
    onSubmit: async (values: Partial<IUnit>) => {
      if (unitId) {
        await updateUnit({ id: unitId ?? "", unitData: values as IUnit });
      } else {
        await createUnit(values as IUnit);
        toggleDrawer(false);
      }
    },
    validationSchema: unitSchema,
  });

  if (isLoadingUnit || isFetchingUnit) {
    return <LoadingSkeleton />;
  }

  if (unitId && isErrorUnit) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["admin", "units", unitId]} />
      </Box>
    );
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack margin={2} spacing={2}>
        <TextField
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors?.name}
          {...formik.getFieldProps("name")}
          fullWidth
          label="Nome"
        />
        <Box display={"flex"} justifyContent={"flex-end"} marginX={2}>
          <ButtonGroup>
            <Tooltip
              disableHoverListener={formik.dirty}
              title="Para salvar altere algum campo"
            >
              <span>
                <Button
                  color="primary"
                  disabled={
                    !formik.dirty || formik.isSubmitting || !formik.isValid
                  }
                  type="submit"
                  variant="contained"
                >
                  {formik.isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </span>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Stack>
    </form>
  );
};

export { UnitsForm };
