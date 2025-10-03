import * as yup from "yup";

const portfolioSchema = yup.object({
  auction_end: yup
    .date()
    .required("Campo obrigatório")
    .typeError("Data inválida"),
  description: yup.string().trim().required("Campo obrigatório"),
  minimum_bid: yup.string().trim().required("Campo obrigatório"),
  name: yup.string().trim().required("Campo obrigatório"),
  total_amount: yup.string().trim().required("Campo obrigatório"),
});

export { portfolioSchema };
