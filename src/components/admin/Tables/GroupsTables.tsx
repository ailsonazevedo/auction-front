"use client";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { SimpleDrawer } from "@/components/@shared/Drawer/SimpleDrawer";
import { GroupForm } from "@/components/admin/Forms/GroupForm";
import { useDeleteGroup } from "@/hooks/admin/groups/useDelete/useDeleteGroup";
import { useGetAllGroups } from "@/hooks/admin/groups/useGet/useGetAllGroups";
import { useGetPolicies } from "@/hooks/admin/policies/useGet/useGetPolicies";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import { getPolicyNames } from "@/utils/functions/@shared/getPolicyNames";
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
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import { useMemo, useState } from "react";

export default function GroupsTables() {
  const { isPending: isPendingDeleteGroup, mutate: deleteGroup } =
    useDeleteGroup(["admin", "groups"]);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
  }>();

  function handleDialogClose() {
    setOpenDialogConfirm(false);
    setSelectedGroup(undefined);
  }

  const { drawer, toggleDrawer } = useDrawerStore();
  const { data = [], isError, isFetching, isLoading } = useGetAllGroups();
  const {
    data: policiesData = [],
    isError: isErrorPolicies,
    isLoading: isLoadingPolicies,
  } = useGetPolicies();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        Cell: ({ cell }) => {
          const data = cell.row.original.policies;
          const policynames = getPolicyNames(data, policiesData);
          return (
            <Box>
              {policynames.map((name) => (
                <Typography key={name}>{name}</Typography>
              ))}
            </Box>
          );
        },
        accessorKey: "policies",
        header: "Políticas",
      },
    ],
    [policiesData, data],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    enableRowNumbers: true,
    getRowId: (row) => {
      return row.id;
    },
    initialState: {
      columnPinning: { right: ["mrt-row-actions"] },
    },
    localization: MRT_Localization_PT_BR,
    muiToolbarAlertBannerProps:
      isError || isErrorPolicies
        ? {
            children: AlertErrorWithReload({
              invalidateQuery: ["admin", "groups"],
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
                setSelectedGroup({
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
                setSelectedGroup({
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
        onClick={() => {
          toggleDrawer(true);
          setSelectedGroup(undefined);
        }}
        variant="contained"
      >
        Adicionar grupo
      </Button>
    ),
    state: {
      isLoading: isLoadingPolicies || isLoading,
      showAlertBanner: isError || isErrorPolicies,
      showProgressBars: isFetching,
    },
  });
  return (
    <>
      <MaterialReactTable table={table} />
      <SimpleDrawer
        anchor={"right"}
        onClose={() => {
          setSelectedGroup(undefined);
          toggleDrawer(false);
        }}
        open={drawer}
      >
        <GroupForm idGroup={selectedGroup?.id} />
      </SimpleDrawer>
      <Dialog onClose={handleDialogClose} open={openDialogConfirm}>
        <DialogTitle>Deletar Cargo</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>
              Deseja deletar o cargo &quot;{selectedGroup?.name}
              &quot;?
            </Typography>
          </Box>
        </DialogContent>{" "}
        <DialogActions>
          <Button disabled={isPendingDeleteGroup} onClick={handleDialogClose}>
            Cancelar
          </Button>
          <LoadingButton
            color="error"
            loading={isPendingDeleteGroup}
            onClick={async () => {
              await deleteGroup(selectedGroup?.id!);
              setOpenDialogConfirm(false);
              setSelectedGroup(undefined);
            }}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
