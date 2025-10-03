"use client";
import { IPagination } from "@/@types/IPagination";
import { CustomPagination } from "@/components/@shared/CustomPagination/CustomPagination";
import { useGetAllAuctions } from "@/hooks/auctions/useGet/useGetAllAuctions";
import { moneyMaskFromNumber } from "@/utils/functions/@shared/masks/moneyMask";
import { Box, Card, Grid, Link, Typography } from "@mui/material";
import { parseAsString, useQueryState } from "nuqs";

const WrapperListAuctions = () => {
  const [page] = useQueryState(
    "page",
    parseAsString.withDefault("1").withOptions({ clearOnDefault: true }),
  );
  const pagination: IPagination = {
    page: parseInt(page, 10),
    page_size: 30,
  };
  const {
    data: auctionsResult,
    isError: isErrorAuctions,
    isLoading: isLoadingAuctions,
  } = useGetAllAuctions(pagination);

  const countPages = Math.ceil(
    (auctionsResult?.count ?? 0) / pagination.page_size,
  );

  if (isLoadingAuctions) {
    return <Typography>Carregando...</Typography>;
  }

  if (isErrorAuctions) {
    return <Typography>Erro ao carregar as carteiras.</Typography>;
  }

  return (
    <Box mt={4} px={2}>
      <Typography
        color="textSecondary"
        component="div"
        fontWeight="bold"
        mb={2}
        textAlign={"center"}
        variant="h4"
      >
        Carteiras em Leilão
      </Typography>
      <Grid container spacing={3}>
        {auctionsResult?.items.map((auction, i) => (
          <Grid item key={auction.portfolio.id} lg={3} md={4} sm={6} xs={12}>
            <Card sx={{ flex: 2, m: 2, p: 2 }} variant="outlined">
              <Link href={`/auction/${auction.id}`} underline="none">
                <Typography
                  color="textSecondary"
                  component="div"
                  fontWeight="bold"
                  mb={2}
                  textAlign={"start"}
                  variant="h6"
                >
                  {auction.portfolio.name}
                </Typography>
              </Link>
              <Typography
                component="div"
                gutterBottom
                mt={2}
                sx={{
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  display: "-webkit-box",
                  minHeight: 48,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="button"
              >
                {auction.portfolio.description}
              </Typography>
              <Typography
                color="textSecondary"
                component="div"
                variant="caption"
              >
                Valor mínimo:{" "}
                {moneyMaskFromNumber(auction.portfolio.minimum_bid)}
              </Typography>
              <Typography component="div" variant="caption">
                Valor total:{" "}
                {moneyMaskFromNumber(auction.portfolio.total_amount)}
              </Typography>
              <Typography
                color="#FD5426"
                component="div"
                fontWeight="bold"
                sx={{
                  minHeight: 20,
                }}
                textAlign={"start"}
                variant="caption"
              >
                Leilão termina em:{" "}
                {new Date(auction.portfolio.auction_end).toLocaleString()}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mb={2} mt={4}>
        <CustomPagination countPages={countPages} route={"/"} />
      </Box>
    </Box>
  );
};

export { WrapperListAuctions };
