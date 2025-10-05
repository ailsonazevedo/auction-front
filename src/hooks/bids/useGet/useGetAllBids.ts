import { IPagination } from "@/@types/IPagination";
import { IResponse } from "@/@types/IResponse";
import { TBid } from "@/@types/bid/IBid";
import { BID } from "@/services/apiService/endpoints/bid";
import { useQuery } from "@tanstack/react-query";

function useGetAllBids(pagination?: IPagination) {
  const { getList } = BID;

  const paginationFilter = pagination
    ? `&page=${pagination.page}&page_size=${pagination.page_size}`
    : "";

  const urlFilter = `?${paginationFilter}`;

  return useQuery({
    queryFn: async (): Promise<IResponse<TBid>> => {
      const requests = await getList(urlFilter);
      return requests;
    },
    queryKey: ["bids", pagination],
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllBids };
