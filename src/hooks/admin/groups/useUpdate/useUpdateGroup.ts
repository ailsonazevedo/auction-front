import { IGroup } from "@/@types/admin/groups/IGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { CUSTOM_GROUP_PATCH } from "../../../../services/apiService/endpoints/admin/groups";

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      unitData,
    }: {
      id: string;
      unitData: Partial<IGroup>;
    }) => {
      const data = await CUSTOM_GROUP_PATCH.update(id, unitData);
      return Promise.resolve(data);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Grupo atualizado com sucesso");
    },
  });
};

export default useUpdateGroup;
