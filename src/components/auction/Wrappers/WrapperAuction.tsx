"use client";

import { useGetOneAuction } from "@/hooks/auctions/useGet/useGetOneAuction";
import { moneyMaskFromNumber } from "@/utils/functions/@shared/masks/moneyMask";
import { useSocket } from "@/utils/providers/SocketProvider";
import {
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
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  auctionId: string;
}

// Tipo local para o histórico exibido
interface BidHistoryItem {
  id?: string;
  name?: string;
  profile_id: string;
  time: string;
  value: number | string;
}

const WrapperAuction = ({ auctionId }: Props) => {
  const { auctionData, connectAuction, notifications } = useSocket() || {};
  const { data: auctionResult } = useGetOneAuction(auctionId);
  const [bidValue, setBidValue] = useState("");
  const [bidHistory, setBidHistory] = useState<BidHistoryItem[]>([]);

  useEffect(() => {
    if (connectAuction && auctionId) {
      connectAuction(auctionId);
    }
  }, [connectAuction, auctionId]);

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

  // Valor atual do lance
  const currentBid =
    bidHistory.length > 0
      ? bidHistory[0].value
      : auctionResult?.portfolio?.minimum_bid || "-";
  const currentBidder =
    bidHistory.length > 0
      ? bidHistory[0].name || bidHistory[0].profile_id
      : null;

  const handleBid = () => {
    if (!bidValue) return;
    setBidHistory((prev) => [
      {
        profile_id: "Você",
        time: new Date().toLocaleTimeString(),
        value: bidValue,
      },
      ...prev,
    ]);
    setBidValue("");
  };

  const canCreateBid = auctionResult?.status === "open";

  return (
    <Box p={4}>
      <Typography
        gutterBottom
        sx={{ alignItems: "center", display: "flex", gap: 2 }}
        variant="h4"
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          {auctionResult?.portfolio?.name?.[0] || "L"}
        </Avatar>
        Leilão em tempo real
        <Chip
          color={auctionResult?.status === "open" ? "success" : "default"}
          label={auctionResult?.status === "open" ? "AO VIVO" : "OFFLINE"}
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
                  {auctionResult?.portfolio.auction_end
                    ? new Date(
                        auctionResult.portfolio.auction_end,
                      ).toLocaleString()
                    : "-"}
                </Typography>
              </Stack>
            ) : (
              <Typography>Carregando detalhes do portfólio...</Typography>
            )}
            <Box mt={3}>
              <Typography variant="h6">Fazer um lance</Typography>
              <Grid alignItems="center" container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    disabled={!canCreateBid}
                    fullWidth
                    label="Valor do lance"
                    onChange={(e) => setBidValue(e.target.value)}
                    size="small"
                    type="number"
                    value={bidValue}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    disabled={!canCreateBid}
                    fullWidth
                    onClick={handleBid}
                    variant="contained"
                  >
                    Dar lance
                  </Button>
                </Grid>
              </Grid>
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
            {currentBidder && (
              <Chip color="info" label={`Por: ${currentBidder}`} />
            )}
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card elevation={4} sx={{ maxHeight: 500, overflow: "auto" }}>
            <CardHeader
              sx={{
                bgcolor: "primary.main",
                border: 2,
                borderRadius: 1,
                color: "white",
              }}
              title="Histórico de Lances"
            />
            <CardContent>
              <List>
                {bidHistory.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Nenhum lance ainda." />
                  </ListItem>
                )}
                {bidHistory.map((bid, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={
                        <span>
                          <b>{moneyMaskFromNumber(Number(bid.value))}</b>{" "}
                          <Chip label={bid.name} size="small" sx={{ ml: 1 }} />
                        </span>
                      }
                      secondary={`Às ${bid.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export { WrapperAuction };
