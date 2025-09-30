import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import * as React from "react";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
/**
 * Função para renderizar um componente React com um QueryClientProvider já pronto para uso em testes
 * @param ui Recebe um componente React que será renderizado no teste
 * @returns Um objeto contendo as funções de renderização e a instância do QueryClient
 */
export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...renderResult } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );
  return {
    ...renderResult,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>,
      ),
  };
}

/**
 * Função para criar um wrapper para o QueryClientProvider, usado em testes para testar hooks
 * @returns Uma função que recebe um objeto com o children e retorna um wrapper para o QueryClientProvider
 */
export function wrapper() {
  const testQueryClient = createTestQueryClient();
  const createWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
  createWrapper.displayName = "QueryClientProviderWrapper";
  return createWrapper;
}
