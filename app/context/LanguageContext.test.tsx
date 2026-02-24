import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function TestConsumer() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <button onClick={toggleLanguage}>toggle</button>
    </div>
  );
}

describe("LanguageContext", () => {
  it("defaults to English", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  it("toggles from en to es", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
  });

  it("toggles back from es to en", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText("toggle"));
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });
});
