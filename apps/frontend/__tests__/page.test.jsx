import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../src/components/input";

describe("Page", () => {
  it("renders a heading", () => {
    const testId = "test-input";
    render(<Input data-testid={testId} />);

    const heading = screen.getByTestId(testId);

    expect(heading).toBeInTheDocument();
  });
});
