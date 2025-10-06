import { render, screen } from "@testing-library/react";
import React from "react";

import { LayoutProviders } from "../LayoutProviders";

jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("LayoutProviders", () => {
  it("renders its child component", () => {
    render(
      <LayoutProviders>
        <div data-testid="child-component"></div>
      </LayoutProviders>,
    );

    expect(screen.getByTestId("child-component")).toBeInTheDocument();
  });
});
