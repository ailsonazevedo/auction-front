// SimpleList.test.tsx
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { SimpleList } from "../SimpleList";

const mockListItems = [
  { id: 1, primary: "Item 1", secondary: "Secondary 1" },
  { id: 2, onClick: jest.fn(), primary: "Item 2", secondary: "Secondary 2" },
  { id: 3, primary: "Item 3", secondary: "Secondary 3" },
];

describe("SimpleList", () => {
  it("renders all list items", () => {
    render(<SimpleList listItems={mockListItems} />);

    mockListItems.forEach((item) => {
      expect(screen.getByText(item.primary)).toBeInTheDocument();
      expect(screen.getByText(item.secondary)).toBeInTheDocument();
    });
  });

  it("renders list items with icons", () => {
    const listItemsWithIcons = mockListItems.map((item) => ({
      ...item,
      icon: <span data-testid={`icon-${item.id}`}>Icon</span>,
    }));

    render(<SimpleList listItems={listItemsWithIcons} />);

    listItemsWithIcons.forEach((item) => {
      expect(screen.getByTestId(`icon-${item.id}`)).toBeInTheDocument();
    });
  });

  it("handles item click", () => {
    render(<SimpleList listItems={mockListItems} />);

    const clickableItem = mockListItems[1];
    const clickableElement = screen.getByText(clickableItem.primary);

    fireEvent.click(clickableElement);

    expect(clickableItem.onClick).toHaveBeenCalledTimes(1);
  });
});
