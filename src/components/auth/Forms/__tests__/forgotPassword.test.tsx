import AuthForgotPasswordForm from "@/components/auth/Forms/ForgotPassowordForm";
import { renderWithClient } from "@/utils/tests/functions";
import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

const mockUseForgot = jest.fn();
jest.mock("@/hooks/auth/useForgotPassword/useForgotPassword", () => ({
  ...jest.requireActual("@/hooks/auth/useForgotPassword/useForgotPassword"),
  __esModule: true,
  default: () => ({
    mutateAsync: mockUseForgot,
  }),
}));

describe("AuthForgotPasswordForm", () => {
  test("renderiza email input e botão", () => {
    renderWithClient(<AuthForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", {
      name: /esqueci a senha/i,
    });
    const backButton = screen.getByRole("link", {
      name: /voltar para o login/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  test("mostra mensagem de erro quando o botão for clicado sem preencher o email", async () => {
    renderWithClient(<AuthForgotPasswordForm />);

    const submitButton = screen.getByRole("button", {
      name: /esqueci a senha/i,
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Campo obrigatório/i)).toBeInTheDocument();
    });
  });

  test("botão redireciona para login", async () => {
    renderWithClient(<AuthForgotPasswordForm />);

    const backButton = screen.getByRole("link", {
      name: /voltar para o login/i,
    });
    expect(backButton).toHaveAttribute("href", "/entrar");
  });
  test("deve chamar o useForgot quando o botão for clicado e os inputs validos", async () => {
    renderWithClient(<AuthForgotPasswordForm />);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "valid@email.com" },
      });
      fireEvent.click(screen.getByRole("button", { name: /esqueci a senha/i }));
    });
    await waitFor(() => {
      expect(mockUseForgot).toHaveBeenCalledWith({
        email: "valid@email.com",
      });
    });
  });
});
