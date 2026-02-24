import { render, screen } from "@testing-library/react";

describe("vitest setup", () => {
  it("renders a React component into jsdom with jest-dom matchers", () => {
    render(<p>hello</p>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
