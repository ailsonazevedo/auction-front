import {
  TChangePassword,
  changePassword,
} from "@/services/apiService/endpoints/auth/changePassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TChangePassword) => {
      const response = await changePassword.update(data);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      if (error.response.status === 400) {
        toast.error("Senha atual está errada.", { id: "errorCredentials" });
        return;
      }
      toast.error("Algo deu errado. Por favor, tente novamente.", {
        id: "errorPassword",
      });
    },
    onMutate: async () => {
      toast.loading("Atualizando...", { id: "loadingChangePassword" });
    },
    onSettled: () => {
      toast.dismiss("loadingChangePassword");
      queryClient.invalidateQueries();
    },
    onSuccess: () => {
      toast.success("Senha atualizada com sucesso", { id: "success" });
    },
  });
}

export { useUpdatePassword };
