import { useQuery } from "@tanstack/react-query";

import { USERS } from "../../../services/apiService/endpoints/admin/users";

function useGetUser() {
  return useQuery({
    queryFn: async () => {
      const response = await USERS.getList();
      return response;
    },

    queryKey: ["user"],
  });
}

export { useGetUser };
