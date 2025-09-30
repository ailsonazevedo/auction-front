import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email inválido")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email inválido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .trim()
    .min(8, "Senha deve ter mínimo de 8 caracteres")
    .required("Campo obrigatório"),
});

export { loginSchema };
