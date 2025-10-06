import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Tabs } from "../Tabs"; // ajuste o caminho conforme necessário

describe("Tabs Component", () => {
  const tabsItems = [
    { label: "Content of Tab 1", title: "Tab 1", value: "1" },
    { label: "Content of Tab 2", title: "Tab 2", value: "2" },
    { label: "Content of Tab 3", title: "Tab 3", value: "3" },
  ];

  test("should show the correct panel when a tab is clicked", () => {
    let value = "1";
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      value = newValue;
      rerender(
        <Tabs onChange={handleChange} tabsItems={tabsItems} value={value} />,
      );
    };

    const { rerender } = render(
      <Tabs onChange={handleChange} tabsItems={tabsItems} value={value} />,
    );

    // Verificações iniciais
    expect(screen.getByText("Content of Tab 1")).toBeInTheDocument();
    expect(screen.queryByText("Content of Tab 2")).not.toBeInTheDocument();

    // Simular clique na aba 2
    fireEvent.click(screen.getByText("Tab 2"));

    // Verificações após o clique
    expect(screen.getByText("Content of Tab 2")).toBeInTheDocument();
    expect(screen.queryByText("Content of Tab 1")).not.toBeInTheDocument();
  });
});
