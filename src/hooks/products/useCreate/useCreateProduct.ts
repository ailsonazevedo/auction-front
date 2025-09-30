import { IResponseError } from "@/@types/erro/IResponseError";
import { IProduct } from "@/@types/products/IProduct";
import { PRODUCTS } from "@/services/apiService/endpoints/products";
import { responseErrorToast } from "@/utils/functions/@shared/responseErrorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateProduct = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<IProduct>) => {
      const response = await PRODUCTS.create(data);
      if (response.error) {
        throw response;
      }
      return Promise.resolve(response);
    },
    onError: async (error: IResponseError) => {
      responseErrorToast(error);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Produto criado com sucesso");
    },
  });
};

export { useCreateProduct };
