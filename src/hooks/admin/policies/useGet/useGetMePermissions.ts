import { IPermission } from "@/@types/auth/IPermission";
import { PERMISSIONS } from "@/services/apiService/endpoints/admin/permissions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

function useGetMePermissions() {
  const pathname = usePathname();
  const authPages = [
    "/entrar",
    "/registrar",
    "/esqueci-senha",
    "/dois-fatores",
  ];
  const { getList } = PERMISSIONS;
  return useQuery({
    enabled: !authPages.includes(pathname),
    queryFn: async (): Promise<IPermission[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "policies", "me"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetMePermissions };
