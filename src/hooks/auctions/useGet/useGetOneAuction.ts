import { TAuction } from "@/@types/auction/IAuction";
import { AUCTIONS } from "@/services/apiService/endpoints/auction";
import { useQuery } from "@tanstack/react-query";

function useGetOneAuction(id: string) {
  const { getOne } = AUCTIONS;

  return useQuery({
    enabled: !!id,
    queryFn: async (): Promise<TAuction> => {
      const requests = await getOne(id);
      return requests;
    },
    queryKey: ["portfolio", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOneAuction };
