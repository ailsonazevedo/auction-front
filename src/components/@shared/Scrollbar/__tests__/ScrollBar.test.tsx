// Scrollbar.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

import Scrollbar from "../Scrollbar";
describe("Scrollbar Component", () => {
  it("renders without crashing", () => {
    render(
      <Scrollbar sx={{ backgroundColor: "red" }}>
        <div>Content</div>
      </Scrollbar>,
    );
    const contentElement = screen.getByText(/Content/i);
    expect(contentElement).toBeInTheDocument();
  });

  it("applies the sx prop correctly", () => {
    const { container } = render(
      <Scrollbar sx={{ backgroundColor: "red" }}>
        <div>Content</div>
      </Scrollbar>,
    );
    expect(container.firstChild).toHaveStyle("background-color: red");
  });

  it("renders children correctly", () => {
    render(
      <Scrollbar sx={{ backgroundColor: "red" }}>
        <div>Content</div>
      </Scrollbar>,
    );
    const contentElement = screen.getByText(/Content/i);
    expect(contentElement).toBeInTheDocument();
  });
});
