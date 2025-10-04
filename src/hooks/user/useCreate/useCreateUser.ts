import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { PROFILES } from "../../../services/apiService/endpoints/auth/users";

type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};

function useCreateUser(invalidateQuery: string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await PROFILES.create(data);
      if (response.error) {
        throw response;
      }
      return Promise.resolve(response);
    },
    onError: async (error: ErrorResponse) => {
      toast.dismiss("loadingCreateUser");
      if (error.statusCode === 400) {
        toast.error("Email já cadastrado.", { id: "errorEmail" });
        return;
      }
      toast.error("Algo deu errado", { id: "errorGeneric" });
    },
    onMutate: async () => {
      toast.loading("Criando...", { id: "loadingCreateUser" });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: invalidateQuery });
      toast.dismiss("loadingCreateUser");
    },
    onSuccess: () => {
      toast.dismiss("loadingCreateUser");
      toast.success("Usuário criado com sucesso", { id: "createUserSuccess" });
    },
  });
}
export default useCreateUser;
