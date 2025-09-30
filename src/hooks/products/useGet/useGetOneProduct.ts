import { IResponse } from "@/@types/IResponse";
import { IProduct } from "@/@types/products/IProduct";
import { PRODUCTS_QUERY_KEY } from "@/hooks/products/useGet/useGetAllProducts";
import { PRODUCTS } from "@/services/apiService/endpoints/products";
import { useQuery } from "@tanstack/react-query";

const useGetOneProduct = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryFn: async (): Promise<IResponse<IProduct>> => {
      const requests = await PRODUCTS.getOne(id);
      return requests;
    },
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    refetchOnWindowFocus: false,
  });
};

export { useGetOneProduct };
