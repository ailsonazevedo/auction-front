import { nameAdminInputs } from "@/constants/regex";
import * as yup from "yup";

const unitSchema = yup.object({
  name: yup
    .string()
    .matches(nameAdminInputs, "Nome inválido")
    .required("Campo obrigatório")
    .trim(),
});

export { unitSchema };
