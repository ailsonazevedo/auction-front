import { getYupValidation } from "@/utils/functions/@shared/getYupValidation";
import * as yup from "yup";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email inválido")
    .required("Campo obrigatório"),
});
const resetPasswordSchema = yup.object({
  newPassword: getYupValidation("password"),
  token: yup
    .string()
    .trim()
    .max(50, "Máximo 50 caracteres")
    .required("Campo obrigatório"),
});

export { forgotPasswordSchema, resetPasswordSchema };
