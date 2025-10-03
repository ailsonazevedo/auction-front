"use client";
import { IPagination } from "@/@types/IPagination";
import { CustomPagination } from "@/components/@shared/CustomPagination/CustomPagination";
import { SimpleModal } from "@/components/@shared/Modal/SimpleModal";
import { PortfolioForm } from "@/components/portfolios/Forms/PortfolioForm";
import { useGetAllPortfolios } from "@/hooks/portfolios/useGet/useGetAllPortfolios";
import { moneyMaskFromNumber } from "@/utils/functions/@shared/masks/moneyMask";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import moment from "moment";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

moment.locale("pt-br");

const PortfoliosWrappers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [page] = useQueryState(
    "page",
    parseAsString.withDefault("1").withOptions({ clearOnDefault: true }),
  );
  const [portfolioId, setPortfolioId] = useQueryState(
    "portfolioId",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
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
        Carteiras
      </Typography>
      <Button onClick={() => setOpenModal(true)}>Nova Carteira</Button>
      <Grid container spacing={3}>
        {portfoliosResult?.items.map((portfolio, i) => (
          <Grid item key={portfolio.id} lg={3} md={4} sm={6} xs={12}>
            <Card sx={{ flex: 2, m: 2, p: 2 }} variant="outlined">
              <Link href={`/portfolios/${portfolio.id}`} underline="none">
                <Typography
                  color="textSecondary"
                  component="div"
                  fontWeight="bold"
                  mb={2}
                  textAlign={"start"}
                  variant="h6"
                >
                  {portfolio.name}
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
                {portfolio.description}
              </Typography>
              <Typography
                color="textSecondary"
                component="div"
                variant="caption"
              >
                Valor mínimo: {moneyMaskFromNumber(portfolio.minimum_bid)}
              </Typography>
              <Typography component="div" variant="caption">
                Valor total: {moneyMaskFromNumber(portfolio.total_amount)}
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
                Expira em:{" "}
                {moment
                  .utc(portfolio.auction_end)
                  .format("DD/MM/YYYY [às] HH:mm[h]")}
              </Typography>
              <Box display="flex" gap={1} justifyContent="flex-end" mt={1}>
                <IconButton
                  aria-label="Editar carteira"
                  color="primary"
                  onClick={() => {
                    setPortfolioId(portfolio.id);
                    setOpenModal(true);
                  }}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="Remover carteira"
                  color="error"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mb={2} mt={4}>
        <CustomPagination countPages={countPages} route={"/portfolios"} />
      </Box>
      <SimpleModal
        onClose={() => {
          setOpenModal(false);
          setPortfolioId("");
        }}
        open={openModal}
        title={portfolioId ? "Editar Carteira" : "Nova Carteira"}
      >
        <PortfolioForm
          onClose={() => {
            setOpenModal(false);
            setPortfolioId("");
          }}
          portfolioId={portfolioId}
        />
      </SimpleModal>
    </Box>
  );
};

export { PortfoliosWrappers };
