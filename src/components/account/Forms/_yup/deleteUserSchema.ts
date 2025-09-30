import * as yup from "yup";

const deleteUserSchema = yup.object({
  password: yup.string().trim().required("Campo obrigatório"),
});

export { deleteUserSchema };
