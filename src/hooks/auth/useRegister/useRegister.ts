import { registerUser } from "@/actions/register-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await registerUser(data);
      if (response.statusCode) {
        return Promise.reject(new Error(response.message));
      }
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      if (error.statusCode === 400) {
        toast.error(error.message, {
          duration: 2000,
          id: "Error bad request register",
        });
        return;
      }
      toast.error("Algo deu errado", {
        duration: 2000,
        id: "register error Generic",
      });
    },
    onMutate: async () => {
      toast.loading("Registrando...", { id: "loading" });
    },
    onSettled: () => {
      toast.dismiss("loading");
      queryClient.invalidateQueries();
    },
    onSuccess: () => {
      toast.success("Usuário criado com sucesso", {
        duration: 2000,
        id: "register success",
      });
    },
  });
}

export default useRegister;
