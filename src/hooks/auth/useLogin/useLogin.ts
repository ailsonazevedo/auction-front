import { USER_LOCAL_STORAGE } from "@/constants/localStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const regex = /(<|>|%3C|%3E|'|")|(script)|(\bon[a-z]+)/gi;

function sanitizeInput(url: string): string {
  const result = regex.test(url);
  if (url.includes("error")) return "/";
  return result ? "/" : url;
}

function useLogin() {
  const queryClient = useQueryClient();
  const originUrl = typeof window !== "undefined" ? window.location.origin : "";
  const searchParams = useSearchParams();
  const url = searchParams.get("redirect_to") ?? "/";
  const sanitizeUrl = sanitizeInput(url);

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("api/auth/login", {
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (response.redirected) {
        return { redirect: response.url };
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return response.json();
    },
    onError: async (error: { statusCode: number }) => {
      switch (error.statusCode) {
        case 401:
          toast.error("Email e/ou senha inválidos.", {
            duration: 2000,
            id: "credentials",
          });
          return;
        case 403:
          toast.error("Permissão negada.", {
            duration: 2000,
            id: "permission",
          });
          return;
        case 500:
          toast.error("Erro ao conectar ao servidor \n Tente novamente.", {
            duration: 2000,
            id: "server",
          });
          return;
        default:
          toast.error("Algo deu errado.", { duration: 2000, id: "geral" });
          return;
      }
    },
    onMutate: async () => {
      toast.loading("Autenticando...", { id: "loading" });
    },
    onSettled: () => {
      toast.dismiss("loading");
      queryClient.invalidateQueries();
    },

    onSuccess: async (data) => {
      if (data.redirect) {
        toast.success("Necessário autenticação de dois fatores.", {
          duration: 2000,
          iconTheme: {
            primary: "#FFDB58",
            secondary: "white",
          },
          id: "success need 2fa",
        });
        setTimeout(() => {
          window.location.href = `${originUrl}/${data.redirect}`;
        }, 1000);
        return;
      }
      secureLocalStorage.setItem(USER_LOCAL_STORAGE, data.decodedData);
      toast.success("Login feito com sucesso.", {
        duration: 2000,
        id: "success",
      });

      setTimeout(() => {
        window.location.href = `${originUrl}/${sanitizeUrl}`;
      }, 1000);
    },
  });
}

export default useLogin;
