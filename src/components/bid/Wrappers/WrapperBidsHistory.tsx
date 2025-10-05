"use client";
import type { TBid } from "@/@types/bid/IBid";

import { IPagination } from "@/@types/IPagination";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { CustomPagination } from "@/components/@shared/CustomPagination/CustomPagination";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { useGetAllBids } from "@/hooks/bids/useGet/useGetAllBids";
import { moneyMaskFromNumber } from "@/utils/functions/@shared/masks/moneyMask";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

const WrapperBidsHistory = () => {
  const [page] = useQueryState(
    "page",
    parseAsString.withDefault("1").withOptions({ clearOnDefault: true }),
  );
  const pagination: IPagination = useMemo(
    () => ({ page: parseInt(page, 10), page_size: 20 }),
    [page],
  );

  const {
    data: BidsData,
    isError,
    isLoading,
    refetch,
  } = useGetAllBids(pagination);

  const bids: TBid[] = BidsData?.items ?? [];

  const countPages = useMemo(
    () => Math.ceil((BidsData?.count ?? 0) / pagination.page_size),
    [BidsData?.count, pagination.page_size],
  );

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Stack alignItems="center" direction="row" spacing={1}>
        <Typography fontWeight={600} variant="h6">
          Histórico de Lances
        </Typography>
      </Stack>

      {isLoading && <LoadingSkeleton />}

      {isError && (
        <Box>
          <AlertErrorWithReload invalidateQuery={["bids"]} />
        </Box>
      )}

      {bids && bids.length === 0 && (
        <Box py={4} textAlign="center">
          <Typography color="text.secondary" variant="body2">
            Nenhum lance encontrado.
          </Typography>
        </Box>
      )}

      {bids && bids.length > 0 && (
        <List
          disablePadding
          sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}
        >
          {bids.map((bid, index) => {
            const nome =
              `${bid.profile.user.first_name} ${bid.profile.user.last_name}`.trim();
            const dataCriacao = moment(bid.created_at).format(
              "DD/MM/YYYY HH:mm",
            );
            return (
              <Box key={bid.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Typography variant="subtitle2">
                      {moneyMaskFromNumber(bid.bid_amount)}
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{bid.profile.user.first_name?.[0] || "U"}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack
                        alignItems="center"
                        direction="row"
                        flexWrap="wrap"
                        spacing={1}
                      >
                        <Typography fontWeight={600}>{nome}</Typography>
                        <Chip
                          color="primary"
                          label={
                            <Typography fontWeight={600} variant="caption">
                              {bid.profile.cpf}
                            </Typography>
                          }
                          size="small"
                        />
                      </Stack>
                    }
                    secondary={
                      <Stack mt={1} spacing={1}>
                        <Stack direction={"row"} spacing={1}>
                          <Typography color="text.secondary" variant="caption">
                            Carteira:{" "}
                            <strong>{bid.auction.portfolio.name}</strong>
                          </Typography>
                          <Chip
                            color={
                              bid.auction.status === "open"
                                ? "success"
                                : "error"
                            }
                            label={
                              bid.auction.status === "open"
                                ? "Ao vivo"
                                : "Encerrado"
                            }
                            size="small"
                          />
                        </Stack>

                        <Typography color="text.secondary" variant="caption">
                          Criado em: {dataCriacao}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
                {index < bids.length - 1 && <Divider component="li" />}
              </Box>
            );
          })}
        </List>
      )}

      <Box display="flex" justifyContent="center" mb={2} mt={4}>
        <CustomPagination countPages={countPages} route={"/lances"} />
      </Box>
    </Stack>
  );
};
export { WrapperBidsHistory };
