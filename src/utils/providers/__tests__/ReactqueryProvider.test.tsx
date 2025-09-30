import { render } from "@testing-library/react";
import React from "react";

import { ReactqueryProvider } from "../ReactqueryProvider";

describe("Testing ReactqueryProvider", () => {
  it("should render the children", () => {
    const ChildComponent = () => <div data-testid="child-component">child</div>;
    const { getByTestId } = render(
      <ReactqueryProvider>
        <ChildComponent />
      </ReactqueryProvider>,
    );
    expect(getByTestId("child-component")).toBeInTheDocument();
  });
});
