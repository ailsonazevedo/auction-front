import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UnitsForm } from "../UnitsForm";

const queryClient = new QueryClient();
jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));
const mockCreateUnit = jest.fn();
jest.mock("@/hooks/admin/unit/useCreate/useCreateUnit", () => {
  return {
    __esModule: true,
    default: () => ({
      mutateAsync: mockCreateUnit,
    }),
  };
});

const mockUseUpdateUnit = jest.fn();
jest.mock("@/hooks/admin/unit/useUpdate/useUpdateUnit", () => {
  return {
    __esModule: true,
    default: () => ({
      mutateAsync: mockUseUpdateUnit,
    }),
  };
});

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

describe("UnitsForm", () => {
  describe("behaviorRender", () => {
    it("Deve renderizar um Skeleton enquanto os dados estão sendo buscados", () => {
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
          <UnitsForm unitId="1" />
        </QueryClientProvider>,
      );

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryFn: expect.any(Function),
          queryKey: ["admin", "units", "1"],
        }),
      );

      const skeleton = document.querySelector(".MuiSkeleton-root");
      expect(skeleton).toBeInTheDocument();
    });

    it("Deve renderizar o campo de nome e o botão de submit após os dados serem carregados", () => {
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
          <UnitsForm unitId="1" />
        </QueryClientProvider>,
      );

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryFn: expect.any(Function),
          queryKey: ["admin", "units", "1"],
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

  describe("behaviorForm", () => {
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
          <UnitsForm unitId="1" />
        </QueryClientProvider>,
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

    it("Deve verificar se, ao focar no campo, apagar o texto, e desfocar, há o retorno de aviso de Campo obrigatório", async () => {
      await userEvent.type(nameInput, "Teste");
      await userEvent.clear(nameInput);
      await fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/Campo obrigatório/i)).toBeInTheDocument();
      });
    });
  });

  describe("behaviorCreate", () => {
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
          <UnitsForm unitId={undefined} />
        </QueryClientProvider>,
      );

      nameInput = screen.getByLabelText(/Nome/i);
      submitButton = screen.getByRole("button", {
        name: /Salvar/i,
      });
    });

    it("Deve verificar se o hook de criação é chamada com os valores corretos", async () => {
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "Unidade de teste");

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });

      await userEvent.click(submitButton);

      const values = {
        name: "Unidade de teste",
      };

      await waitFor(() => {
        expect(mockCreateUnit).toHaveBeenCalledWith(values);
      });
    });
  });

  describe("behaviorUpdate", () => {
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
          <UnitsForm unitId="1" />
        </QueryClientProvider>,
      );

      nameInput = screen.getByLabelText(/Nome/i);
      submitButton = screen.getByRole("button", {
        name: /Salvar/i,
      });
    });

    it("Deve verificar se o hook de atualização é chamada com os valores corretos", async () => {
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "Dado alterado");

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });

      await userEvent.click(submitButton);

      const values = {
        id: "1",
        unitData: {
          name: "Dado alterado",
        },
      };

      await waitFor(() => {
        expect(mockUseUpdateUnit).toHaveBeenCalledWith(values);
      });
    });
  });
});
