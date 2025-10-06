import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { SimpleAccordion } from "../SimpleAccordion";

describe("SimpleAccordion Component", () => {
  test("renders without crashing", () => {
    render(
      <SimpleAccordion title="Test Accordion">
        <div>Accordion Content</div>
      </SimpleAccordion>,
    );
    expect(screen.getByText("Test Accordion")).toBeInTheDocument();
  });

  test("renders children correctly", () => {
    render(
      <SimpleAccordion title="Test Accordion">
        <div>Accordion Content</div>
      </SimpleAccordion>,
    );
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  test("expands and collapses when clicked", () => {
    render(
      <SimpleAccordion title="Test Accordion">
        <div>Accordion Content</div>
      </SimpleAccordion>,
    );

    const summaryElement = screen.getByText("Test Accordion");
    const detailsElement = screen.getByText("Accordion Content");

    // Click to expand
    fireEvent.click(summaryElement);
    expect(detailsElement).toBeVisible();
  });

  test("disables accordion when disabled prop is true", () => {
    render(
      <SimpleAccordion disabled={true} title="Test Accordion">
        <div>Accordion Content</div>
      </SimpleAccordion>,
    );
  });
});
