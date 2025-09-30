import { useGetMePolicies } from "@/hooks/admin/policies/useGet/useGetMePolicies";
import { defineRulesFor } from "@/utils/ability/defineFor";
import AbilityProvider, {
  AbilityContext,
  AbilityStatusContext,
} from "@/utils/providers/AbilityProvider";
import { PureAbility } from "@casl/ability";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks/admin/policies/useGet/useGetMePolicies");
jest.mock("@/utils/ability/defineFor");
jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("AbilityProvider", () => {
  const mockPolicies = ["policy1", "policy2"];

  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("should provide a default ability when policies are undefined", () => {
    // Mockando o retorno do hook
    (useGetMePolicies as jest.Mock).mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: false,
    });

    render(
      <AbilityProvider>
        <AbilityContext.Consumer>
          {(ability) => (
            <span>
              {ability instanceof PureAbility
                ? "Default Ability"
                : "Custom Ability"}
            </span>
          )}
        </AbilityContext.Consumer>
      </AbilityProvider>,
    );

    // Verifica se o AbilityContext fornece a "Default Ability" quando não há políticas
    expect(screen.getByText("Default Ability")).toBeInTheDocument();
  });

  it("should provide a custom ability when policies are defined", () => {
    // Mockando o retorno do hook e defineRulesFor
    (useGetMePolicies as jest.Mock).mockReturnValue({
      data: mockPolicies,
      isError: false,
      isLoading: false,
    });
    (defineRulesFor as jest.Mock).mockReturnValue("Custom Ability");

    render(
      <AbilityProvider>
        <AbilityContext.Consumer>
          {(ability) => (
            <span>
              <>{ability}</>
            </span>
          )}
        </AbilityContext.Consumer>
      </AbilityProvider>,
    );

    // Verifica se o AbilityContext fornece a habilidade customizada
    expect(screen.getByText("Custom Ability")).toBeInTheDocument();
    // Verifica se defineRulesFor foi chamado com as políticas corretas
    expect(defineRulesFor).toHaveBeenCalledWith(mockPolicies);
  });

  it("should provide the correct loading and error states", () => {
    // Mockando o retorno do hook
    (useGetMePolicies as jest.Mock).mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: true,
    });

    render(
      <AbilityProvider>
        <AbilityStatusContext.Consumer>
          {({ isError, isLoading }) => (
            <span>{`Error: ${isError}, Loading: ${isLoading}`}</span>
          )}
        </AbilityStatusContext.Consumer>
      </AbilityProvider>,
    );

    // Verifica se os estados de erro e carregamento são repassados corretamente
    expect(screen.getByText("Error: true, Loading: true")).toBeInTheDocument();
  });

  it("should provide no error and no loading state when policies are available", () => {
    // Mockando o retorno do hook com sucesso
    (useGetMePolicies as jest.Mock).mockReturnValue({
      data: mockPolicies,
      isError: false,
      isLoading: false,
    });

    render(
      <AbilityProvider>
        <AbilityStatusContext.Consumer>
          {({ isError, isLoading }) => (
            <span>{`Error: ${isError}, Loading: ${isLoading}`}</span>
          )}
        </AbilityStatusContext.Consumer>
      </AbilityProvider>,
    );

    // Verifica se os estados corretos de erro e carregamento são repassados
    expect(
      screen.getByText("Error: false, Loading: false"),
    ).toBeInTheDocument();
  });
});
