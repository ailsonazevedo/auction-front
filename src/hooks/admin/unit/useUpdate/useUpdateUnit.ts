import { IUnit } from "@/@types/admin/unit/IUnit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { CUSTOM_UNIT } from "../../../../services/apiService/endpoints/admin/units";

const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, unitData }: { id: string; unitData: IUnit }) => {
      const data = await CUSTOM_UNIT.update(id, unitData);
      return Promise.resolve(data);
    },
    onError: async (error: any) => {
      toast.error("Erro ao atualizar unidade");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Unidade atualizada com sucesso");
    },
  });
};

export default useUpdateUnit;
