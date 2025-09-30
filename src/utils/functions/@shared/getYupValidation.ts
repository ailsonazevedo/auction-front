import { emailRegex, nameRegex } from "@/constants/regex";
import * as yup from "yup";

type EnumTypes =
  | "array"
  | "boolean"
  | "cnpj"
  | "cpf"
  | "email"
  | "name"
  | "object"
  | "password"
  | "richText"
  | "string"
  | "telefone";

const getYupValidation = (type: EnumTypes) => {
  switch (type) {
    case "name":
      return yup
        .string()
        .trim()
        .max(224, "Máximo 224 caracteres")
        .matches(nameRegex, "Nome inválido")
        .required("Campo obrigatório");
    case "cpf":
      return yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF está inválido")
        .min(14, "CPF está incompleto")
        .required("Campo obrigatório");
    case "password":
      return yup
        .string()
        .min(8, "Senha deve ter mínimo de 8 caracteres")
        .max(64, "Excedeu o tamanho máximo")
        .matches(/\w*[A-Z]\w*/, "Senha deve ter uma letra maiuscula")
        .matches(/\d/, "Senha deve ter um numero")
        .matches(
          /[!@#$%^&*()\-_"=+{};:,.<>]/,
          "Senha deve ter um caractere especial",
        )
        .required("Campo obrigatório");
    case "email":
      return yup
        .string()
        .trim()
        .max(254, "Excedeu o tamanho máximo")
        .matches(emailRegex, "Email inválido")
        .required("Campo obrigatório");
    case "telefone":
      return yup
        .string()
        .trim()
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido")
        .required("Campo obrigatório");
    case "cnpj":
      return yup
        .string()
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ está incompleto")
        .required("Campo obrigatório");
    case "array":
      return yup
        .string()
        .min(1, "Campo obrigatório")
        .required("Campo obrigatório");
    case "richText":
      return yup
        .string()
        .required("O conteúdo do parecer não pode ser vazio.")
        .test(
          "O conteúdo do parecer não pode ser vazio.",
          "O conteúdo do parecer não pode ser vazio.",
          (value) => {
            const onlyEmptyTagsRegex = /^(<(p|h1|h2|h3)>\s*<\/\2>\s*)*$/i;
            return !onlyEmptyTagsRegex.test(value);
          },
        );
    case "boolean":
      return yup.boolean().required("Campo obrigatório");
    default:
      return yup.string().required("Campo obrigatório");
  }
};

export { getYupValidation };
