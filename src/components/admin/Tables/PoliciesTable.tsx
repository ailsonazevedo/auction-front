"use client";
import { TPolicies } from "@/@types/auth/IPermission";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { SimpleDrawer } from "@/components/@shared/Drawer/SimpleDrawer";
import { PoliciesForm } from "@/components/admin/Forms/PoliciesForm";
import { useDeletePolicy } from "@/hooks/admin/policies/useDelete/useDeletePolicie";
import { useGetPolicies } from "@/hooks/admin/policies/useGet/useGetPolicies";
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
  MRT_Cell,
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import React, { useMemo } from "react";

interface CellProps {
  cell: MRT_Cell<TPolicies, unknown>;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  return (
    <Box>
      {cell.getValue<string[]>().map((resources) => (
        <Typography key={resources}>{resources}</Typography>
      ))}
    </Box>
  );
};

const PoliciesTable = () => {
  const [selectPolicy, setSelectPolicy] = React.useState<{
    id: string;
    name: string;
  }>();
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const { drawer, toggleDrawer } = useDrawerStore();

  function handleDialogClose() {
    setOpenDialogConfirm(false);
    setSelectPolicy(undefined);
  }

  const {
    data: policiesData = [],
    isError: isErrorPolicies,
    isFetching: isFetchingPolicies,
    isLoading: isLoadingPolicies,
  } = useGetPolicies();

  const { isPending: isPendingDeletePolicy, mutateAsync: deletePolicy } =
    useDeletePolicy(["admin", "policies"]);
  const columns = useMemo<MRT_ColumnDef<TPolicies>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        Cell: ({ row }) => {
          return (
            <Typography>
              {row.original.effect === "Allow" ? "Permitir" : "Negar"}
            </Typography>
          );
        },
        accessorKey: "effect",
        header: "Efeito",
      },

      {
        Cell: Cell,
        accessorKey: "resources",
        header: "Recurso",
      },
    ],
    [],
  );

  const policiesDataFiltered = policiesData.filter(
    (policy) => policy.name !== "Administrator",
  );

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data: policiesDataFiltered,
    enableRowActions: true,
    enableRowNumbers: true,
    getRowId: (row) => row._id,
    initialState: {
      columnPinning: { right: ["mrt-row-actions"] },
    },
    localization: MRT_Localization_PT_BR,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    muiToolbarAlertBannerProps: isErrorPolicies
      ? {
          children: AlertErrorWithReload({
            invalidateQuery: ["admin", "policies"],
          }),
          color: "error",
        }
      : undefined,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => {
      return (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Tooltip title="Editar">
              <IconButton
                color="inherit"
                onClick={() => {
                  setSelectPolicy({
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
                  setSelectPolicy({
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
      );
    },
    renderTopToolbarCustomActions: () => (
      <Button
        onClick={() => {
          toggleDrawer(true);
        }}
        variant="contained"
      >
        Adicionar Política
      </Button>
    ),
    state: {
      isLoading: isLoadingPolicies,
      showAlertBanner: isErrorPolicies,
      showProgressBars: isFetchingPolicies,
    },
  });
  return (
    <>
      <MaterialReactTable table={table} />
      <SimpleDrawer
        anchor="right"
        onClose={() => {
          setSelectPolicy(undefined);
          toggleDrawer(false);
        }}
        open={drawer}
      >
        <PoliciesForm id={selectPolicy?.id} />
      </SimpleDrawer>
      <Dialog onClose={handleDialogClose} open={openDialogConfirm}>
        <DialogTitle>Deletar Politica</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>
              Deseja deletar a politica &quot;{selectPolicy?.name}
              &quot;?
            </Typography>
          </Box>
        </DialogContent>{" "}
        <DialogActions>
          <Button disabled={isPendingDeletePolicy} onClick={handleDialogClose}>
            Cancelar
          </Button>
          <LoadingButton
            color="error"
            loading={isPendingDeletePolicy}
            onClick={async () => {
              await deletePolicy(selectPolicy?.id!);
              setOpenDialogConfirm(false);
              setSelectPolicy(undefined);
            }}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { PoliciesTable };
