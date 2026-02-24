# Language Toggle (EN/ES) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an animated English/Spanish toggle pill to the header that fades the entire page copy between languages using pre-written static translations.

**Architecture:** A `LanguageContext` wraps the app in `layout.tsx`, holding `language: "en" | "es"` state and a `toggleLanguage` function. All components consume the context via `useLanguage()`. `translations.ts` holds every string keyed by section and language. Framer Motion `AnimatePresence mode="wait"` drives the 0.3s fade in `page.tsx`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion v11

---

## Task 1: Install Vitest + React Testing Library

> No test framework exists. This is a prerequisite for all TDD tasks.

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json`

**Step 1: Install dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Step 2: Create vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
```

**Step 3: Create setup file**

Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom";
```

**Step 4: Add test scripts to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run"
```

**Step 5: Verify setup with a smoke test**

Create `app/__tests__/smoke.test.ts`:
```ts
describe("vitest setup", () => {
  it("works", () => {
    expect(true).toBe(true);
  });
});
```

Run: `npm run test:run`
Expected: `1 passed`

**Step 6: Commit**
```bash
git add vitest.config.ts vitest.setup.ts package.json package-lock.json app/__tests__/smoke.test.ts
git commit -m "feat: add Vitest + React Testing Library"
```

---

## Task 2: Create LanguageContext (TDD)

**Files:**
- Create: `app/context/LanguageContext.tsx`
- Create: `app/context/LanguageContext.test.tsx`

**Step 1: Write the failing tests**

Create `app/context/LanguageContext.test.tsx`:
```tsx
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
```

**Step 2: Run tests to confirm they fail**

```bash
npm run test:run -- app/context/LanguageContext.test.tsx
```
Expected: FAIL — `Cannot find module './LanguageContext'`

**Step 3: Implement LanguageContext**

Create `app/context/LanguageContext.tsx`:
```tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "es" : "en"));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

**Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- app/context/LanguageContext.test.tsx
```
Expected: `3 passed`

**Step 5: Commit**
```bash
git add app/context/LanguageContext.tsx app/context/LanguageContext.test.tsx
git commit -m "feat: add LanguageContext with toggle"
```

---

## Task 3: Create translations.ts (TDD)

**Files:**
- Create: `app/translations.ts`
- Create: `app/translations.test.ts`

**Step 1: Write the failing completeness test**

Create `app/translations.test.ts`:
```ts
import { t } from "./translations";

type Bilingual = { en: string; es: string };

function collectBilinguals(obj: unknown, path = ""): string[] {
  const missing: string[] = [];
  if (typeof obj !== "object" || obj === null) return missing;
  const record = obj as Record<string, unknown>;
  if ("en" in record && "es" in record) {
    if (!record.en) missing.push(`${path}.en is empty`);
    if (!record.es) missing.push(`${path}.es is empty`);
    return missing;
  }
  for (const key of Object.keys(record)) {
    missing.push(...collectBilinguals(record[key], path ? `${path}.${key}` : key));
  }
  return missing;
}

describe("translations", () => {
  it("has no missing or empty en/es values", () => {
    const missing = collectBilinguals(t);
    expect(missing).toEqual([]);
  });
});
```

**Step 2: Run to confirm it fails**

```bash
npm run test:run -- app/translations.test.ts
```
Expected: FAIL — `Cannot find module './translations'`

**Step 3: Create translations.ts**

Create `app/translations.ts`:
```ts
export const t = {
  nav: {
    services:     { en: "Services",      es: "Servicios" },
    ourWork:      { en: "Our Work",      es: "Nuestro Trabajo" },
    howItWorks:   { en: "How It Works",  es: "Cómo Funciona" },
    testimonials: { en: "Testimonials",  es: "Testimonios" },
    contact:      { en: "Contact",       es: "Contacto" },
    cta:          { en: "(803) 743-8679", es: "(803) 743-8679" },
  },
  hero: {
    headline:      { en: "Your Dream Yard, Without the Weekend Work",          es: "El Patio que Siempre Soñaste, Sin Sacrificar tu Fin de Semana" },
    subheadline:   { en: "Columbia's trusted lawn care team. We handle the mowing, landscaping, and hardscaping, so your weekends stay free.", es: "El equipo de cuidado de jardines de confianza en Columbia. Nos encargamos del corte, paisajismo y construcción para que tus fines de semana sean tuyos." },
    cta1:          { en: "Get Free Estimate",   es: "Obtén un Presupuesto Gratis" },
    cta2:          { en: "(803) 743-8679",       es: "(803) 743-8679" },
    statsYears:    { en: "Years Experience",     es: "Años de Experiencia" },
    statsClients:  { en: "Satisfied Clients",    es: "Clientes Satisfechos" },
    statsReviews:  { en: "18 Five-Star Reviews", es: "18 Reseñas de Cinco Estrellas" },
  },
  statsBar: {
    yearsLabel:     { en: "Years of Experience",        es: "Años de Experiencia" },
    clientsLabel:   { en: "Satisfied Clients",          es: "Clientes Satisfechos" },
    reviewsLabel:   { en: "Five-Star Reviews",          es: "Reseñas de Cinco Estrellas" },
    estimatesLabel: { en: "Estimates & Consultations",  es: "Presupuestos y Consultas" },
    freeValue:      { en: "Free",                       es: "Gratis" },
  },
  services: {
    badge:    { en: "Services",                                                es: "Servicios" },
    heading:  { en: "What we do",                                              es: "Lo que hacemos" },
    subtitle: { en: "From weekly mowing to custom fire pits, we handle it all", es: "Desde corte semanal hasta fogones personalizados, lo hacemos todo" },
    card1: {
      title:       { en: "Lawn Care & Mowing",                                                                                          es: "Corte y Cuidado del Césped" },
      description: { en: "Come home to a freshly cut lawn every week. We handle the mowing, edging, and cleanup so your yard always looks its best.", es: "Llega a casa y encuentra tu césped recién cortado cada semana. Nos encargamos del corte, bordeado y limpieza para que tu jardín siempre luzca impecable." },
      perfectFor:  { en: "Residential yards, HOA properties", es: "Residencias, propiedades de HOA" },
      frequency:   { en: "Weekly or bi-weekly",               es: "Semanal o cada dos semanas" },
      includes:    { en: "Mowing, edging, blowing",           es: "Corte, bordeado, soplado" },
    },
    card2: {
      title:       { en: "Landscaping Services",                                                                                                          es: "Servicios de Paisajismo" },
      description: { en: "Give your property the curb appeal it deserves. From flower beds to tree rings, we design and maintain landscapes that stand out.", es: "Dale a tu propiedad el atractivo que merece. Desde arriates hasta anillos para árboles, diseñamos y mantenemos paisajes que destacan." },
      perfectFor:  { en: "Property upgrades, curb appeal", es: "Mejoras de propiedad, atractivo visual" },
      includes:    { en: "Beds, tree rings, planting",     es: "Arriates, anillos, siembra" },
      duration:    { en: "1–3 days",                       es: "1–3 días" },
    },
    card3: {
      title:       { en: "Hedge & Shrub Trimming",                                                                                             es: "Poda de Setos y Arbustos" },
      description: { en: "Overgrown hedges drag down your whole yard. We shape and trim them back so your property looks clean and cared for.", es: "Los setos descuidados arruinan tu jardín. Los recortamos y les damos forma para que tu propiedad luzca cuidada y ordenada." },
      perfectFor:  { en: "Overgrown yards, HOA compliance", es: "Jardines descuidados, cumplimiento de HOA" },
      frequency:   { en: "Monthly or seasonal",             es: "Mensual o estacional" },
      includes:    { en: "Shaping, cleanup, hauling",        es: "Forma, limpieza, retiro de ramas" },
    },
    card4: {
      title:       { en: "Mulch Installation & Delivery",                                                                                                      es: "Instalación y Entrega de Mantillo" },
      description: { en: "Fresh mulch makes everything look finished. We deliver and spread it right, so your beds stay neat and your plants stay healthy.", es: "El mantillo fresco le da un toque final a todo. Lo entregamos y extendemos correctamente para que tus arriates luzcan impecables y tus plantas estén sanas." },
      perfectFor:  { en: "Garden beds, tree rings",                 es: "Arriates, anillos para árboles" },
      includes:    { en: "Delivery & professional spreading",       es: "Entrega y distribución profesional" },
      duration:    { en: "1–2 days",                                es: "1–2 días" },
    },
    card5: {
      title:       { en: "Paver Patio & Walkway",                                                                               es: "Patios y Caminos de Adoquín" },
      description: { en: "Create the outdoor space you've been wanting. We build custom paver patios and walkways made to last.", es: "Crea el espacio exterior que siempre quisiste. Construimos patios y caminos de adoquín personalizados hechos para durar." },
      perfectFor:  { en: "Outdoor living, entertaining", es: "Vida al aire libre, entretenimiento" },
      duration:    { en: "3–7 days",                     es: "3–7 días" },
      addons:      { en: "Fire pit, retaining walls",    es: "Fogón, muros de contención" },
    },
    card6: {
      title:       { en: "Fire Pit Installation",                                                                                                                    es: "Instalación de Fogón" },
      description: { en: "Cool evenings, good company, your own backyard fire pit. We build them from scratch, ready for your first night out.", es: "Noches frescas, buena compañía y tu propio fogón en el patio. Lo construimos desde cero, listo para tu primera noche al aire libre." },
      perfectFor:  { en: "Backyard gatherings, ambiance", es: "Reuniones en el patio, ambiente" },
      duration:    { en: "1–3 days",                      es: "1–3 días" },
      addons:      { en: "Paver patio, seating walls",    es: "Patio de adoquín, muros de asiento" },
    },
    labelPerfectFor:  { en: "Perfect for",         es: "Ideal para" },
    labelFrequency:   { en: "Frequency",            es: "Frecuencia" },
    labelIncludes:    { en: "Includes",             es: "Incluye" },
    labelDuration:    { en: "Estimated Duration",   es: "Duración Estimada" },
    labelAddons:      { en: "Popular add-ons",      es: "Complementos populares" },
  },
  ourWork: {
    badge:    { en: "The Proof",                          es: "La Prueba" },
    heading:  { en: "What could we do with your yard?",  es: "¿Qué podríamos hacer con tu patio?" },
    subtitle: { en: "Drag to see the transformation",    es: "Arrastra para ver la transformación" },
    cta:      { en: "Get Your Free Estimate",            es: "Obtén tu Presupuesto Gratis" },
    before:   { en: "Before",                            es: "Antes" },
    after:    { en: "After",                             es: "Después" },
  },
  howItWorks: {
    badge:      { en: "How It Works",                                                      es: "Cómo Funciona" },
    heading:    { en: "Simple as 1, 2, 3",                                                 es: "Tan Simple como 1, 2, 3" },
    subtitle:   { en: "From first call to finished yard, here's how we work with you",     es: "Desde la primera llamada hasta el patio terminado, así es como trabajamos contigo" },
    step1Title: { en: "Call for a Free Estimate",                                          es: "Llama para un Presupuesto Gratis" },
    step1Desc:  { en: "Give us a call or reach out on Facebook. We'll schedule a time to visit your property at no cost.", es: "Llámanos o escríbenos por Facebook. Agendaremos una visita a tu propiedad sin ningún costo." },
    step2Title: { en: "We Discuss Your Vision",                                            es: "Hablamos sobre tu Visión" },
    step2Desc:  { en: "Carlos walks your property with you, listens to what you want, and puts together a clear plan with honest pricing.", es: "Carlos recorre tu propiedad contigo, escucha lo que deseas y elabora un plan claro con precios honestos." },
    step3Title: { en: "We Transform Your Yard",                                            es: "Transformamos tu Patio" },
    step3Desc:  { en: "We show up on time, do the work right, and don't leave until you're happy with the results.", es: "Llegamos a tiempo, hacemos el trabajo bien y no nos vamos hasta que estés satisfecho con los resultados." },
  },
  testimonials: {
    heading:    { en: "Don't Take Our Word for It", es: "No Solo lo Decimos Nosotros" },
    label:      { en: "Testimonials",               es: "Testimonios" },
    ctaText:    { en: "View Reviews",               es: "Ver Reseñas" },
    checkMore:  { en: "Check More Reviews:",        es: "Ver Más Reseñas:" },
    platformSubtitle: { en: "18 Five Star Reviews", es: "18 Reseñas de Cinco Estrellas" },
    review1: { en: "Carlos and his team do great work. I'd highly recommend hiring them for all your landscaping needs.", es: "Carlos y su equipo hacen un excelente trabajo. Los recomiendo ampliamente para todas sus necesidades de paisajismo." },
    review2: { en: "Very happy with their work! Quick to provide service. Even invited me to inspect their initial work before they left to ensure I was satisfied.", es: "¡Muy satisfecha con su trabajo! Servicio rápido. Incluso me invitaron a inspeccionar el trabajo inicial antes de irse para asegurarse de que estaba satisfecha." },
    review3: { en: "Carlos is a great person and a great lawn care professional. He has 15 years experience and I found him to be extremely patient and professional. I recommend Manzo to anyone needing lawn care. They ARE good people.", es: "Carlos es una gran persona y un excelente profesional del cuidado de jardines. Tiene 15 años de experiencia y lo encontré extremadamente paciente y profesional. Recomiendo Manzo a cualquiera que necesite cuidado de jardines. Son buenas personas." },
    review4: { en: "10/10. Excellent service and quality work. Highly recommend!", es: "10/10. Excelente servicio y trabajo de calidad. ¡Muy recomendado!" },
    review5: { en: "Great service and attention to detail. My yard has never looked better!", es: "Excelente servicio y atención al detalle. ¡Mi jardín nunca se había visto tan bien!" },
    review6: { en: "Been using their services for years. Always reliable and professional. The best lawn care service in Columbia.", es: "Llevo años usando sus servicios. Siempre confiables y profesionales. El mejor servicio de cuidado de jardines en Columbia." },
    review7: { en: "Top notch work! They transformed my overgrown yard into something beautiful. Couldn't be happier.", es: "¡Trabajo de primera! Transformaron mi jardín descuidado en algo hermoso. No podría estar más contenta." },
  },
  contact: {
    heading:     { en: "Your yard is one call away from looking its best",                                                                                       es: "Tu patio está a solo una llamada de verse increíble" },
    description: { en: "Every estimate is free, with no pressure and no contracts. Carlos will walk your property, hear what you want, and give you an honest quote.", es: "Cada presupuesto es gratis, sin presión y sin contratos. Carlos recorrerá tu propiedad, escuchará lo que quieres y te dará un precio honesto." },
    cta1: { en: "Call (803) 743-8679",   es: "Llama al (803) 743-8679" },
    cta2: { en: "Message on Facebook",   es: "Escríbenos en Facebook" },
  },
  footer: {
    description:    { en: "Lawn care and landscaping in Columbia, SC. 8+ years of experience. Licensed & insured.", es: "Cuidado de jardines y paisajismo en Columbia, SC. Más de 8 años de experiencia. Con licencia y asegurados." },
    quickLinks:     { en: "Quick Links",                        es: "Enlaces Rápidos" },
    contactHeading: { en: "Contact",                            es: "Contacto" },
    location:       { en: "Columbia, SC & surrounding areas",   es: "Columbia, SC y áreas aledañas" },
    rights:         { en: "All rights reserved.",               es: "Todos los derechos reservados." },
  },
} as const;

export type Language = "en" | "es";
```

**Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- app/translations.test.ts
```
Expected: `1 passed`

**Step 5: Commit**
```bash
git add app/translations.ts app/translations.test.ts
git commit -m "feat: add translations file with EN/ES copy"
```

---

## Task 4: Wire LanguageProvider into layout.tsx

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update layout.tsx**

Current `app/layout.tsx`:
```tsx
import MadeByOrganiq from "./components/MadeByOrganiq";
// ...
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body ...>
        {children}
        <MadeByOrganiq />
      </body>
    </html>
  );
}
```

New `app/layout.tsx` (add LanguageProvider import and wrapper):
```tsx
import type { Metadata, Viewport } from "next";
import { Raleway, Merriweather } from "next/font/google";
import "./globals.css";
import MadeByOrganiq from "./components/MadeByOrganiq";
import { LanguageProvider } from "./context/LanguageContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manzo's Lawn Care",
  description: "Professional lawn care services",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#3C872B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${raleway.variable} ${merriweather.variable} antialiased`}>
        <LanguageProvider>
          {children}
          <MadeByOrganiq />
        </LanguageProvider>
      </body>
    </html>
  );
}
```

**Step 2: Verify dev server still starts**

```bash
npm run dev
```
Expected: No errors, site loads at localhost:3000

**Step 3: Commit**
```bash
git add app/layout.tsx
git commit -m "feat: wrap app in LanguageProvider"
```

---

## Task 5: Update Header.tsx — EN|ES Toggle Pill + Translated Nav Links (TDD)

**Files:**
- Modify: `app/components/Header.tsx`
- Create: `app/components/Header.test.tsx`

**Step 1: Write failing tests**

Create `app/components/Header.test.tsx`:
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "./Header";

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
    const toggleBtn = screen.getAllByRole("button", { name: /EN.*ES/i })[0];
    fireEvent.click(toggleBtn);
    expect(screen.getAllByText("Servicios").length).toBeGreaterThan(0);
  });

  it("renders ES as active after toggle", () => {
    renderHeader();
    const toggleBtn = screen.getAllByRole("button", { name: /EN.*ES/i })[0];
    fireEvent.click(toggleBtn);
    const esSpans = screen.getAllByText("ES");
    expect(esSpans[0]).toHaveClass("text-white");
  });
});
```

