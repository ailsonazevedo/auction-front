import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PERMISSIONS } from "@/services/apiService/endpoints/admin/policies";
import { renderHook, act } from "@testing-library/react";
import { useCreatePolicies } from "../useCreate/useCreatePolicie";

// Mock da função create e toast
jest.mock("@/services/apiService/endpoints/admin/policies", () => ({
  POLICIES: {
    create: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
}));

describe("useCreatePolicies", () => {
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

  it("deve criar a política com sucesso", async () => {
    // Mock da função create
    (PERMISSIONS.create as jest.Mock).mockResolvedValue({
      data: { message: "success" },
    });

    const { result } = renderHook(() => useCreatePolicies(["policies"]), {
      wrapper,
    });

    // Executar a mutation
    await act(async () => {
      return await result.current.mutateAsync({
        name: "Test Policy",
        actions: [],
        effect: "",
        resources: [],
      });
    });

    // Verificar se a função foi chamada com os dados corretos
    expect(PERMISSIONS.create).toHaveBeenCalledWith({
      actions: [],
      effect: "",
      name: "Test Policy",
      resources: [],
    });

    // Verificar se o toast de sucesso foi chamado
    expect(toast.success).toHaveBeenCalledWith("Politica criada com sucesso");

    // Verificar se a query foi invalidada
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["policies"],
    });
  });

  it("deve mostrar erro em caso de falha na criação", async () => {
    // Mock da função create para retornar erro
    (PERMISSIONS.create as jest.Mock).mockRejectedValue(new Error("Error"));

    const { result } = renderHook(() => useCreatePolicies(["policies"]), {
      wrapper,
    });

    // Executar a mutation e capturar o erro
    await act(async () => {
      try {
        await result.current.mutateAsync({
          name: "Test Policy",
          actions: [],
          effect: "",
          resources: [],
        });
      } catch (e) {
        // O erro é capturado aqui
      }
    });

    // Verificar se o toast de erro foi chamado
    expect(toast.error).toHaveBeenCalledWith("Error: Error");

    // Verificar se a query foi invalidada mesmo em caso de erro
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["policies"],
    });
  });
});
