import * as yup from "yup";

const createNewUserSchema = yup.object({
  address: yup.string().trim().optional(),
  email: yup
    .string()
    .trim()
    .email("Email inválido")
    .required("Campo obrigatório"),
  firstName: yup.string().trim().optional(),
  lastName: yup.string().trim().optional(),
  phone: yup.string().trim().optional(),
});

export { createNewUserSchema };