**Step 2: Run tests to confirm they fail**

```bash
npm run test:run -- app/components/Header.test.tsx
```
Expected: FAIL

**Step 3: Update Header.tsx**

Replace the full contents of `app/components/Header.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations";

const navLinks = [
  { key: "services" as const,     href: "#services" },
  { key: "ourWork" as const,      href: "#our-work" },
  { key: "howItWorks" as const,   href: "#how-it-works" },
  { key: "testimonials" as const, href: "#testimonials" },
  { key: "contact" as const,      href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const TogglePill = () => (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language EN ES"
      className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold transition-all hover:border-white/60"
      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
    >
      <span className={language === "en" ? "text-white" : "text-white/40"}>EN</span>
      <span className="text-white/30">|</span>
      <span className={language === "es" ? "text-white" : "text-white/40"}>ES</span>
    </button>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1C1C1C]/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1360px] items-center justify-between px-8 py-4 md:px-16 md:py-5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/icon.svg"
              alt="Manzo's Lawn Care Logo"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
            <span
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Manzo&apos;s Lawn Care
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {t.nav[link.key][language]}
              </a>
            ))}
            <TogglePill />
            <a
              href="tel:8037438679"
              className="cta-button rounded-full bg-green-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-dark"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              {t.nav.cta[language]}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex w-6 flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-full rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 flex flex-col bg-[#1C1C1C] md:hidden"
          >
            <div className="flex justify-end px-8 py-4 md:px-16 md:py-5">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.05 + 0.1 }}
                  className="text-2xl font-semibold text-white transition-colors hover:text-green-primary"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {t.nav[link.key][language]}
                </motion.a>
              ))}
              <motion.a
                href="tel:8037438679"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
                className="mt-4 rounded-full bg-green-primary px-8 py-3.5 text-lg font-semibold text-white transition-all hover:bg-green-dark"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {language === "en" ? "Call " : "Llama al "}{t.nav.cta[language]}
              </motion.a>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <TogglePill />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 flex items-center gap-2 text-sm text-white/50"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t.footer.location[language]}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- app/components/Header.test.tsx
```
Expected: `3 passed`

**Step 5: Commit**
```bash
git add app/components/Header.tsx app/components/Header.test.tsx
git commit -m "feat: add EN/ES toggle pill to Header + translated nav links"
```

---

## Task 6: Add AnimatePresence Fade Wrapper to page.tsx

> This task adds just the animation wrapper. String replacements come in Task 7.

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add imports and wrap page content**

At the top of `app/page.tsx`, update imports:
```tsx
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";  // add AnimatePresence
import Header from "./components/Header";
import PhotoMarquee from "./components/PhotoMarquee";
import TestimonialsSection from "./components/TestimonialsSection";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import { useLanguage } from "./context/LanguageContext";             // add this
import { t } from "./translations";                                   // add this
```

In the `Home` component, add `useLanguage()` call and wrap content:
```tsx
export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* === ALL EXISTING SECTIONS GO HERE (hero through footer) === */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

Move everything between `<Header />` and the closing `</div>` inside the `<motion.div>`.

**Step 2: Verify dev server — fade animation works**

```bash
npm run dev
```
Open localhost:3000. The page should load normally. (No visual change yet — the toggle exists in the header but strings still need replacing.)

**Step 3: Commit**
```bash
git add app/page.tsx
git commit -m "feat: add AnimatePresence fade wrapper to page.tsx"
```

---

## Task 7: Replace All Hardcoded Strings in page.tsx with Translations

> This is the largest task. Work section by section. After each batch of replacements, verify in the browser by toggling the language.

**Files:**
- Modify: `app/page.tsx`

**Pattern for every replacement:** `"Hardcoded string"` → `{t.section.key[language]}`

### Hero Section replacements

| Old hardcoded string | New expression |
|---|---|
| `"Your Dream Yard, Without the Weekend Work"` | `{t.hero.headline[language]}` |
| `"Columbia's trusted lawn care team..."` | `{t.hero.subheadline[language]}` |
| `"Get Free Estimate"` | `{t.hero.cta1[language]}` |
| `"(803) 743-8679"` (hero CTA button) | `{t.hero.cta2[language]}` |
| `"Years Experience"` | `{t.hero.statsYears[language]}` |
| `"Satisfied Clients"` | `{t.hero.statsClients[language]}` |
| `"18 Five-Star Reviews"` | `{t.hero.statsReviews[language]}` |

### Stats Bar replacements

| Old hardcoded string | New expression |
|---|---|
| `"Years of Experience"` | `{t.statsBar.yearsLabel[language]}` |
| `"Satisfied Clients"` (stats bar) | `{t.statsBar.clientsLabel[language]}` |
| `"Five-Star Reviews"` | `{t.statsBar.reviewsLabel[language]}` |
| `"Free"` (the stat value) | `{t.statsBar.freeValue[language]}` |
| `"Estimates & Consultations"` | `{t.statsBar.estimatesLabel[language]}` |

### Services Section replacements

| Old hardcoded string | New expression |
|---|---|
| `"Services"` (badge) | `{t.services.badge[language]}` |
| `"What we do"` | `{t.services.heading[language]}` |
| `"From weekly mowing to custom fire pits..."` | `{t.services.subtitle[language]}` |
| `"Lawn Care & Mowing"` | `{t.services.card1.title[language]}` |
| `"Come home to a freshly cut lawn..."` | `{t.services.card1.description[language]}` |
| `"Perfect for"` | `{t.services.labelPerfectFor[language]}` |
| `"Residential yards, HOA properties"` | `{t.services.card1.perfectFor[language]}` |
| `"Frequency"` | `{t.services.labelFrequency[language]}` |
| `"Weekly or bi-weekly"` | `{t.services.card1.frequency[language]}` |
| `"Includes"` | `{t.services.labelIncludes[language]}` |
| `"Mowing, edging, blowing"` | `{t.services.card1.includes[language]}` |
| _(repeat pattern for cards 2–6 using card2–card6 keys)_ | |
| `"Estimated Duration"` | `{t.services.labelDuration[language]}` |
| `"Popular add-ons"` | `{t.services.labelAddons[language]}` |

### Our Work (Before/After) Section replacements

| Old hardcoded string | New expression |
|---|---|
| `"The Proof"` | `{t.ourWork.badge[language]}` |
| `"What could we do with your yard?"` | `{t.ourWork.heading[language]}` |
| `"Drag to see the transformation"` | `{t.ourWork.subtitle[language]}` |
| `"Get Your Free Estimate"` | `{t.ourWork.cta[language]}` |

For BeforeAfterSlider — pass translated labels as props (see Task 9):
```tsx
<BeforeAfterSlider
  beforeSrc="..."
  afterSrc="..."
  beforeLabel={t.ourWork.before[language]}
  afterLabel={t.ourWork.after[language]}
