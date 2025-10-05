"use client";

import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { SimpleModal } from "@/components/@shared/Modal/SimpleModal";
import { BidForm } from "@/components/bid/Forms/BidForm";
import { useAuctionRoom } from "@/hooks/auctions/useAuctionRoom";
import { useGetOneAuction } from "@/hooks/auctions/useGet/useGetOneAuction";
import { moneyMaskFromNumber } from "@/utils/functions/@shared/masks/moneyMask";
import { AddToPhotos, History } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

moment.locale("pt-br");

interface Props {
  auctionId: string;
}

interface BidHistoryItem {
  id?: string;
  name?: string;
  profile_id: string;
  time: string;
  value: number | string;
}

function stringToColor(str?: string) {
  if (!str) return "#607d8b";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 65%, 55%)`;
}

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

const WrapperAuction = ({ auctionId }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { auctionData } = useAuctionRoom(auctionId);
  const { data: auctionResult, isLoading: isLoadingAuction } =
    useGetOneAuction(auctionId);
  const [bidHistory, setBidHistory] = useState<BidHistoryItem[]>([]);

  useEffect(() => {
    if (!auctionData) return;
    if (auctionData.type === "history") {
      setBidHistory(
        auctionData.bids.map((bid) => ({
          id: bid.id,
          name: bid.name,
          profile_id: bid.profile_id,
          time: bid.created_at
            ? new Date(bid.created_at).toLocaleTimeString()
            : "-",
          value: bid.bid_amount,
        })),
      );
    } else if (auctionData.type === "send_auction_message") {
      setBidHistory((prev) => [
        {
          name: auctionData.name,
          profile_id: auctionData.profile_id,
          time: new Date().toLocaleTimeString(),
          value: Number(auctionData.new_bid),
        },
        ...prev,
      ]);
    }
  }, [auctionData]);

  const currentBid =
    bidHistory.length > 0
      ? bidHistory[0].value
      : (auctionResult?.portfolio?.minimum_bid ?? "-");

  const currentUserBidder =
    bidHistory.length > 0
      ? (bidHistory[0].name ?? bidHistory[0].profile_id)
      : null;

  const canCreateBid = auctionResult?.status === "open";

  const increment = Number(currentBid) + Number(currentBid) * 0.2;

  if (isLoadingAuction) {
    return <LoadingSkeleton />;
  }

  return (
    <Box p={4}>
      <Typography
        gutterBottom
        sx={{ alignItems: "center", display: "flex", gap: 2 }}
        variant="h4"
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {auctionResult?.portfolio?.name?.[0] ?? "L"}
        </Avatar>
        Leilão em tempo real
        <Chip
          color={auctionResult?.status === "open" ? "success" : "error"}
          label={auctionResult?.status === "open" ? "AO VIVO" : "ENCERRADO"}
          sx={{ ml: 2 }}
        />
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <Paper elevation={3} sx={{ mb: 3, p: 3 }}>
            <Typography variant="h6">Detalhes do Portfólio</Typography>
            <Divider sx={{ mb: 2 }} />
            {auctionResult ? (
              <Stack spacing={1}>
                <Typography>
                  <b>Nome:</b> {auctionResult?.portfolio?.name || "-"}
                </Typography>
                <Typography>
                  <b>Valor mínimo:</b>
                  {moneyMaskFromNumber(auctionResult?.portfolio?.minimum_bid) ||
                    "-"}
                </Typography>
                <Typography>
                  <b>Valor total:</b>
                  {moneyMaskFromNumber(
                    auctionResult?.portfolio?.total_amount,
                  ) || "-"}
                </Typography>
                <Typography>
                  <b>Descrição:</b>{" "}
                  {auctionResult?.portfolio?.description || "-"}
                </Typography>
                <Typography>
                  <b>Início:</b>{" "}
                  {auctionResult?.created_at
                    ? new Date(auctionResult.created_at).toLocaleString()
                    : "-"}
                </Typography>
                <Typography>
                  <b>Fim:</b>{" "}
                  {moment
                    .utc(auctionResult?.portfolio.auction_end)
                    .local()
                    .format("DD/MM/YYYY [às] HH:mm[h]")}
                </Typography>
              </Stack>
            ) : (
              <LoadingSkeleton />
            )}
            <Box mt={3}>
              <Grid alignItems="center" container spacing={1}>
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    disabled={!canCreateBid}
                    fullWidth
                    onClick={() => setOpenModal(true)}
                    startIcon={<AddToPhotos />}
                    variant="contained"
                  >
                    Dar lance
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  {!canCreateBid && (
                    <Typography color="error">
                      O leilão está encerrado. Não é possível dar lances.
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Alert severity="info" sx={{ m: 1 }}>
                <Typography>
                  Ao dar um lance, o incremento será de pelo menos 20% a mais
                  que o valor do lance atual.
                </Typography>
              </Alert>
            </Box>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              alignItems: "center",
              display: "flex",
              gap: 2,
              p: 2,
            }}
          >
            <Typography variant="body1">
              <b>Lance atual:</b>
            </Typography>
            <Typography color="primary.main" variant="h5">
              {moneyMaskFromNumber(Number(currentBid))}
            </Typography>
            {currentUserBidder && (
              <Chip color="info" label={`Por: ${currentUserBidder}`} />
            )}
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card elevation={4} sx={{ maxHeight: 500, overflow: "auto" }}>
            <CardHeader
              avatar={<History />}
              sx={{
                bgcolor: "primary.main",
                border: 2,
                borderRadius: 1,
                color: "white",
              }}
              title="Histórico de Lances"
            />
            <CardContent>
              <List dense sx={{ py: 0 }}>
                {bidHistory.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Nenhum lance ainda." />
                  </ListItem>
                )}
                {bidHistory.map((bid, index) => (
                  <Box key={bid.id ?? index}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Stack gap={0.5} textAlign="right">
                          <Typography
                            color="primary.main"
                            fontWeight={700}
                            variant="subtitle2"
                          >
                            {moneyMaskFromNumber(Number(bid.value))}
                          </Typography>
                        </Stack>
                      }
                      sx={{
                        bgcolor:
                          index === 0 ? "primary.alpha10" : "transparent",
                        borderRadius: 1,
                        mt: 0.5,
                        px: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: stringToColor(bid.name),
                            fontSize: 14,
                            fontWeight: 600,
                            height: 36,
                            width: 36,
                          }}
                        >
                          {getInitials(bid.name)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack alignItems="center" direction="row" gap={1}>
                            <Typography fontWeight={600} noWrap variant="body2">
                              {bid.name}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Stack alignItems="center" direction="row" gap={1}>
                            <Typography
                              color="text.secondary"
                              sx={{ display: "block" }}
                              variant="caption"
                            >
                              #{index + 1}
                            </Typography>
                            {index === 0 && (
                              <Chip
                                color="success"
                                label="Lance Atual"
                                size="small"
                                sx={{ height: 20 }}
                              />
                            )}
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < bidHistory.length - 1 && (
                      <Divider component="li" sx={{ ml: 7 }} />
                    )}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SimpleModal
        onClose={() => setOpenModal(false)}
        open={openModal}
        title="Dar um Lance"
      >
        <BidForm
          auctionId={auctionId}
          increment={Number(increment.toFixed(2))}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      </SimpleModal>
    </Box>
  );
};

export { WrapperAuction };
