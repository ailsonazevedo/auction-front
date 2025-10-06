// import React from 'react';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { SimpleAlert } from "../SimpleAlert";
describe("SimpleAlert", () => {
  it("renders with default props", () => {
    render(
      <SimpleAlert title="Default Title">This is a default alert</SimpleAlert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Default Title")).toBeInTheDocument();
    expect(screen.getByText("This is a default alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardSuccess");
  });

  it("renders with custom severity and variant", () => {
    render(
      <SimpleAlert severity="warning" title="Warning Title" variant="outlined">
        This is a warning alert
      </SimpleAlert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Warning Title")).toBeInTheDocument();
    expect(screen.getByText("This is a warning alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-outlinedWarning");
  });

  it("renders with error severity", () => {
    render(
      <SimpleAlert severity="error" title="Error Title">
        This is an error alert
      </SimpleAlert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Error Title")).toBeInTheDocument();
    expect(screen.getByText("This is an error alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardError");
  });

  it("renders with info severity", () => {
    render(
      <SimpleAlert severity="info" title="Info Title">
        This is an info alert
      </SimpleAlert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Info Title")).toBeInTheDocument();
    expect(screen.getByText("This is an info alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardInfo");
  });
});