/>
```

### How It Works Section replacements

| Old hardcoded string | New expression |
|---|---|
| `"How It Works"` (badge) | `{t.howItWorks.badge[language]}` |
| `"Simple as 1, 2, 3"` | `{t.howItWorks.heading[language]}` |
| `"From first call to finished yard..."` | `{t.howItWorks.subtitle[language]}` |
| `"Call for a Free Estimate"` | `{t.howItWorks.step1Title[language]}` |
| `"Give us a call or reach out on Facebook..."` | `{t.howItWorks.step1Desc[language]}` |
| `"We Discuss Your Vision"` | `{t.howItWorks.step2Title[language]}` |
| `"Carlos walks your property with you..."` | `{t.howItWorks.step2Desc[language]}` |
| `"We Transform Your Yard"` | `{t.howItWorks.step3Title[language]}` |
| `"We show up on time..."` | `{t.howItWorks.step3Desc[language]}` |

### Testimonials Section replacements

Pass translated values as props to `<TestimonialsSection>`:
```tsx
<TestimonialsSection
  heading={t.testimonials.heading[language]}
  label={t.testimonials.label[language]}
  ctaText={t.testimonials.ctaText[language]}
  checkMoreText={t.testimonials.checkMore[language]}
  backgroundImage="/testimonials-bg.jpg"
  reviewPlatforms={[
    {
      name: "Facebook Reviews",
      subtitle: t.testimonials.platformSubtitle[language],
      href: "https://www.facebook.com/...",
      icon: <FacebookIcon />,
    },
  ]}
  testimonials={[
    { id: "1", name: "Paige Cooper",    location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review1[language], source: "Facebook Review" },
    { id: "2", name: "Rebecca Huggins", location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review2[language], source: "Facebook Review" },
    { id: "3", name: "David Dowdy",     location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review3[language], source: "Facebook Review" },
    { id: "4", name: "Will Hull",       location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review4[language], source: "Facebook Review" },
    { id: "5", name: "Dani Powell",     location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review5[language], source: "Facebook Review" },
    { id: "6", name: "Zach Robertson",  location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review6[language], source: "Facebook Review" },
    { id: "7", name: "Diane Lyons",     location: "Columbia, SC", avatarSrc: "", review: t.testimonials.review7[language], source: "Facebook Review" },
  ]}
