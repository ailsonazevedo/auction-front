"use client";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { SimpleDrawer } from "@/components/@shared/Drawer/SimpleDrawer";
import OrganizationForm from "@/components/admin/Forms/OrganizationForm";
import { useDeleteOrganization } from "@/hooks/admin/organizations/useDelete/useDeleteOrganization";
import { useGetAllOrganizations } from "@/hooks/admin/organizations/useGet/useGetAllOrganizations";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import React, { useMemo } from "react";

const OrganizationsTable = () => {
  const [selectOrganization, setSelectOrganization] = React.useState<{
    id: string;
    name: string;
  }>();
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const { drawer, toggleDrawer } = useDrawerStore();

  function handleDialogClose() {
    setOpenDialogConfirm(false);
    setSelectOrganization(undefined);
  }

  const {
    data: OrganizationData = [],
    isError: isErrorOrganizations,
    isFetching: isFetchingOrganizations,
    isLoading: isLoadingOrganizations,
  } = useGetAllOrganizations();
  const {
    isPending: isPendingDeleteOrganization,
    mutateAsync: handleDeleteOrganization,
  } = useDeleteOrganization(["admin", "organizations"]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: OrganizationData,
    enableRowActions: true,
    enableRowNumbers: true,
    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { right: ["mrt-row-actions"] },
      sorting: [
        {
          desc: false,
          id: "name",
        },
      ],
    },
    localization: MRT_Localization_PT_BR,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    muiToolbarAlertBannerProps: isErrorOrganizations
      ? {
          children: AlertErrorWithReload({
            invalidateQuery: ["admin", "organizations"],
          }),
          color: "error",
        }
      : undefined,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <Tooltip title="Editar">
            <IconButton
              color="inherit"
              onClick={() => {
                setSelectOrganization({
                  id: row.original._id,
                  name: row.original.name,
                });
                toggleDrawer(true);
              }}
              sx={{ padding: 0 }}
            >
              <EditNoteIcon fontSize={"large"} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar">
            <IconButton
              color="inherit"
              onClick={() => {
                setSelectOrganization({
                  id: row.original._id,
                  name: row.original.name,
                });
                setOpenDialogConfirm(true);
              }}
              sx={{ padding: 0 }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        color="primary"
        onClick={() => {
          setSelectOrganization(undefined);
          toggleDrawer(true);
        }}
        variant="contained"
      >
        Adicionar Organização
      </Button>
    ),
    state: {
      isLoading: isLoadingOrganizations,
      showAlertBanner: isErrorOrganizations,
      showProgressBars: isFetchingOrganizations,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <SimpleDrawer
        anchor="right"
        onClose={() => {
          toggleDrawer(false);
        }}
        open={drawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "35%",
          },
        }}
      >
        <OrganizationForm organizationId={selectOrganization?.id} />
      </SimpleDrawer>
      <Dialog onClose={handleDialogClose} open={openDialogConfirm}>
        <DialogTitle>Deletar Organização</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>
              Deseja deletar a organização &quot;{selectOrganization?.name}
              &quot;?
            </Typography>
          </Box>
        </DialogContent>{" "}
        <DialogActions>
          <Button
            disabled={isPendingDeleteOrganization}
            onClick={handleDialogClose}
          >
            Cancelar
          </Button>
          <LoadingButton
            color="error"
            loading={isPendingDeleteOrganization}
            onClick={async () => {
              await handleDeleteOrganization(selectOrganization?.id!);
              setOpenDialogConfirm(false);
              setSelectOrganization(undefined);
            }}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { OrganizationsTable };
