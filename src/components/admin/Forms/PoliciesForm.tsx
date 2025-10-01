import { SimpleAlert } from "@/components/@shared/Alert/SimpleAlert";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import BasicTable from "@/components/admin/Tables/PermissionsTable";
import { selectModels } from "@/constants/admin/policies";
import {
  ESCALAS_SCOPE_ACTIONS,
  LABEl_PERMISSOES,
} from "@/constants/gestao-rh/gestao-de-escalas/permissoes";
import { useCreatePolicies } from "@/hooks/admin/policies/useCreate/useCreatePolicie";
import { useDeletePolicy } from "@/hooks/admin/policies/useDelete/useDeletePolicie";
import { useGetOnePermission } from "@/hooks/admin/policies/useGet/useGetOnePermission";
import { useUpdatePolicy } from "@/hooks/admin/policies/useUpdate/useUpdatePolicie";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { policiesSchema } from "./_yup/policies";
const style = {
  border: "2px solid #00000032",
  left: "50%",
  maxHeight: "90%",
  overflow: "auto",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
};
interface Props {
  id?: string;
}

const PoliciesForm = ({ id }: Props) => {
  const [actionsList, setActionsList] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedModelEscalas, setSelectedModelEscalas] = useState("");
  const [isOpenPermission, setIsOpenPermission] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const { mutateAsync: createPolicy } = useCreatePolicies([
    "admin",
    "policies",
  ]);
  const { mutateAsync: updatePolicy } = useUpdatePolicy(["admin", "policies"]);
  const { isPending: isPendingDeletePolicy, mutateAsync: deletePolicy } =
    useDeletePolicy(["admin", "policies"]);
  const {
    data: policyData,
    isError: isErrorPolicy,
    isFetching: isFetchingPolicy,
    isLoading: policyDataLoading,
  } = useGetOnePermission(id ?? "");

  const { toggleDrawer } = useDrawerStore();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      actions: policyData?.actions ?? [""],
      effect: policyData?.effect ?? "",
      name: policyData?.name ?? "",
      resources: policyData?.resources ?? ["*"],
    },
    onSubmit: async (values) => {
      const objPayload = {
        actions: values.actions,
        effect: values.effect,
        name: values.name.trim(),
        resources: values.resources,
      };
      setActionsList(values.actions);
      if (id) {
        await updatePolicy({ data: objPayload, id });
      } else {
        await createPolicy(objPayload);
        toggleDrawer(false);
      }
    },
    validationSchema: policiesSchema,
  });

  useEffect(() => {
    if (
      policyData &&
      !policyDataLoading &&
      !isErrorPolicy &&
      !isFetchingPolicy
    ) {
      setActionsList(policyData.actions);
    }
  }, [policyData, policyDataLoading, id, isErrorPolicy, isFetchingPolicy]);

  if (policyDataLoading || isFetchingPolicy) {
    return <LoadingSkeleton />;
  }
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const actionModel = `${selectedModel}${event.target.value}`;
    const hasActionModel = actionsList.includes(actionModel);

    let newActionsList = [...actionsList];
    if (hasActionModel) {
      newActionsList = newActionsList.filter(
        (action) => action !== actionModel,
      );
    } else {
      newActionsList.push(actionModel);
    }

    setActionsList(newActionsList);
    formik.setFieldValue("actions", newActionsList);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value);
  };

  if (id && isErrorPolicy) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["admin", "policies", id]} />
      </Box>
    );
  }
  const handleActionToggle = (action: string) => {
    const actionWithScope = `${selectedModelEscalas}:${action}`;
    const currentIndex = formik.values.actions.indexOf(actionWithScope);
    const newSelectedActions = formik.values.actions.filter(
      (action) => action !== "",
    );

    if (currentIndex === -1) {
      newSelectedActions.push(actionWithScope);
    } else {
      newSelectedActions.splice(currentIndex, 1);
    }

    formik.setFieldValue("actions", newSelectedActions);
  };
  const selectedScopeActions =
    ESCALAS_SCOPE_ACTIONS[
      selectedModelEscalas as keyof typeof ESCALAS_SCOPE_ACTIONS
    ] || [];
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack margin={2} spacing={2}>
        <Grid container gap={2}>
          <TextField
            error={formik.touched.name && Boolean(formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors?.name}
            label="Nome"
            type="text"
            {...formik.getFieldProps("name")}
          />

          <TextField
            error={formik.touched.effect && Boolean(formik.errors.effect)}
            fullWidth
            helperText={formik.touched.effect && formik.errors?.effect}
            label="Efeito"
            select
            {...formik.getFieldProps("effect")}
          >
            <MenuItem value="Allow">Permitir</MenuItem>
            <MenuItem value="Deny">Bloquear</MenuItem>
          </TextField>
          <Box
            alignItems={"center"}
            display={"flex"}
            flexWrap={"wrap"}
            gap={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography>Editar as permissões de:</Typography>
            <FormControl sx={{ minWidth: "180px" }}>
              <Select
                displayEmpty
                label="Permissões"
                onChange={handleSelect}
                value={selectedModel}
              >
                <MenuItem value="">
                  <em>Selecionar</em>
                </MenuItem>
                {selectModels.map((model) => {
                  return (
                    <MenuItem key={model.value} value={model.value}>
                      {model.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box
            display={"grid"}
            gap={1}
            justifyContent={"center"}
            sx={{ gridTemplateColumns: "1fr 1fr", padding: "0px 10px" }}
            width={"100%"}
          >
            {selectedModel && (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      checked={actionsList.includes(
                        `${selectedModel}:List${selectedModel}s`,
                      )}
                      onChange={handleSwitch}
                      value={`:List${selectedModel}s`}
                    />
                  }
                  label="Listar todos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={actionsList.includes(
                        `${selectedModel}:Get${selectedModel}`,
                      )}
                      onChange={handleSwitch}
                      value={`:Get${selectedModel}`}
                    />
                  }
                  label="Listar um"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={actionsList.includes(
                        `${selectedModel}:Update${selectedModel}`,
                      )}
                      onChange={handleSwitch}
                      value={`:Update${selectedModel}`}
                    />
                  }
                  label="Editar"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={actionsList.includes(
                        `${selectedModel}:Remove${selectedModel}`,
                      )}
                      onChange={handleSwitch}
                      value={`:Remove${selectedModel}`}
                    />
                  }
                  label="Deletar"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={actionsList.includes(
                        `${selectedModel}:Create${selectedModel}`,
                      )}
                      onChange={handleSwitch}
                      value={`:Create${selectedModel}`}
                    />
                  }
                  label="Criar"
                />
              </>
            )}
          </Box>
          <Box
            alignItems={"center"}
            display={"flex"}
            flexWrap={"wrap"}
            gap={2}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography>Editar as permissões de Gestão de escalas:</Typography>
            <FormControl sx={{ minWidth: "180px" }}>
              <InputLabel id="scope-select-label">Selecionar</InputLabel>
              <Select
                id="scope-select"
                label="Selecionar"
                labelId="scope-select-label"
                onChange={({ target: { value } }) => {
                  setSelectedModelEscalas(value);
                }}
                value={selectedModelEscalas}
              >
                <MenuItem value="">
                  <em>Selecionar</em>
                </MenuItem>
                {Object.keys(ESCALAS_SCOPE_ACTIONS).map((scope) => (
                  <MenuItem key={scope} value={scope}>
                    {scope}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {selectedScopeActions.length > 0 && (
            <Box
              display={"grid"}
              gap={1}
              justifyContent={"center"}
              sx={{ gridTemplateColumns: "1fr 1fr", padding: "0px 10px" }}
              width={"100%"}
            >
              {selectedScopeActions.map((action: string, index: number) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.actions.includes(
                        `${selectedModelEscalas}:${action}`,
                      )}
                      name={action}
                      onChange={() => handleActionToggle(action)}
                    />
                  }
                  key={action}
                  label={LABEl_PERMISSOES[index]}
                />
              ))}
            </Box>
          )}
          {
            <ButtonGroup>
              <Tooltip
                disableHoverListener={formik.dirty}
                title="Para salvar altere algum campo"
              >
                <span>
                  <Button
                    color="primary"
                    disabled={
                      !formik.dirty ||
                      formik.isSubmitting ||
                      actionsList.length === 0
                    }
                    type="submit"
                    variant="contained"
                  >
                    {formik.isSubmitting ? "Salvando..." : "Salvar"}
                  </Button>
                </span>
              </Tooltip>
              <Tooltip
                disableHoverListener={formik.dirty}
                title="Visualizar todas as permissões dessa política"
              >
                <span>
                  <Button
                    color="success"
                    onClick={() => setIsOpenPermission(!isOpenPermission)}
                    variant="contained"
                  >
                    Permissões
                  </Button>
                </span>
              </Tooltip>
            </ButtonGroup>
          }
          {id && actionsList.length === 0 && (
            <>
              <SimpleAlert severity="error" title="">
                <Typography color="error" textAlign="center">
                  Está politica está sem nenhuma permissão definida, opte por
                  excluir-la ao invés.
                </Typography>
              </SimpleAlert>
              <Button
                color="error"
                onClick={() => setOpenDialogConfirm(true)}
                variant="contained"
              >
                Deletar politica
              </Button>
              <Dialog
                onClose={() => setOpenDialogConfirm(false)}
                open={openDialogConfirm}
              >
                <DialogTitle>Deletar Politica</DialogTitle>
                <DialogContent>
                  <Box>
                    <Typography>
                      Deseja deletar a politica &quot;{policyData?.name}
                      &quot;?
                    </Typography>
                  </Box>
                </DialogContent>{" "}
                <DialogActions>
                  <Button
                    disabled={isPendingDeletePolicy}
                    onClick={() => setOpenDialogConfirm(false)}
                  >
                    Cancelar
                  </Button>
                  <LoadingButton
                    color="error"
                    loading={isPendingDeletePolicy}
                    onClick={async () => {
                      await deletePolicy(id);
                      setOpenDialogConfirm(false);
                      toggleDrawer(false);
                    }}
                  >
                    Confirmar
                  </LoadingButton>
                </DialogActions>
              </Dialog>
            </>
          )}
          {isOpenPermission && (
            <Modal
              aria-describedby="modal-modal-descrição"
              aria-labelledby="modal-titulo"
              onClose={() => setIsOpenPermission(false)}
              open={isOpenPermission}
            >
              <Box sx={{ ...style, maxWidth: "900px", width: "90%" }}>
                <BasicTable permissions={actionsList} />
              </Box>
            </Modal>
          )}
        </Grid>
      </Stack>
    </form>
  );
};

export { PoliciesForm };
