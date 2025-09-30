import { RECOVER_PASSWORD } from "@/services/apiService/endpoints/auth/recoverPassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useForgotPassword() {
  const queryClient = useQueryClient();
  const { post } = RECOVER_PASSWORD;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await post(data);
      return response;
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Email enviado com sucesso", {
        id: "success-forgot-password",
      });
    },
  });
}

export default useForgotPassword;
