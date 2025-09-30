import { nameAdminInputs } from "@/constants/regex";
import * as yup from "yup";

const policiesSchema = yup.object({
  actions: yup.array().of(yup.string().required("Ação é obrigatória").trim()),
  effect: yup.string().oneOf(["Allow", "Deny"]).required("Campo obrigatório"),
  name: yup
    .string()
    .matches(nameAdminInputs, "Nome inválido")
    .required("Nome é obrigatório")
    .trim(),
  resources: yup
    .array()
    .of(yup.string().required("Recurso é obrigatório").trim()),
});

export { policiesSchema };
