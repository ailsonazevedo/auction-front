import { nameAdminInputs } from "@/constants/regex";
import * as yup from "yup";

export const GroupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(nameAdminInputs, "Nome inválido")
    .required("Nome é obrigatório")
    .trim(),
  policies: yup
    .array()
    .of(yup.string().min(8, "Cada política deve ter no mínimo 8 caracteres"))
    .required("Campo obrigatório")
    .min(1, "Deve haver pelo menos uma política"),
});
