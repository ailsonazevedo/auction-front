import AuthRegisterForm from "@/components/auth/Forms/RegisterForm";
import { renderWithClient } from "@/utils/tests/functions";
import { Link, Typography } from "@mui/material";
import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockUseRegister = jest.fn();
const mockPush = jest.fn();
jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));
jest.mock("@/hooks/auth/useRegister/useRegister", () => ({
  ...jest.requireActual("@/hooks/auth/useRegister/useRegister"),
  __esModule: true,
  default: () => ({
    mutateAsync: mockUseRegister,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));
const subtitle = (
  <>
    <Typography color="textSecondary" fontWeight="400" variant="h6">
      Já tem uma conta?
    </Typography>
    <Typography
      component={Link}
      fontWeight="500"
      href="/entrar"
      sx={{
        color: "primary.main",
        textDecoration: "none",
      }}
    >
      Entrar
    </Typography>
  </>
);

describe("RegisterForm", () => {
  describe("render", () => {
    beforeEach(() => {
      renderWithClient(<AuthRegisterForm subtitle={subtitle} />);
    });

    it("deve renderizar o email e o label", () => {
      expect(
        screen.getByRole("textbox", {
          name: /Email/i,
        }),
      ).toBeVisible();
    });
    it("deve renderizar a confirmação senha e o label", async () => {
      expect(screen.getByLabelText("Senha")).toBeVisible();
    });
    it("deve renderizar a confirmação senha e o label", async () => {
      expect(screen.getByLabelText("Repetir senha")).toBeVisible();
    });
    it("deve renderizar o checkbox para aceitar termos de uso", async () => {
      expect(screen.getByTestId(/checkbox-terms/i)).toBeVisible();
    });
    it("deve renderizar o link para termos de uso", async () => {
      expect(screen.getByText(/Termos de Uso/i)).toBeVisible();
    });
  });
  describe("behavior", () => {
    let emailInput: HTMLElement;
    let passwordInput: HTMLElement;
    let cadastrarButton: HTMLElement;
    let confirmPasswordInput: HTMLElement;
    let cpfInput: HTMLElement;
    let nameInput: HTMLElement;
    let cnpjInput: HTMLElement;
    let dateOfBirthInput: HTMLElement;
    let termsOfUseCheckbox: HTMLElement;

    beforeEach(() => {
      renderWithClient(<AuthRegisterForm subtitle={subtitle} />);
      emailInput = screen.getByPlaceholderText("email@example.com");
      passwordInput = screen.getByPlaceholderText("senha");
      confirmPasswordInput = screen.getByPlaceholderText("repetir senha");
      termsOfUseCheckbox = screen.getByTestId(/checkbox-terms/i);
      cadastrarButton = screen.getByRole("button", { name: /cadastrar/i });
      nameInput = screen.getByPlaceholderText("exemplo");
      cpfInput = screen.getByPlaceholderText("123.345.678-89");
      dateOfBirthInput = screen.getByPlaceholderText("DD/MM/AAAA");
    });
    it("Botao de cadastrar deve estar desabilitado quando inicializar o form", async () => {
      expect(cadastrarButton).toBeDisabled();
    });
    it("3 campos foram focados, botão deve estar desabilitado e 3 mensagens de erro devem estar visíveis", async () => {
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
      fireEvent.blur(confirmPasswordInput);
      expect(cadastrarButton).toBeDisabled();
      const errorMessages = await screen.findAllByText("Campo obrigatório");
      expect(errorMessages).toHaveLength(3);
    });
    it("inputs validos, mas o checkbox não marcado, botão deve estar desabilitado", async () => {
      await userEvent.type(emailInput, "valid@email.com");
      await userEvent.type(passwordInput, "ValidPass1@");
      await userEvent.type(confirmPasswordInput, "ValidPass1@");
      expect(cadastrarButton).toBeDisabled();
    });
    it("inputs validos, checkbox marcado, botão deve estar habilitado e submitando", async () => {
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
        fireEvent.change(passwordInput, { target: { value: "ValidPass1@" } });
        fireEvent.change(confirmPasswordInput, {
          target: { value: "ValidPass1@" },
        });
        fireEvent.change(cpfInput, { target: { value: "12345678901" } });
        fireEvent.change(dateOfBirthInput, { target: { value: "1990-01-01" } });
        fireEvent.change(nameInput, { target: { value: "Teste" } });
        fireEvent.click(termsOfUseCheckbox);
        fireEvent.click(cadastrarButton);
      });

      await waitFor(() => {
        expect(mockUseRegister).toHaveBeenCalledWith({
          cnpj: "",
          cpf: "123.456.789-01",
          dateOfBirth: "Data inválida",
          email: "valid@email.com",
          name: "Teste",
          password: "ValidPass1@",
          profilePhoto: "",
          unitId: "66d5fdc0688c914833f2465f",
        });
        expect(mockPush).toHaveBeenCalledWith("/entrar");
      });
    });
    it("deve exibir mensagem de erro quando a senha tem menos de 8 caracteres", async () => {
      await userEvent.type(passwordInput, "invali");
      await userEvent.tab();
      expect(
        await screen.findByText("Senha deve ter mínimo de 8 caracteres"),
      ).toBeInTheDocument();
      expect(passwordInput).toHaveValue("invali");
    });

    it("deve exibir mensagem de erro quando a senha não tem uma letra maiúscula", async () => {
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "shortfdff");
      await userEvent.tab();
      expect(
        await screen.findByText("Senha deve ter uma letra maiuscula"),
      ).toBeInTheDocument();
      expect(passwordInput).toHaveValue("shortfdff");
    });

    it("deve exibir mensagem de erro quando a senha não tem um número", async () => {
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "ShortFDFFf");
      await userEvent.tab();
      expect(
        await screen.findByText("Senha deve ter um numero"),
      ).toBeInTheDocument();
      expect(passwordInput).toHaveValue("ShortFDFFf");
    });

    it("deve exibir mensagem de erro quando a senha não tem um caractere especial", async () => {
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "ShortFDFF1f");
      await userEvent.tab();
      expect(
        await screen.findByText("Senha deve ter um caractere especial"),
      ).toBeInTheDocument();
      expect(passwordInput).toHaveValue("ShortFDFF1f");
    });

    it("não deve exibir mensagem de erro quando a senha é válida", async () => {
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "ShortFD1f!");
      await userEvent.tab();
      expect(passwordInput).toHaveValue("ShortFD1f!");
      const passwordHelperText = screen.queryByTestId("password-helper-text");
      expect(passwordHelperText).not.toBeInTheDocument();
    });
  });
  describe("props", () => {
    it("deve renderizar o title quando for passado como props", () => {
      const titleText = "registrar aqui";
      renderWithClient(
        <AuthRegisterForm subtitle={subtitle} title={titleText} />,
      );
      const titleElement = screen.getByText(titleText, {
        selector: "h3",
      });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent(titleText);
    });
    it("deve renderizar o subtext quando for passado como props", () => {
      const subtextText = "subtext";
      renderWithClient(
        <AuthRegisterForm
          subtext={<div>{subtextText}</div>}
          subtitle={subtitle}
        />,
      );
      const subtextElement = screen.getByText(subtextText, {
        selector: "div",
      });
      expect(subtextElement).toBeInTheDocument();
      expect(subtextElement).toHaveTextContent(subtextText);
    });
    it("deve renderizar o subtitle quando for passado como props", () => {
      const subtitle = (
        <>
          <Typography variant="h6">Já tem uma conta?</Typography>
          <Typography
            component={Link}
            href="/entrar"
            sx={{
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            Entrar
          </Typography>
        </>
      );

      renderWithClient(<AuthRegisterForm subtitle={subtitle} />);

      const subtitleElement = screen.getByText("Já tem uma conta?", {
        selector: "h6",
      });
      expect(subtitleElement).toBeVisible();
      expect(subtitleElement).toHaveTextContent("Já tem uma conta?");

      const linkElement = screen.getByText("Entrar", {
        selector: "a",
      });
      expect(linkElement).toBeVisible();
      expect(linkElement).toHaveTextContent("Entrar");
      expect(linkElement).toHaveAttribute("href", "/entrar");
    });
  });
});
