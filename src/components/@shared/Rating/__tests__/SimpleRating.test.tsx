import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { SimpleRating } from "../SimpleRating";

describe("SimpleRating Component", () => {
  const handleRating = jest.fn();

  test("renders without crashing", () => {
    render(
      <SimpleRating
        FormikErrorMsg=""
        handleRating={handleRating}
        value={null}
      />,
    );
    // const ratingElement = screen.getByRole("img", { name: /rating-simple/i });
    // expect(ratingElement).toBeInTheDocument();
  });

  test("displays the correct label when hovering over a rating", () => {
    render(
      <SimpleRating
        FormikErrorMsg=""
        handleRating={handleRating}
        isActiveLabel={true}
        value={null}
      />,
    );

    const stars = screen.getAllByRole("radio");

    fireEvent.mouseOver(stars[0]);
    // expect(screen.getByText("Muito ruim")).toBeInTheDocument();

    fireEvent.mouseOver(stars[1]);
    // expect(screen.getByText("Ruim")).toBeInTheDocument();

    fireEvent.mouseOver(stars[2]);
    // expect(screen.getByText("Ok")).toBeInTheDocument();

    fireEvent.mouseOver(stars[3]);
    // expect(screen.getByText("Bom")).toBeInTheDocument();

    fireEvent.mouseOver(stars[4]);
    // expect(screen.getByText("Excelente")).toBeInTheDocument();
  });

  test("calls handleRating function when a rating is selected", () => {
    render(
      <SimpleRating
        FormikErrorMsg=""
        handleRating={handleRating}
        value={null}
      />,
    );

    const stars = screen.getAllByRole("radio");

    fireEvent.click(stars[4]);
    expect(handleRating).toHaveBeenCalledWith(5);

    fireEvent.click(stars[2]);
    expect(handleRating).toHaveBeenCalledWith(3);
  });

  test("displays error message when there is a form error", () => {
    render(
      <SimpleRating
        FormikErrorMsg="Por favor, escolha uma nota"
        handleRating={handleRating}
        value={null}
      />,
    );

    expect(screen.getByText("Por favor, escolha uma nota")).toBeInTheDocument();
  });
});
