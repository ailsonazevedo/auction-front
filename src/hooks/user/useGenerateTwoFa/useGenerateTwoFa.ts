import { GENERATE_QRCODE } from "@/services/apiService/endpoints/admin/users/qrcodeMethods/generateTwoFa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useGenerateTwoFa() {
  return useMutation({
    mutationFn: async () => {
      const response = await GENERATE_QRCODE.create();
      if (response.status !== 200) throw new Error("Erro ao gerar qrcode.");
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    },
    onError: async (error) => {
      toast.error(error.message, { id: "qrcodeGenericError" });
    },
    onMutate: async () => {
      toast.loading("Gerando qrcode...", { id: "loadingqrcode" });
    },
    onSettled: () => {
      toast.dismiss("loadingqrcode");
    },
    onSuccess: () => {
      toast.success("Qrcode gerado com sucesso.", {
        id: "qrcodeGerateSuccess",
      });
    },
  });
}

export default useGenerateTwoFa;
