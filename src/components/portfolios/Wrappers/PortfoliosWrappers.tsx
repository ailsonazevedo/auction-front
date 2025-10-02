"use client";
import { IPagination } from "@/@types/IPagination";
import { CustomPagination } from "@/components/@shared/CustomPagination/CustomPagination";
import { PortfolioCard } from "@/components/portfolios/Cards/PortfolioCard";
import { useGetAllPortfolios } from "@/hooks/portfolios/useGet/useGetAllPortfolios";
import { Box, Grid, Typography } from "@mui/material";
import { parseAsString, useQueryState } from "nuqs";

const PortfoliosWrappers = () => {
  const [page] = useQueryState(
    "page",
    parseAsString.withDefault("1").withOptions({ clearOnDefault: true }),
  );
  const pagination: IPagination = {
    page: parseInt(page, 10),
    page_size: 30,
  };
  const {
    data: portfoliosResult,
    isError: isErrorPortfolios,
    isLoading: isLoadingPortfolios,
  } = useGetAllPortfolios(pagination);

  const countPages = Math.ceil(
    (portfoliosResult?.count ?? 0) / pagination.page_size,
  );

  if (isLoadingPortfolios) {
    return <Typography>Carregando...</Typography>;
  }

  if (isErrorPortfolios) {
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
        Carteiras Disponíveis
      </Typography>
      <Grid container spacing={3}>
        {portfoliosResult?.items.map((portfolios, i) => (
          <Grid item key={portfolios.id} lg={3} md={4} sm={6} xs={12}>
            <PortfolioCard portfolio={portfolios} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mb={2} mt={4}>
        <CustomPagination countPages={countPages} route={"/"} />
      </Box>
    </Box>
  );
};

export { PortfoliosWrappers };
