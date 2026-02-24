import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "./Header";

vi.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));

function renderHeader() {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}

describe("Header language toggle", () => {
  it("renders EN as active and ES as inactive by default", () => {
    renderHeader();
    const enSpan = screen.getAllByText("EN")[0];
    const esSpan = screen.getAllByText("ES")[0];
    expect(enSpan).toHaveClass("text-white");
    expect(esSpan).not.toHaveClass("text-white");
  });

  it("renders Spanish nav links after toggle", () => {
    renderHeader();
    const toggleBtn = screen.getAllByRole("button", { name: /Toggle language/i })[0];
    fireEvent.click(toggleBtn);
    expect(screen.getAllByText("Servicios").length).toBeGreaterThan(0);
  });

  it("renders ES as active after toggle", () => {
    renderHeader();
    const toggleBtn = screen.getAllByRole("button", { name: /Toggle language/i })[0];
    fireEvent.click(toggleBtn);
    const esSpans = screen.getAllByText("ES");
    expect(esSpans[0]).toHaveClass("text-white");
  });
});
