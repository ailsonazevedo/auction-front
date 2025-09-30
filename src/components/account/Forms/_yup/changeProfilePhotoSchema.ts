import * as yup from "yup";

const changeProfilePhotoSchema = yup.object({
  profilePhoto: yup.string().required("Campo obrigatório"),
});

export { changeProfilePhotoSchema };
