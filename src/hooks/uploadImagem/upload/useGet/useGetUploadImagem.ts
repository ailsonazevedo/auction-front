import { IResponse } from "@/@types/IResponse";
import { uploadImage } from "@/services/apiUploadImagem/endpoints/uploadImagem";
import { useQuery } from "@tanstack/react-query";

function useGetUploadImagem(file: File | undefined) {
  const { getLinkImage } = uploadImage;
  const formData = new FormData();
  formData.append("files", file as Blob);
  return useQuery({
    enabled: !!file,
    queryFn: async (): Promise<IResponse<IUploadImageResponse>> => {
      return await getLinkImage(formData);
    },
    queryKey: ["uploadImagemBlob", file?.name],
    refetchOnWindowFocus: false,
    select: (data) => data.data[0] ?? undefined,
  });
}

export { useGetUploadImagem };
