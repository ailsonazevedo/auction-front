import { IPortfolio } from "@/@types/portfolio/IPortfolio";
import { moneyMaskFromNumber } from "@/utils/functions/@shared/masks/moneyMask";
import { Card, Link, Typography } from "@mui/material";

interface Props {
  portfolio: IPortfolio;
}

const PortfolioCard = ({ portfolio }: Props) => {
  return (
    <Card sx={{ flex: 2, m: 2, p: 2 }} variant="outlined">
      <Link href="#">
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
      <Typography color="textSecondary" component="div" variant="caption">
        Valor mínimo: {moneyMaskFromNumber(portfolio.minimum_bid)}
      </Typography>
      <Typography component="div" variant="caption">
        Valor total: {moneyMaskFromNumber(portfolio.total_amount)}
      </Typography>

      {/*<Stack alignItems="center" direction="row" spacing={1}>*/}
      {/*  <Typography component="div" variant="h6">*/}
      {/*    {moneyMaskFromNumber(product.price)}*/}
      {/*  </Typography>*/}
      {/*  <Typography color="#FD5426" component="div" variant="caption">*/}
      {/*    {product.percentDiscount}% OFF*/}
      {/*  </Typography>*/}
      {/*</Stack>*/}
      {/*<Typography color="textSecondary" component="div" variant="caption">*/}
      {/*  em {product.installments}x de{" "}*/}
      {/*  {moneyMaskFromNumber(product.installmentsValue)}*/}
      {/*</Typography>*/}
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
        Leilão termina em: {new Date(portfolio.auction_end).toLocaleString()}
      </Typography>
    </Card>
  );
};

export { PortfolioCard };
