import { act, fireEvent, render, screen } from "@testing-library/react";

import { SimpleTransferList } from "../SimpleTransferList"; // ajuste o caminho conforme necessário
import React from "react";

describe("SimpleTransferList Component", () => {
  let leftItems: number[];
  let rightItems: number[];
  let checkedItems: number[];
  let setChecked: jest.Mock;
  let setLeft: jest.Mock;
  let setRight: jest.Mock;

  beforeEach(() => {
    leftItems = [0, 1, 2, 3];
    rightItems = [4, 5];
    checkedItems = [];
    setChecked = jest.fn().mockImplementation((newChecked) => {
      checkedItems = newChecked;
    });
    setLeft = jest.fn().mockImplementation((newLeft) => {
      leftItems = newLeft;
    });
    setRight = jest.fn().mockImplementation((newRight) => {
      rightItems = newRight;
    });

    render(
      <SimpleTransferList
        checked={checkedItems}
        left={leftItems}
        right={rightItems}
        setChecked={setChecked}
        setLeft={setLeft}
        setRight={setRight}
      />,
    );
  });

  it("should render left and right lists correctly", () => {
    expect(screen.getByText("List item 1")).toBeInTheDocument();
    expect(screen.getByText("List item 5")).toBeInTheDocument();
  });

  it("should handle item selection", () => {
    const firstItem = screen.getByText("List item 1");
    act(() => {
      fireEvent.click(firstItem);
    });
    expect(setChecked).toHaveBeenCalledWith([0]);
  });

  it("should move all items to the right", () => {
    const moveAllRightButton = screen.getByLabelText("move all right");
    act(() => {
      fireEvent.click(moveAllRightButton);
    });
    expect(setRight).toHaveBeenCalledWith([4, 5, 0, 1, 2, 3]);
    expect(setLeft).toHaveBeenCalledWith([]);
  });

  it("should move all items to the left", () => {
    const moveAllLeftButton = screen.getByLabelText("move all left");
    act(() => {
      fireEvent.click(moveAllLeftButton);
    });
    expect(setLeft).toHaveBeenCalledWith([0, 1, 2, 3, 4, 5]);
    expect(setRight).toHaveBeenCalledWith([]);
  });
});
