import { IPermission } from "@/@types/auth/IPermission";
import { PERMISSIONS } from "@/services/apiService/endpoints/admin/permissions";
import { useQuery } from "@tanstack/react-query";

function useGetOnePermission(id: string) {
  const { getOne } = PERMISSIONS;

  return useQuery({
    enabled: !!id,

    queryFn: async (): Promise<IPermission> => {
      const requests = await getOne(id);
      return requests;
    },
    queryKey: ["admin", "policies", id],
    refetchOnWindowFocus: false,
  });
}

export { useGetOnePermission };
