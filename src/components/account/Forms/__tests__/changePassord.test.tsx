import { useGetOneUser } from "@/hooks/user/useGet/useGetOneUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChangePasswordForm } from "../ChangePasswordForm";

const queryClient = new QueryClient();

jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock("@/hooks/user/useGet/useGetOneUser");

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("render", () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    (useGetOneUser as jest.Mock).mockReturnValue({
      data: { isTwoFactorAuthenticationEnabled: true },
    });
    render(<ChangePasswordForm />, { wrapper });
  });
  it("deveria renderizar o input da senha atual e a label", () => {
    const currentPasswordLabel = screen.getByText("Senha Atual");
    const currentPasswordInput = screen.getByLabelText("Senha Atual");
    expect(currentPasswordLabel).toBeInTheDocument();
    expect(currentPasswordLabel).toHaveTextContent("Senha Atual");
    expect(currentPasswordInput).toBeInTheDocument();
  });

  it("deveria renderizar o input da nova senha e a label", () => {
    const newPasswordLabel = screen.getByText("Nova Senha");
    const newPasswordInput = screen.getByLabelText("Nova Senha");
    expect(newPasswordLabel).toBeInTheDocument();
    expect(newPasswordLabel).toHaveTextContent("Nova Senha");
    expect(newPasswordInput).toBeInTheDocument();
  });

  it("deveria renderizar o input de confirmação da nova senha e a label", () => {
    const confirmPasswordLabel = screen.getByText("Confirmar Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar Senha");
    expect(confirmPasswordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toHaveTextContent("Confirmar Senha");
    expect(confirmPasswordInput).toBeInTheDocument();
  });
});

describe("behavior", () => {
  let currentPasswordInput: HTMLElement;
  let newPasswordInput: HTMLElement;
  let confirmPasswordInput: HTMLElement;
  let submitButton: HTMLElement;

  beforeEach(() => {
    render(<ChangePasswordForm />, { wrapper });

    currentPasswordInput = screen.getByLabelText("Senha Atual");
    newPasswordInput = screen.getByLabelText("Nova Senha");
    confirmPasswordInput = screen.getByLabelText("Confirmar Senha");
    submitButton = screen.getByText("Alterar Senha");
  });

  it("Erro em deixar o campo Senha Atual vazio", async () => {
    (useGetOneUser as jest.Mock).mockReturnValue({
      data: { isTwoFactorAuthenticationEnabled: false },
    });

    await userEvent.type(newPasswordInput, "newPassword123");
    await userEvent.type(confirmPasswordInput, "newPassword123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });
  });

  it("Erro em deixar o campo Nova Senha vazio", async () => {
    (useGetOneUser as jest.Mock).mockReturnValue({
      data: { isTwoFactorAuthenticationEnabled: false },
    });

    render(<ChangePasswordForm />, { wrapper });
    await userEvent.type(currentPasswordInput, "currentPassword123");
    await userEvent.type(confirmPasswordInput, "newPassword123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });
  });

  it("Erro Nova Senha e Confirmar Senha diferentes", async () => {
    (useGetOneUser as jest.Mock).mockReturnValue({
      data: { isTwoFactorAuthenticationEnabled: false },
    });

    render(<ChangePasswordForm />, { wrapper });
    await userEvent.type(currentPasswordInput, "currentPassword123");
    await userEvent.type(newPasswordInput, "newPassword123");
    await userEvent.type(confirmPasswordInput, "newPassword1234");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("As senhas devem ser iguais"),
      ).toBeInTheDocument();
    });
  });
});

describe("2FA", () => {
  it("não deveria renderizar o botão de validação de dois fatores quando o usuário não tem dois fatores habilitados", async () => {
    (useGetOneUser as jest.Mock).mockReturnValue({
      data: { isTwoFactorAuthenticationEnabled: true },
    });

    render(<ChangePasswordForm />, { wrapper });

    const twoFaButton = screen.queryByText("Validar dois fatores");
    expect(twoFaButton).toBeInTheDocument();
  });
});
