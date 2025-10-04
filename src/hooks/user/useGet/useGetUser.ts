import { useQuery } from "@tanstack/react-query";

import { PROFILES } from "../../../services/apiService/endpoints/auth/users";

function useGetUser() {
  return useQuery({
    queryFn: async () => {
      const response = await PROFILES.getList();
      return response;
    },

    queryKey: ["user"],
  });
}

export { useGetUser };
