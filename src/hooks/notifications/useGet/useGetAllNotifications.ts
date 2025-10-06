import { INotification } from "@/@types/INotification";
import { NOTIFICATION } from "@/services/apiService/endpoints/notifications";
import { useQuery } from "@tanstack/react-query";

function useGetAllNotifications() {
  const { getList } = NOTIFICATION;

  return useQuery({
    queryFn: async (): Promise<INotification[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["notifications"],
    refetchOnWindowFocus: false,
  });
}

export { useGetAllNotifications };
