"use client";
import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import { SimpleDrawer } from "@/components/@shared/Drawer/SimpleDrawer";
import { ListInfoDetailsLogs } from "@/components/admin/Lists/ListInfoDetailsLogs";
import { useControlParamsUrl } from "@/hooks/@shared/useControlParamsUrl";
import { useGetLog } from "@/hooks/admin/log/terminal/useGet/useGetLog";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, IconButton, Typography } from "@mui/material";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function TableLog() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const checkDrawer = searchParams.get("logs");
  const { data = [], isError, isFetching, isLoading } = useGetLog();

  const { setParam } = useControlParamsUrl(searchParams, replace, pathname);
  const { remove } = useControlParamsUrl(searchParams, replace, pathname);
  const toggleDrawer = (newOpen: boolean) => () => {
    remove("logs");
  };
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "user",
        header: "usuário",
        size: 100,
      },
      {
        accessorKey: "time",
        header: "Tempo",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
      },
      {
        accessorKey: "host",
        header: "Host",
        size: 100,
      },
      {
        accessorKey: "request",
        header: "Requisição",
        size: 100,
      },
      {
        accessorKey: "message",
        header: "Mensagem",
        size: 100,
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    getRowId: (row) => row.id,
    localization: MRT_Localization_PT_BR,
    muiToolbarAlertBannerProps: isError
      ? {
          children: "Erro ao carregar os dados",
          color: "error",
        }
      : undefined,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <IconButton
            color="inherit"
            onClick={() => setParam("logs", "true")}
            size="small"
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </Box>
      </Box>
    ),
    state: {
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });
  const BCrumb = [
    {
      title: "admin",
      to: "/admin",
    },
  ];
  return (
    <>
      <Breadcrumb items={BCrumb} title="Tabela de logs " />
      <MaterialReactTable table={table} />
      <SimpleDrawer
        anchor={"right"}
        onClose={toggleDrawer(false)}
        open={!!checkDrawer}
      >
        <Box sx={{ marginTop: "10px", padding: "4px" }}>
          <Typography
            sx={{ borderBottom: "1px solid gray", color: "gray", pb: 1 }}
            variant="h6"
          >
            Informações detalhadas
          </Typography>
        </Box>
        <ListInfoDetailsLogs />
      </SimpleDrawer>
    </>
  );
}
