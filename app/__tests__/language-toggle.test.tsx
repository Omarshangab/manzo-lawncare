import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import { t } from "../translations";

function MockPage() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div>
      <button onClick={toggleLanguage} aria-label="toggle">toggle</button>
      <h1>{t.hero.headline[language]}</h1>
      <p>{t.services.badge[language]}</p>
      <p>{t.contact.cta1[language]}</p>
      <p>{t.footer.quickLinks[language]}</p>
    </div>
  );
}

function renderMockPage() {
  return render(
    <LanguageProvider>
      <MockPage />
    </LanguageProvider>
  );
}

describe("Language toggle integration", () => {
  it("renders English copy by default", () => {
    renderMockPage();
    expect(screen.getByText(t.hero.headline.en)).toBeInTheDocument();
    expect(screen.getByText(t.services.badge.en)).toBeInTheDocument();
    expect(screen.getByText(t.contact.cta1.en)).toBeInTheDocument();
  });

  it("renders Spanish copy after toggle", () => {
    renderMockPage();
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByText(t.hero.headline.es)).toBeInTheDocument();
    expect(screen.getByText(t.services.badge.es)).toBeInTheDocument();
    expect(screen.getByText(t.contact.cta1.es)).toBeInTheDocument();
  });

  it("returns to English after two toggles", () => {
    renderMockPage();
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByText(t.hero.headline.en)).toBeInTheDocument();
  });

  it("covers multiple sections switching to Spanish", () => {
    renderMockPage();
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByText(t.hero.headline.es)).toBeInTheDocument();
    expect(screen.getByText(t.footer.quickLinks.es)).toBeInTheDocument();
  });
});
