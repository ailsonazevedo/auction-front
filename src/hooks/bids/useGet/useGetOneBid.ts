import { TBid } from "@/@types/bid/IBid";
import { BID } from "@/services/apiService/endpoints/bid";
import { useQuery } from "@tanstack/react-query";

function useGetOneBid(id: string) {
  const { getOne } = BID;

  return useQuery({
    enabled: !!id && id !== "",
    queryFn: async (): Promise<TBid> => {
      const requests = await getOne(id);
      return requests;
    },
    queryKey: ["portfolio", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOneBid };
