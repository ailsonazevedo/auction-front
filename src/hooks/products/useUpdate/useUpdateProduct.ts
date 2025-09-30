import { IResponseError } from "@/@types/erro/IResponseError";
import { IProduct } from "@/@types/products/IProduct";
import { PRODUCTS } from "@/services/apiService/endpoints/products";
import { responseErrorToast } from "@/utils/functions/@shared/responseErrorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProduct = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: Partial<IProduct>;
      id: string;
    }) => {
      const request = await PRODUCTS.patch(data, id);
      return Promise.resolve(request);
    },
    onError: async (error: IResponseError) => {
      responseErrorToast(error);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso");
    },
  });
};

export { useUpdateProduct };
