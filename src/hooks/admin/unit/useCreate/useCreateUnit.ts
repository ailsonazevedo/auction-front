import { IUnit } from "@/@types/admin/unit/IUnit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { UNITS } from "../../../../services/apiService/endpoints/admin/units";

const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (unitData: IUnit) => {
      const data = await UNITS.create(unitData);
      return Promise.resolve(data);
    },
    onError: async (error: any) => {
      toast.error("Erro ao criar unidade");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Unidade criada com sucesso");
    },
  });
};

export default useCreateUnit;
