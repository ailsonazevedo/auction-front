import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import OrganizationForm from "../OrganizationForm";

const queryClient = new QueryClient();
jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));
const mockUseUpdateOrganization = jest.fn();
jest.mock(
  "@/hooks/admin/organizations/useUpdate/useUpdateOrganization",
  () => ({
    ...jest.requireActual(
      "@/hooks/admin/organizations/useUpdate/useUpdateOrganization",
    ),
    __esModule: true,
    default: () => ({
      mutateAsync: mockUseUpdateOrganization,
    }),
  }),
);

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

describe("OrganizationForm", () => {
  describe("render", () => {
    it("Deve renderizar o skeleton enquanto os dados estão sendo carregados", () => {
      const mockUniData = {
        name: "Teste",
      };
      (useQuery as jest.Mock).mockImplementation(() => ({
        data: mockUniData,
        isFetching: true,
        isLoading: true,
      }));

      render(
        <QueryClientProvider client={queryClient}>
          <OrganizationForm organizationId="1" />
        </QueryClientProvider>,
      );

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryFn: expect.any(Function),
          queryKey: ["admin", "organizations", "1"],
        }),
      );

      const skeleton = document.querySelector(".MuiSkeleton-root");
      expect(skeleton).toBeInTheDocument();
    });

    it("Deve renderizar o campo de nome e o botão de submit", () => {
      const mockUniData = {
        name: "Teste",
      };
      (useQuery as jest.Mock).mockImplementation(() => ({
        data: mockUniData,
        isFetching: false,
        isLoading: false,
      }));

      render(
        <QueryClientProvider client={queryClient}>
          <OrganizationForm organizationId="1" />
        </QueryClientProvider>,
      );

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryFn: expect.any(Function),
          queryKey: ["admin", "organizations", "1"],
        }),
      );

      const nameInput = screen.getByLabelText(/Nome/i);
      const submitButton = screen.getByRole("button", {
        name: /Salvar/i,
      });

      expect(nameInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    let nameInput: HTMLElement;
    let submitButton: HTMLElement;

    beforeEach(() => {
      const mockUniData = {
        name: "Teste",
      };
      (useQuery as jest.Mock).mockImplementation(() => ({
        data: mockUniData,
        isFetching: false,
        isLoading: false,
      }));

      render(
        <QueryClientProvider client={queryClient}>
          <OrganizationForm organizationId="1" />
        </QueryClientProvider>,
      );

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryFn: expect.any(Function),
          queryKey: ["admin", "organizations", "1"],
        }),
      );
      nameInput = screen.getByLabelText(/Nome/i);
      submitButton = screen.getByRole("button", {
        name: /Salvar/i,
      });
    });

    it("Deve verificar se o botão está desabilitado quando o campo está vazio", () => {
      expect(submitButton).toBeDisabled();
    });

    it("Deve verificar se o botão está habilitado quando o campo está preenchido", async () => {
      await userEvent.type(nameInput, "Teste");

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    });
  });
});
