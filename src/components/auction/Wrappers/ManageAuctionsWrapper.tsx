"use client";

import { IPagination } from "@/@types/IPagination";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { CustomPagination } from "@/components/@shared/CustomPagination/CustomPagination";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { SimpleModal } from "@/components/@shared/Modal/SimpleModal";
import { AuctionForm } from "@/components/auction/Forms/AuctionForm";
import { useDeleteAuction } from "@/hooks/auctions/useDelete/useDeleteAuction";
import { useGetAllAuctions } from "@/hooks/auctions/useGet/useGetAllAuctions";
import { AddCircle } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo, useState } from "react";

moment.locale("pt-br");

const ManageAuctionsWrapper = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDialogDel, setOpenDialogDel] = useState(false);
  const [auctionId, setAuctionId] = useState("");

  const [page] = useQueryState(
    "page",
    parseAsString.withDefault("1").withOptions({ clearOnDefault: true }),
  );

  const pagination: IPagination = useMemo(
    () => ({ page: parseInt(page, 10), page_size: 20 }),
    [page],
  );

  const {
    data: auctionsResp,
    isError: isErrorAuctions,
    isLoading: isLoadingAuctions,
  } = useGetAllAuctions(pagination);

  const { isPending: isPendingDelete, mutateAsync: deleteAuction } =
    useDeleteAuction(["auctions"]);

  const countPages = useMemo(
    () => Math.ceil((auctionsResp?.count ?? 0) / pagination.page_size),
    [auctionsResp?.count, pagination.page_size],
  );

  if ((auctionsResp?.items ?? []).length === 0) {
    return (
      <Typography textAlign={"center"} variant="h6">
        Nenhum leilão cadastrado.
      </Typography>
    );
  }

  const handleCloseDialog = () => {
    setOpenDialogDel(false);
    setAuctionId("");
  };

  return (
    <Box mt={4} px={2}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        mb={2}
      >
        <Typography color="textSecondary" fontWeight="bold" variant="h4">
          Gerenciar Leilões
        </Typography>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          startIcon={<AddCircle />}
          variant="contained"
        >
          Novo Leilão
        </Button>
      </Stack>

      {isLoadingAuctions && <LoadingSkeleton />}
      {isErrorAuctions && (
        <Box>
          <AlertErrorWithReload invalidateQuery={["auctions"]} />
        </Box>
      )}

      <Grid container spacing={3}>
        {auctionsResp?.items.map((auction) => (
          <Grid item key={auction.id} lg={4} md={6} sm={12} xs={12}>
            <Card sx={{ p: 2 }} variant="outlined">
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700} variant="h6">
                  {auction.portfolio.name}
                </Typography>
                <Chip
                  color={auction.status === "open" ? "success" : "error"}
                  label={auction.status === "open" ? "Aberto" : "Fechado"}
                  size="small"
                />
              </Stack>

              <Typography mt={1} variant="body2">
                Criado em:{" "}
                {moment
                  .utc(auction.created_at)
                  .local()
                  .format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography variant="body2">
                Atualizado em:{" "}
                {moment
                  .utc(auction.updated_at)
                  .local()
                  .format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography variant="body2">
                Término do leilão:{" "}
                {moment
                  .utc(auction.portfolio.auction_end)
                  .local()
                  .format("DD/MM/YYYY [às] HH:mm[h]")}
              </Typography>

              <Stack
                alignItems="center"
                direction="row"
                justifyContent="flex-end"
                mt={1}
                spacing={1}
              >
                <IconButton
                  aria-label="Editar leilão"
                  color="primary"
                  onClick={() => {
                    setAuctionId(auction.id);
                    setOpenModal(true);
                  }}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="Remover leilão"
                  color="error"
                  onClick={() => {
                    setAuctionId(auction.id);
                    setOpenDialogDel(true);
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mb={2} mt={4}>
        <CustomPagination
          countPages={countPages}
          route={"/gerenciar-leiloes"}
        />
      </Box>

      <SimpleModal
        onClose={() => {
          setOpenModal(false);
          setAuctionId("");
        }}
        open={openModal}
        title={auctionId ? "Editar Leilão" : "Novo Leilão"}
      >
        <AuctionForm
          auctionId={auctionId ?? ""}
          onClose={() => {
            setOpenModal(false);
            setAuctionId("");
          }}
        />
      </SimpleModal>
      <Box>
        <Dialog onClose={handleCloseDialog} open={openDialogDel}>
          <DialogTitle>Deletar leilão</DialogTitle>
          <DialogContent>
            <Box>
              <Typography>
                Tem certeza que deseja deletar esse leilão?
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button disabled={isPendingDelete} onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <LoadingButton
              color="error"
              loading={isPendingDelete}
              onClick={async () => {
                await deleteAuction(auctionId);
                handleCloseDialog();
              }}
            >
              Confirmar
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export { ManageAuctionsWrapper };
