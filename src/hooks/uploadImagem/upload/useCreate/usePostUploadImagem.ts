import { IResponseError } from "@/@types/erro/IResponseError";
import { uploadImage } from "@/services/apiUploadImagem/endpoints/uploadImagem";
import { responseErrorToast } from "@/utils/functions/@shared/responseErrorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function usePostUploadImagem() {
  const { getLinkImage } = uploadImage;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File): Promise<IUploadImageResponse[]> => {
      const formData = new FormData();
      formData.append("files", file as Blob);
      const response = await getLinkImage(formData);
      if (response.status !== 201) {
        throw response.data;
      }
      return Promise.resolve(response.data);
    },
    onError: async (error: IResponseError) => {
      responseErrorToast(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadImagemBlob"] });
    },
    onSuccess: () => {
      toast.success("Arquivo enviado com sucesso.");
    },
  });
}

export { usePostUploadImagem };
