"use client";
import { IUnit } from "@/@types/admin/unit/IUnit";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { SimpleDrawer } from "@/components/@shared/Drawer/SimpleDrawer";
import { UnitsForm } from "@/components/admin/Forms/UnitsForm";
import useGetAllUnits from "@/hooks/admin/unit/useGet/useGetAllUnits";
import { useDrawerStore } from "@/stores/drawerStore/drawer-store";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import React, { useMemo, useState } from "react";

const UnitsTable = () => {
  const [selectedUnit, setSelectedUnit] = useState<IUnit | null>(null);
  const {
    data: dataUnits = [],
    isError: isErrorUnits,
    isFetching: isFetchingUnits,
    isLoading: isLoadingUnits,
  } = useGetAllUnits();
  const { drawer, toggleDrawer } = useDrawerStore();

  const columns = useMemo<MRT_ColumnDef<IUnit>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: dataUnits,
    enableRowActions: true,
    enableRowNumbers: true,
    getRowId: (row) => row._id,
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
    muiToolbarAlertBannerProps: isErrorUnits
      ? {
          children: AlertErrorWithReload({
            invalidateQuery: ["admin", "units"],
          }),
          color: "error",
        }
      : undefined,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Tooltip title="Editar">
        <IconButton
          color="inherit"
          onClick={() => {
            setSelectedUnit(row.original);
            toggleDrawer(true);
          }}
          sx={{ padding: 0 }}
        >
          <EditNoteIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    ),
    renderTopToolbarCustomActions: () => (
      <Button onClick={() => toggleDrawer(true)} variant="contained">
        Adicionar Unidade
      </Button>
    ),

    state: {
      isLoading: isLoadingUnits,
      showAlertBanner: isErrorUnits,
      showProgressBars: isFetchingUnits,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <SimpleDrawer
        anchor="right"
        onClose={() => {
          toggleDrawer(false);
          setSelectedUnit(null);
        }}
        open={drawer}
      >
        <UnitsForm unitId={selectedUnit?._id} />
      </SimpleDrawer>
    </>
  );
};

export { UnitsTable };
