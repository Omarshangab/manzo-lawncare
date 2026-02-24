# Language Toggle Feature Design
**Date:** 2026-02-24
**Status:** Approved

---

## Overview

Add an English/Spanish language toggle to the Manzo's Lawn Care website. The toggle lives in the header navbar, translates all page copy using pre-written static translations, and animates the switch with a smooth fade.

---

## Context

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion (already installed)
- **Client:** Manzo's Lawn Care — Hispanic-owned business serving Columbia, SC
- **Current state:** All copy is hardcoded English across `page.tsx` and component files
- **No i18n library** currently in the project

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Translation approach | Pre-written static `translations.ts` | Best quality, full control, no API cost, appropriate for fixed marketing copy |
| Scope | Full page — all copy | Nav, hero, services, how-it-works, testimonials, CTAs, footer |
| Architecture | React Context (`LanguageContext`) | Avoids prop drilling, no external deps, fits existing `"use client"` pattern |
| Animation | Framer Motion fade, `mode="wait"`, 0.3s | Smooth without fighting existing scroll animations |
| Toggle placement | Next to CTA button — desktop nav + mobile menu | Most natural secondary action position in a navbar |
| Toggle style | `EN \| ES` pill with active language highlighted | Clean, universally understood, avoids flag politics |

---

## Architecture

### New Files

**`app/context/LanguageContext.tsx`**
- `"use client"` component
- Exports `LanguageProvider` — holds `language: "en" | "es"` state and `toggleLanguage` function
- Exports `useLanguage()` hook for any component to consume

**`app/translations.ts`**
- Single exported `t` object with all copy keyed by section and string ID
- Each entry has `en` and `es` values: `t.hero.headline.en` / `t.hero.headline.es`
- Structure:
  ```ts
  export const t = {
    nav: {
      services:     { en: "Services",           es: "Servicios" },
      ourWork:      { en: "Our Work",            es: "Nuestro Trabajo" },
      howItWorks:   { en: "How It Works",        es: "Cómo Funciona" },
      testimonials: { en: "Testimonials",        es: "Testimonios" },
      contact:      { en: "Contact",             es: "Contacto" },
    },
    hero: {
      headline:    { en: "...", es: "..." },
      subheadline: { en: "...", es: "..." },
      cta:         { en: "Get a Free Quote",     es: "Obtén una Cotización Gratis" },
    },
    services: { ... },
    howItWorks: { ... },
    testimonials: { ... },
    // etc.
  }
  ```

### Modified Files

| File | Change |
|---|---|
| `app/layout.tsx` | Wrap `{children}` in `<LanguageProvider>` |
| `app/components/Header.tsx` | Add `EN \| ES` toggle pill; nav labels from translations |
| `app/page.tsx` | Replace all hardcoded strings with `t.<section>.<key>[language]`; wrap content in fade `AnimatePresence` |
| `app/components/TestimonialsSection.tsx` | Section heading and any UI labels from translations |
| `app/components/BeforeAfterSlider.tsx` | Any labels/captions from translations |
| `app/components/MadeByOrganiq.tsx` | Any tagline text from translations |

---

## Animation

Framer Motion `AnimatePresence` with `mode="wait"` wraps the main page content in `page.tsx`. The `key={language}` prop triggers exit/enter on language switch.

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={language}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {/* all page content */}
  </motion.div>
</AnimatePresence>
```

- Old language fades out fully before new language fades in (no overlap)
- Duration: 0.3s — snappy but not jarring
- Header excluded from wrapper — toggle button won't flicker during transition

---

## Toggle UI

```tsx
<button
  onClick={toggleLanguage}
  className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white/80 transition-all hover:border-white/60 hover:text-white"
>
  <span className={language === "en" ? "text-white" : "text-white/40"}>EN</span>
  <span className="text-white/30">|</span>
  <span className={language === "es" ? "text-white" : "text-white/40"}>ES</span>
</button>
```

- Active language: full white (`text-white`)
- Inactive language: dimmed (`text-white/40`)
- Pill border brightens on hover
- No background fill — lightweight against dark header
- Appears in both desktop nav and mobile menu overlay

---

## Testing

- **LanguageContext:** Unit test `toggleLanguage` flips `"en"` → `"es"` → `"en"`
- **Toggle button:** Correct active/inactive states per language; fires `toggleLanguage` on click
- **Translations:** Every key in `t` has both `en` and `es` values (no missing translations)
- **Page render:** Text content reflects Spanish strings when `language === "es"`
