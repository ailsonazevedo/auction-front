import * as yup from "yup";

const auctionSchema = yup.object({
  portfolio_id: yup.string().trim().required("Campo obrigatório"),
  status: yup.string().trim().required("Campo obrigatório"),
});

export { auctionSchema };
