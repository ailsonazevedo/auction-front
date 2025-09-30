import { IUnit } from "@/@types/admin/unit/IUnit";
import { useQuery } from "@tanstack/react-query";

import { UNITS } from "../../../../services/apiService/endpoints/admin/units";

function useGetOneUnit(id: string | undefined) {
  return useQuery({
    enabled: id !== undefined,
    queryFn: async (): Promise<IUnit> => {
      const requests = await UNITS.getOne(id!);
      return requests;
    },
    queryKey: ["admin", "units", id],
  });
}

export default useGetOneUnit;
