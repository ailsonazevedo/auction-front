import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

import useLogin from "../useLogin/useLogin";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
  useSearchParams: jest.fn(() => ({ get: jest.fn() })),
}));
jest.mock("react-hot-toast");
jest.mock("react-secure-storage", () => ({
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("useLogin hook teste", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();

    global.window = Object.create(window);
    const url = "http://localhost:3000/";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        origin: "http://localhost:3000",
      },

      writable: true,
    });
  });
  afterEach(() => {
    secureLocalStorage.removeItem("USER");
  });

  it("deve retornar uma funcao", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });
    expect(typeof result.current.mutate).toBe("function");
  });

  it("deve chamar a função de mutation com os dados corretos", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ decodedData: "test-data" }),
      ok: true,
    });
    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(fetch).toHaveBeenCalledWith("api/auth/login", {
      body: JSON.stringify({
        email: "test@test.com",
        password: "password",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  });

  it("deve tratar erros corretamente", async () => {
    const testCases = [
      {
        expectedMessage: "Email e/ou senha inválidos.",
        status: 401,
        statusCode: 401,
        toastId: "credentials",
      },
      {
        expectedMessage: "Permissão negada.",
        status: 403,
        statusCode: 403,
        toastId: "permission",
      },
      {
        expectedMessage: "Erro ao conectar ao servidor \n Tente novamente.",
        status: 500,
        statusCode: 500,
        toastId: "server",
      },
      {
        expectedMessage: "Algo deu errado.",
        status: 418,
        statusCode: 418,
        toastId: "geral",
      },
    ];
    for (const { expectedMessage, status, statusCode, toastId } of testCases) {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ statusCode }),
        ok: false,
        status,
      });

      const { result } = renderHook(() => useLogin(), { wrapper });

      await act(async () => {
        result.current.mutate({
          email: "test@test.com",
          password: "password",
        });
      });
      expect(toast.error).toHaveBeenCalledWith(expectedMessage, {
        duration: 2000,
        id: toastId,
      });
    }
  });

  it("deve chamar onSettled depois da mutação", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ decodedData: "test-data" }),
      ok: true,
    });

    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(invalidateQueriesSpy).toHaveBeenCalled();
  });

  it("deve salvar o dados no localstorage", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ decodedData: "test-data" }),
      ok: true,
    });
    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(secureLocalStorage.setItem).toHaveBeenCalledWith(
      "USER",
      "test-data",
    );
  });

  it("deve redirecionar para a rota de sucesso", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ decodedData: "test-data" }),
      ok: true,
    });

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(window.location.href).toBe(`${window.location.origin}/`);
  });

  it("deve redirecionar para autenticação de dois fatores quando necessário", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      redirected: true,
      url: "http://localhost:3000/dois-fatores?2fa=mockToken",
    });

    const { result } = renderHook(() => useLogin(), { wrapper });
    global.window = Object.create(window);
    const url = "http://localhost:3000/dois-fatores?2fa=mockToken";
    Object.defineProperty(window, "location", {
      value: {
        href: url,
        origin: "http://localhost:3000",
      },

      writable: true,
    });
    // Mocking window.location.href
    await act(async () => {
      result.current.mutate({
        email: "test@test.com",
        password: "password",
      });
    });

    expect(window.location.href).toBe(
      `${window.location.origin}/dois-fatores?2fa=mockToken`,
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Necessário autenticação de dois fatores.",
      {
        duration: 2000,
        iconTheme: {
          primary: "#FFDB58",
          secondary: "white",
        },
        id: "success need 2fa",
      },
    );
  });
});
