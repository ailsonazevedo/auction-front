import { emailRegex, nameRegex } from "@/constants/regex";
import * as yup from "yup";

const registerSchema = yup.object({
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ está incompleto"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Senhas não coincidem")
    .required("Campo obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF está inválido")
    .min(14, "CPF está incompleto")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .trim()
    .max(254, "Excedeu o tamanho máximo")
    .matches(emailRegex, "Email inválido")
    .required("Campo obrigatório"),
  name: yup
    .string()
    .trim()
    .matches(nameRegex, "Nome inválido")
    .required("Campo obrigatório")
    .matches(nameRegex, "Nome inválido"),
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
    .required("Campo obrigatório"),
  termsOfUse: yup
    .boolean()
    .oneOf([true], "É necessário aceitar os termos de uso")
    .required("É necessário aceitar os termos de uso"),
});

export { registerSchema };
