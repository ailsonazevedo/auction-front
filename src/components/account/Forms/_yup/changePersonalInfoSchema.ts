import { nameRegex } from "@/constants/regex";
import * as yup from "yup";

const changePersonalInfoSchema = yup.object({
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ está incompleto")
    .required("Campo obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF está inválido")
    .min(14, "CPF está incompleto")
    .required("Campo obrigatório"),
  dateOfBirth: yup.string().required("Campo obrigatório"),
  name: yup
    .string()
    .trim()
    .matches(nameRegex, "Nome inválido")
    .required("Campo obrigatório"),
  //   email: yup.string().trim().email("Email inválido").required("Campo obrigatório"),
  phone: yup.string().trim().optional(),
});

export { changePersonalInfoSchema };
