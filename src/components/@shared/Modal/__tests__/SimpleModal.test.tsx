import { SimpleModal } from "@/components/@shared/Modal/SimpleModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

const queryClient = new QueryClient();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("mockToken"),
  }),
}));

const renderComponent = (props = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <SimpleModal open={true} title="Test Modal" {...props}>
        <div>Modal Content</div>
      </SimpleModal>
    </QueryClientProvider>,
  );
};

describe("SimpleModal", () => {
  it("deve renderizar corretamente", () => {
    renderComponent();
    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("deve exibir o título corretamente", () => {
    renderComponent();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("deve exibir o conteúdo corretamente", () => {
    renderComponent();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("deve fechar ao clicar no botão de fechar", () => {
    const handleClose = jest.fn();
    renderComponent({ onClose: handleClose });

    fireEvent.click(screen.getByRole("button"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
