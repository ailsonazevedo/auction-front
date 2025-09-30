import AuthLoginForm from "@/components/auth/Forms/LoginForm";
import { renderWithClient } from "@/utils/tests/functions";
import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Mock secureLocalStorage
jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockUseLogin = jest.fn();
jest.mock("@/hooks/auth/useLogin/useLogin", () => ({
  ...jest.requireActual("@/hooks/auth/useLogin/useLogin"),
  __esModule: true,
  default: () => ({
    mutateAsync: mockUseLogin,
  }),
}));

describe("LoginForm", () => {
  describe("render", () => {
    beforeEach(() => {
      renderWithClient(<AuthLoginForm />);
    });

    it("deve renderizar o email e o label", () => {
      expect(screen.getByLabelText(/email/i)).toBeVisible();
    });
    it("deve renderizar o email e o label", () => {
      expect(screen.getByLabelText(/senha/i)).toBeVisible();
    });
    it("deve renderizar o link para esqueceu a senha", () => {
      expect(
        screen.getByText("Esqueceu a senha ?", {
          selector: "a",
        }),
      ).toBeVisible();
    });
    it("deve renderizar o botão de entrar", () => {
      expect(screen.getByRole("button", { name: /entrar/i })).toBeVisible();
    });
  });
  describe("behavior", () => {
    let emailInput: HTMLElement;
    let passwordInput: HTMLElement;
    let submitButton: HTMLElement;

    beforeEach(() => {
      renderWithClient(<AuthLoginForm />);
      emailInput = screen.getByLabelText(/email/i);
      passwordInput = screen.getByLabelText(/senha/i);
      submitButton = screen.getByRole("button", { name: /entrar/i });
    });
    it("deve exibir erro de validação para email e senha vazias", async () => {
      await userEvent.click(submitButton);
      const errorMessages = await screen.findAllByText("Campo obrigatório");
      expect(errorMessages).toHaveLength(2);
      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
    });
    it("deve exibir mensagem de erro para email inválido", async () => {
      await userEvent.type(emailInput, "invalid-email");
      await userEvent.tab();
      await screen.findByText("Email inválido");
      expect(emailInput).toHaveValue("invalid-email");
    });
    it("deve exibir erro de validação para senha menor que 8 caracteres", async () => {
      await userEvent.type(passwordInput, "invalid");
      await userEvent.tab();
      expect(
        await screen.findByText("Senha deve ter mínimo de 8 caracteres"),
      ).toBeInTheDocument();
    });

    it("renderiza elementos de title, subtext e subtitle quando for passado como props", async () => {
      const title = "Login";
      const subtext = <div>Subtext</div>;
      const renderRes = renderWithClient(
        <AuthLoginForm subtext={subtext} title={title} />,
      );
      expect(renderRes.getByText(title)).toBeInTheDocument();
      expect(screen.getByText("Subtext")).toBeInTheDocument();
    });
    it("link de esqueceu a senha tem a rota /esqueceu-senha", async () => {
      const linkForgotPassword = screen.getByText(/esqueceu a senha/i, {
        selector: "a",
      });
      expect(linkForgotPassword).toHaveAttribute("href", "/esqueceu-senha");
      expect(linkForgotPassword).toBeVisible();
    });
    it("link de registrar tem a rota /registrar", async () => {
      const linkRegister = screen.getByText(/registre-se/i, { selector: "a" });
      expect(linkRegister).toHaveAttribute("href", "/registrar");
      expect(linkRegister).toBeVisible();
    });
    it("deve renderizar um svg quando o botão for clicado e os inputs validos", async () => {
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeVisible();
      });
    });

    it("deve chamar o useLogin quando o botão for clicado e os inputs validos", async () => {
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "ValidPass1@" } });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockUseLogin).toHaveBeenCalledWith({
          email: "valid@email.com",
          password: "ValidPass1@",
        });
      });
    });
    it("inputs devem estar desabilitados quando o botão for clicado", async () => {
      userEvent.click(submitButton);
      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
      });
    });
  });
});