/>
```

### Contact Section replacements

| Old hardcoded string | New expression |
|---|---|
| `"Your yard is one call away from looking its best"` | `{t.contact.heading[language]}` |
| `"Every estimate is free..."` | `{t.contact.description[language]}` |
| `"Call (803) 743-8679"` | `{t.contact.cta1[language]}` |
| `"Message on Facebook"` | `{t.contact.cta2[language]}` |

### Footer Section replacements

| Old hardcoded string | New expression |
|---|---|
| `"Lawn care and landscaping in Columbia, SC..."` | `{t.footer.description[language]}` |
| `"Quick Links"` | `{t.footer.quickLinks[language]}` |
| Footer nav links (Services, Our Work, etc.) | `{t.nav.services[language]}`, `{t.nav.ourWork[language]}`, etc. |
| `"Contact"` (footer heading) | `{t.footer.contactHeading[language]}` |
| `"Columbia, SC & surrounding areas"` | `{t.footer.location[language]}` |
| `"All rights reserved."` | `{t.footer.rights[language]}` |

**Step: After each section, verify in browser**

```bash
npm run dev
```
Toggle EN↔ES after each batch. Every section should switch cleanly.

**Step: Commit**
```bash
git add app/page.tsx
git commit -m "feat: replace all hardcoded strings in page.tsx with translations"
```

---

## Task 8: Update TestimonialsSection.tsx — Add checkMoreText Prop

**Files:**
- Modify: `app/components/TestimonialsSection.tsx`

**Step 1: Add prop to interface**

In `TestimonialsSectionProps`, add:
```tsx
checkMoreText?: string;
```

**Step 2: Add to destructured props**

```tsx
export default function TestimonialsSection({
  testimonials,
  heading,
  label = "Testimonials",
  ctaText = "View Reviews",
  ctaHref = "/reviews",
  backgroundImage,
  reviewPlatforms,
  checkMoreText = "Check More Reviews:",  // add this
}: TestimonialsSectionProps) {
```

**Step 3: Replace hardcoded string**

Find line:
```tsx
<p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
  Check More Reviews:
</p>
```

Replace with:
```tsx
<p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
  {checkMoreText}
</p>
```

**Step 4: Verify in browser**

Toggle to Spanish — "Check More Reviews:" should become "Ver Más Reseñas:"

**Step 5: Commit**
```bash
git add app/components/TestimonialsSection.tsx
git commit -m "feat: add checkMoreText prop to TestimonialsSection"
```

---

## Task 9: Update BeforeAfterSlider.tsx — Add beforeLabel/afterLabel Props

**Files:**
- Modify: `app/components/BeforeAfterSlider.tsx`

**Step 1: Add props to interface**

In `BeforeAfterSliderProps`, add:
```tsx
beforeLabel?: string;
afterLabel?: string;
```

**Step 2: Add to destructured props**

```tsx
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",   // add this
  afterLabel = "After",     // add this
}: BeforeAfterSliderProps) {
```

**Step 3: Replace hardcoded label strings**

Find:
```tsx
<span className="text-xs font-semibold uppercase tracking-wider text-white">
  Before
</span>
```
Replace with:
```tsx
<span className="text-xs font-semibold uppercase tracking-wider text-white">
  {beforeLabel}
</span>
```

Find:
```tsx
<span className="text-xs font-semibold uppercase tracking-wider text-white">
  After
</span>
```
Replace with:
```tsx
<span className="text-xs font-semibold uppercase tracking-wider text-white">
  {afterLabel}
</span>
```

**Step 4: Verify in browser**

Toggle to Spanish — "Before" / "After" labels on the slider should become "Antes" / "Después"

**Step 5: Commit**
```bash
git add app/components/BeforeAfterSlider.tsx
git commit -m "feat: add beforeLabel/afterLabel props to BeforeAfterSlider"
```

---

## Task 10: Final Integration Test + Full Test Run

**Files:**
- Create: `app/__tests__/language-toggle.test.tsx`

**Step 1: Write integration test**

Create `app/__tests__/language-toggle.test.tsx`:
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "../context/LanguageContext";
import { t } from "../translations";

// Minimal consumer to test toggle behavior end-to-end
function MockPage() {
  const { language, toggleLanguage } = require("../context/LanguageContext").useLanguage();
  return (
    <div>
      <button onClick={toggleLanguage} aria-label="Toggle language EN ES">toggle</button>
      <h1>{t.hero.headline[language as "en" | "es"]}</h1>
      <p>{t.services.badge[language as "en" | "es"]}</p>
      <p>{t.contact.cta1[language as "en" | "es"]}</p>
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
  });

  it("renders Spanish copy after toggle", () => {
    renderMockPage();
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByText(t.hero.headline.es)).toBeInTheDocument();
    expect(screen.getByText(t.services.badge.es)).toBeInTheDocument();
  });

  it("returns to English after two toggles", () => {
    renderMockPage();
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    fireEvent.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByText(t.hero.headline.en)).toBeInTheDocument();
  });
});
```

**Step 2: Run all tests**

```bash
npm run test:run
```
Expected: All tests pass — context, translations completeness, header toggle, integration

**Step 3: Final browser verification checklist**

```bash
npm run dev
```

Check each of the following manually:
- [ ] EN|ES pill visible in desktop header next to CTA button
- [ ] EN|ES pill visible in mobile menu
- [ ] Active language is bright white, inactive is dimmed
- [ ] Clicking toggle fades page out and back in (0.3s)
- [ ] Hero headline, subheadline, and CTAs switch language
- [ ] Stats bar labels switch language ("Free" → "Gratis")
- [ ] All 6 service card titles, descriptions, and metadata labels switch
- [ ] Before/After slider labels switch (Antes/Después)
- [ ] How It Works steps switch
- [ ] Testimonials heading, CTA, "Check More Reviews" switch
- [ ] All 7 review quotes switch
- [ ] Contact section heading, description, CTAs switch
- [ ] Footer description, Quick Links heading, nav links, rights switch
- [ ] `html[lang]` attribute updates (inspect element → check `<html lang="es">`)
- [ ] Header stays visible and doesn't flicker during page fade

**Step 4: Final commit**
```bash
git add app/__tests__/language-toggle.test.tsx
git commit -m "feat: add integration tests for language toggle"
```

---

## Summary of Files Created/Modified

| File | Action |
|---|---|
| `vitest.config.ts` | Created |
| `vitest.setup.ts` | Created |
| `package.json` | Modified — added test scripts + devDependencies |
| `app/context/LanguageContext.tsx` | Created |
| `app/context/LanguageContext.test.tsx` | Created |
| `app/translations.ts` | Created |
| `app/translations.test.ts` | Created |
| `app/layout.tsx` | Modified — added LanguageProvider wrapper |
| `app/components/Header.tsx` | Modified — toggle pill + translated nav |
| `app/components/Header.test.tsx` | Created |
| `app/page.tsx` | Modified — AnimatePresence fade + all string replacements |
| `app/components/TestimonialsSection.tsx` | Modified — checkMoreText prop |
| `app/components/BeforeAfterSlider.tsx` | Modified — beforeLabel/afterLabel props |
| `app/__tests__/language-toggle.test.tsx` | Created |
| `app/__tests__/smoke.test.ts` | Created |
