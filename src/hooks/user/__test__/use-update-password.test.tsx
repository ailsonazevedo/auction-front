import { changePassword } from "@/services/apiService/endpoints/auth/changePassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

import { useUpdatePassword } from "../useUpdate/useUpdatePassword";

jest.mock("react-hot-toast");
jest.mock("react-secure-storage", () => ({
  removeItem: jest.fn(),
}));
jest.mock("react-hot-toast");
jest.mock("@/services/apiService/endpoints/auth/changePassword", () => ({
  changePassword: {
    update: jest.fn(),
  },
}));
describe("useUpdatePassword hook teste", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    secureLocalStorage.removeItem("USER");
  });

  it("deve retornar uma funcao", () => {
    const { result } = renderHook(() => useUpdatePassword(), { wrapper });
    expect(typeof result.current.mutate).toBe("function");
  });

  it("deve chamar a função de mutation com os dados corretos", async () => {
    (changePassword.update as jest.Mock).mockResolvedValueOnce({
      data: "Success",
    });

    const { result } = renderHook(() => useUpdatePassword(), { wrapper });

    await act(async () => {
      result.current.mutate({
        newPassword: "test@test.com",
        oldPassword: "password",
      });
    });
    expect(changePassword.update).toHaveBeenCalledWith({
      newPassword: "test@test.com",
      oldPassword: "password",
    });
    expect(toast.success).toHaveBeenCalledWith("Senha atualizada com sucesso", {
      id: "success",
    });
  });
  it("deve chamar onSettled depois da mutação", async () => {
    (changePassword.update as jest.Mock).mockResolvedValueOnce({
      data: "Success",
    });
    const invalidateQueriesSpy = jest.spyOn(queryClient, "invalidateQueries");
    const { result } = renderHook(() => useUpdatePassword(), { wrapper });
    await act(async () => {
      result.current.mutate({
        newPassword: "test@test.com",
        oldPassword: "password",
      });
    });

    expect(invalidateQueriesSpy).toHaveBeenCalled();
  });
  it("Deve mostrar uma mensagem de erro se houver algum erro", async () => {
    (changePassword.update as jest.Mock).mockRejectedValueOnce({
      response: { status: 400 },
    });
    const { result } = renderHook(() => useUpdatePassword(), { wrapper });
    await act(async () => {
      result.current.mutate({
        newPassword: "test@test.com",
        oldPassword: "password",
      });
    });
    expect(toast.error).toHaveBeenCalledWith("Senha atual está errada.", {
      id: "errorCredentials",
    });
  });
});
