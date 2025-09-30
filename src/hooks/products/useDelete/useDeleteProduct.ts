import { IResponseError } from "@/@types/erro/IResponseError";
import { PRODUCTS } from "@/services/apiService/endpoints/products";
import { responseErrorToast } from "@/utils/functions/@shared/responseErrorToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteProduct = (invalidateQuery: string[]) => {
  const { deleteOne } = PRODUCTS;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = deleteOne(id);
      return Promise.resolve(data);
    },
    onError: async (error: IResponseError) => {
      responseErrorToast(error);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Produto excluído com sucesso");
    },
  });
};

export { useDeleteProduct };
