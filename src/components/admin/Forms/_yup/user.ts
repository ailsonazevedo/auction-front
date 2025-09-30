import { emailRegex, nameRegex } from "@/constants/regex";
import * as yup from "yup";

const userSchemaCreate = yup.object({
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ está incompleto")
    .optional()
    .trim(),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF está incompleto")
    .optional()
    .trim()
    .min(14, "CPF inválido"),
  email: yup
    .string()
    .trim()
    .max(254, "Excedeu o tamanho máximo")
    .matches(emailRegex, "Email inválido")
    .required("Campo obrigatório"),
  name: yup
    .string()
    .trim()
    .max(243, "Excedeu o tamanho máximo")
    .matches(nameRegex, "Nome inválido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve ter mínimo de 8 caracteres")
    .max(64, "Excedeu o tamanho máximo")
    .matches(/\w*[A-Z]\w*/, "Senha deve ter uma letra maiuscula")
    .matches(/\d/, "Senha deve ter um numero")
    .matches(
      /[!@#$%^&*()\-_"=+{};:,.<>]/,
      "Senha deve ter um caractere especial",
    )
    .required("Campo obrigatório")
    .trim(),
});

const userSchemaUpdate = yup.object({
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ está incompleto")
    .optional()
    .trim(),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF está incompleto")
    .optional()
    .trim()
    .min(14, "CPF inválido"),
  email: yup
    .string()
    .trim()
    .max(254, "Excedeu o tamanho máximo")
    .matches(emailRegex, "Email inválido")
    .required("Campo obrigatório")
    .trim(),
  name: yup.string().trim(),
});

export { userSchemaCreate, userSchemaUpdate };
