import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertErrorWithReload } from "../AlertErrorWithRealod";

describe("AlertErrorWithReload Component", () => {
  const queryClient = new QueryClient();

  const invalidateQueryMock = jest.fn();

  const setup = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AlertErrorWithReload invalidateQuery={["testQuery"]} />
      </QueryClientProvider>,
    );
  };

  test("should render correctly", () => {
    setup();
    expect(screen.getByText("Erro ao carregar dados")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Recarregar/i }),
    ).toBeInTheDocument();
  });

  test("should call invalidateQueries when 'Recarregar' button is clicked", () => {
    queryClient.invalidateQueries = invalidateQueryMock;
    setup();

    const reloadButton = screen.getByRole("button", { name: /Recarregar/i });
    fireEvent.click(reloadButton);

    expect(invalidateQueryMock).toHaveBeenCalledWith({
      queryKey: ["testQuery"],
    });
  });

  test("should display ReplayIcon", () => {
    setup();
    const replayIcon = screen.getByTestId("ReplayIcon");
    expect(replayIcon).toBeInTheDocument();
  });
});
