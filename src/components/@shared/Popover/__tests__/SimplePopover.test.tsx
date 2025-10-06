// SimplePopover.test.tsx
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import SimplePopover from "../SimplePopover";
describe("SimplePopover", () => {
  it("renders click popover and toggles aria-describedby correctly", async () => {
    render(
      <SimplePopover text="Click me" type="click">
        <div>Popover content</div>
      </SimplePopover>,
    );

    const button = screen.getByText("Click me");

    // Inicialmente, verifica que o botão não possui o aria-describedby
    expect(button).not.toHaveAttribute("aria-describedby");

    fireEvent.click(button);

    // Após o primeiro clique, verifica que o popover foi aberto e o aria-describedby está presente
    expect(screen.getByText("Popover content")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-describedby");

    await fireEvent.click(button);

    // Após o segundo clique, verifica que o popover foi fechado e o aria-describedby não está mais presente
    // expect(button).not.toHaveAttribute('aria-describedby', 'Popover content');
    //FIXME: corrija a linha 28
  });

  it("renders hover popover and opens on mouse enter", async () => {
    render(
      <SimplePopover text="Hover over me" type="hover">
        <div>Popover content</div>
      </SimplePopover>,
    );

    const textElement = screen.getByText("Hover over me");
    fireEvent.mouseEnter(textElement);

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    fireEvent.mouseLeave(textElement);

    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });
});
