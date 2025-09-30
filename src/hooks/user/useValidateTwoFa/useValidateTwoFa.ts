import { VALIDATE_QRCODE } from "@/services/apiService/endpoints/admin/users/qrcodeMethods/validateTwoFa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useValidateTwoFa() {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await VALIDATE_QRCODE.create(token);
      return Promise.resolve(response);
    },
    onError: async (error: { response?: { status: number } } & Error) => {
      switch (error.response?.status) {
        case 403:
          toast.error("Sem permissão para acessar este recurso.", {
            id: "qrcodeGenericError",
          });
          break;
        case 500:
          toast.error("Erro ao conectar ao servidor. Tente novamente", {
            id: "qrcodeGenericError",
          });
          break;
        default:
          toast.error(
            "Erro ao validar código de autenticação de dois fatores.",
            {
              id: "qrcodeGenericError",
            },
          );
          break;
      }
    },
    onMutate: async () => {
      toast.loading("Validando cõdigo...", { id: "loadingqrcode" });
    },
    onSettled: () => {
      toast.dismiss("loadingqrcode");
    },
    onSuccess: () => {
      toast.success("Código validado com sucesso.", {
        id: "qrcodeGerateSuccess",
      });
    },
  });
}

export default useValidateTwoFa;
