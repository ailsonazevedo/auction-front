import { RESET_PASSWORD } from "@/services/apiService/endpoints/auth/resetPassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

function useResetPassword() {
  const queryClient = useQueryClient();
  const { post } = RESET_PASSWORD;
  const originUrl = typeof window !== "undefined" ? window.location.origin : "";
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await post(data);
      return response;
    },
    onError: async (error: AxiosError) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            toast.error("Token inválido.", {
              id: "error-reset-password",
            });
            break;
          case 404:
            toast.error("Não foi possível encontrar o usuário.", {
              id: "error-reset-password",
            });
            break;
          case 500:
            toast.error(
              "Erro ao tentar conectar com o servidor, n/ Tente novamente.",
              {
                id: "error-reset-password",
              },
            );
            break;
          default:
        }
      }
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Senha atualizada com sucesso.", {
        id: "success-reset-password",
      });
      setTimeout(() => {
        window.location.href = `${originUrl}/entrar`;
      }, 2000);
    },
  });
}

export default useResetPassword;
