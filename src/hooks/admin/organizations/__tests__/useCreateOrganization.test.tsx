import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ORGANIZATIONS } from "@/services/apiService/endpoints/admin/organizations";
import { renderHook, act } from "@testing-library/react";
import { useCreateOrganization } from "../useCreate/useCreateOrganization";

// Mock da função create e toast
jest.mock("@/services/apiService/endpoints/admin/organizations", () => ({
  ORGANIZATIONS: {
    create: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("useCreateOrganization", () => {
  let queryClient: QueryClient;
  let invalidateQueriesMock: jest.SpyInstance;

  beforeEach(() => {
    queryClient = new QueryClient();
    // Aqui criamos um mock para a função invalidateQueries
    invalidateQueriesMock = jest
      .spyOn(queryClient, "invalidateQueries")
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("deve criar a organização com sucesso", async () => {
    // Mock da função create
    (ORGANIZATIONS.create as jest.Mock).mockResolvedValue({
      data: { message: "success" },
    });

    const { result } = renderHook(
      () => useCreateOrganization(["organizations"]),
      { wrapper },
    );

    // Executar a mutation
    await act(async () => {
      await result.current.mutateAsync({ name: "Test Organization" });
    });

    // Verificar se a função foi chamada com os dados corretos
    expect(ORGANIZATIONS.create).toHaveBeenCalledWith({
      name: "Test Organization",
    });

    // Verificar se o toast de sucesso foi chamado
    expect(toast.success).toHaveBeenCalledWith(
      "Organização criada com sucesso",
    );

    // Verificar se a query foi invalidada
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["organizations"],
    });
  });

  it("deve mostrar erro em caso de falha na criação", async () => {
    // Mock da função create para retornar erro
    (ORGANIZATIONS.create as jest.Mock).mockRejectedValue(new Error("Error"));

    const { result } = renderHook(
      () => useCreateOrganization(["organizations"]),
      { wrapper },
    );

    // Executar a mutation e capturar o erro
    await act(async () => {
      try {
        await result.current.mutateAsync({ name: "Test Organization" });
      } catch (e) {
        // O erro é capturado aqui
      }
    });

    // Verificar se o toast de erro foi chamado
    expect(toast.error).toHaveBeenCalledWith("Algo deu errado");

    // Verificar se a query foi invalidada mesmo em caso de erro
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["organizations"],
    });
  });
});
