import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "As senhas devem ser iguais")
    .required("Campo obrigatório"),
  currentPassword: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Campo obrigatório"),
  newPassword: yup
    .string()
    .min(8, "Senha deve ter mínimo de 8 caracteres")
    .max(64, "Excedeu o tamanho máximo")
    .matches(/\w*[A-Z]\w*/, "Senha deve ter uma letra maiuscula")
    .matches(/\d/, "Senha deve ter um numero")
    .matches(
      /[!@#$%^&*()\-_"=+{};:,.<>]/,
      "Senha deve ter um caractere especial",
    )
    .notOneOf(
      [yup.ref("currentPassword")],
      "A nova senha não pode ser igual á senha atual",
    )
    .required("Campo obrigatório"),
});
