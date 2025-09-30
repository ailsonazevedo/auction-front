import { registerUser } from "@/actions/register-user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import toast from "react-hot-toast";

import useRegister from "../useRegister/useRegister";

jest.mock("react-hot-toast");
jest.mock("@/actions/register-user");
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
}));

describe("useRegister hook", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma funcao", () => {
    const { result } = renderHook(() => useRegister(), { wrapper });
    expect(typeof result.current.mutate).toBe("function");
  });

  it("deve chamar a função de mutation com os dados corretos", async () => {
    (registerUser as jest.Mock).mockImplementation(() =>
      Promise.resolve({ statusCode: null }),
    );

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(registerUser).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password",
    });
  });

  it("deve tratar erros corretamente", async () => {
    const testCases = [
      {
        expectedMessage: "Erro específico do usuário.",
        response: { message: "Erro específico do usuário.", statusCode: 400 },
        statusCode: 400,
        toastId: "Error bad request register",
      },
      {
        expectedMessage: "Algo deu errado",
        response: { message: "Erro do servidor.", statusCode: 500 },
        statusCode: 500,
        toastId: "register error Generic",
      },
    ];

    for (const { expectedMessage, response, toastId } of testCases) {
      (registerUser as jest.Mock).mockImplementation(() =>
        Promise.reject(response),
      );

      const { result } = renderHook(() => useRegister(), { wrapper });

      await act(async () => {
        try {
          result.current.mutate({
            email: "test@test.com",
            password: "password",
          });
        } catch (error: any) {}
      });

      expect(toast.error).toHaveBeenCalledWith(expectedMessage, {
        duration: 2000,
        id: toastId,
      });
    }
  });

  it("deve exibir uma mensagem de sucesso ao registrar um usuário", async () => {
    (registerUser as jest.Mock).mockImplementation(() =>
      Promise.resolve({ statusCode: null }),
    );

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(toast.success).toHaveBeenCalledWith("Usuário criado com sucesso", {
      duration: 2000,
      id: "register success",
    });
  });
});
