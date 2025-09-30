import { IUnit } from "@/@types/admin/unit/IUnit";
import { useQuery } from "@tanstack/react-query";

import { UNITS } from "../../../../services/apiService/endpoints/admin/units";

const useGetAllUnits = () => {
  return useQuery({
    queryFn: async (): Promise<IUnit[]> => {
      const requests = await UNITS.getList();
      return requests;
    },
    queryKey: ["admin", "units"],
    refetchOnWindowFocus: false,
  });
};

export default useGetAllUnits;
