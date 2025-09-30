import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { LoadingIconsErros } from "../LoadingIconsErros";

describe("LoadingIconsErros Component", () => {
  const queryClient = new QueryClient();

  const invalidateQueryMock = jest.fn();

  const setup = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoadingIconsErros invalidateQuery={["testQuery"]} />
      </QueryClientProvider>,
    );
  };

  test("should render IconButton with ReplayIcon", () => {
    setup();
    expect(screen.getByTestId("ReplayIcon")).toBeInTheDocument();
  });

  test("should call invalidateQueries when IconButton is clicked", () => {
    queryClient.invalidateQueries = invalidateQueryMock;
    setup();

    const iconButton = screen.getByRole("button");
    fireEvent.click(iconButton);

    expect(invalidateQueryMock).toHaveBeenCalledWith({
      queryKey: ["testQuery"],
    });
  });
});
