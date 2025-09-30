"use client";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { SimpleModal } from "@/components/@shared/Modal/SimpleModal";
import { UserForm } from "@/components/admin/Forms/UserForm";
import { useDeleteUser } from "@/hooks/user/useDelete/useDeleteUser";
import { useGetAllUsers } from "@/hooks/user/useGet/useGetAllUses";
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
import React, { useMemo, useState } from "react";

const UsersTable = () => {
  const { drawer, toggleDrawer } = useDrawerStore();
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
  }>();
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const { isPending: isPendingDeleteUser, mutate: deleteUser } = useDeleteUser([
    "admin",
    "users",
  ]);

  function handleDialogClose() {
    setOpenDialogConfirm(false);
    setSelectedUser(undefined);
  }

  const {
    data: fetchedData = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetAllUsers();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: fetchedData,
    enableRowActions: true,
    enableRowNumbers: true,

    getRowId: (row) => row.id,
    initialState: {
      columnPinning: { right: ["mrt-row-actions"] },
      sorting: [
        {
          desc: false,
          id: "email",
        },
      ],
    },
    localization: MRT_Localization_PT_BR,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          children: AlertErrorWithReload({
            invalidateQuery: ["admin", "users"],
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
                setSelectedUser({
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
                setSelectedUser({
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
          setSelectedUser(undefined);
          toggleDrawer(true);
        }}
        variant="contained"
      >
        Adicionar Usuário
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <SimpleModal
        onClose={() => {
          toggleDrawer(false);
        }}
        open={drawer}
        title={selectedUser ? "Editar Usuário" : "Adicionar Usuário"}
      >
        <UserForm userId={selectedUser?.id} />
      </SimpleModal>
      <Dialog onClose={handleDialogClose} open={openDialogConfirm}>
        <DialogTitle>Deletar Usuário</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>
              Deseja deletar o usuário &quot;{selectedUser?.name}&quot;?
            </Typography>
          </Box>
        </DialogContent>{" "}
        <DialogActions>
          <Button disabled={isPendingDeleteUser} onClick={handleDialogClose}>
            Cancelar
          </Button>
          <LoadingButton
            color="error"
            loading={isPendingDeleteUser}
            onClick={async () => {
              await deleteUser(selectedUser?.id!);
              setOpenDialogConfirm(false);
              setSelectedUser(undefined);
            }}
          >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { UsersTable };
