"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import { useLanguage } from "./context/LanguageContext";
import { t } from "./translations";
import PhotoMarquee from "./components/PhotoMarquee";
import TestimonialsSection from "./components/TestimonialsSection";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

function CountUp({ target, suffix = "" }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen">
      {/* Header/Navbar - Sticky with frosted glass on scroll */}
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/Manzo Hero BG.jpg"
            alt="Lawn care background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover ken-burns"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1360px] flex-col items-start justify-center px-8 pt-32 pb-16 md:flex-row md:items-center md:gap-20 md:px-16 md:pt-40 lg:gap-32">
          {/* Left Side - Content */}
          <div className="mb-12 w-full max-w-[640px] md:mb-0 md:flex-1">
            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {t.hero.headline[language]}
            </motion.h1>

            <motion.p
              className="mb-10 max-w-[500px] text-base leading-relaxed text-white/80 md:text-lg"
              style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            >
              {t.hero.subheadline[language]}
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            >
              <a
                href="#contact"
                className="cta-button inline-flex h-13 items-center gap-2.5 rounded-full bg-green-primary px-7 text-sm font-semibold text-white transition-all hover:bg-green-dark"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {t.hero.cta1[language]}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="tel:8037438679"
                className="cta-button inline-flex h-13 items-center gap-2.5 rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-all hover:bg-white/10"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {t.hero.cta2[language]}
              </a>
            </motion.div>
          </div>

          {/* Right Side - Stats Card */}
          <motion.div
            className="w-full md:w-auto md:shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
          >
            <a
              href="https://www.facebook.com/profile.php?id=100063831811913&sk=reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-white/15 bg-white/[0.07] p-8 backdrop-blur-xl transition-all hover:bg-white/[0.12]"
            >
              {/* Stats Grid */}
              <div className="mb-6 grid grid-cols-2 gap-6">
                <div>
                  <div
                    className="text-4xl font-bold leading-none text-white"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    8+
                  </div>
                  <div
                    className="mt-1 text-xs font-medium text-white/60"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {t.hero.statsYears[language]}
                  </div>
                </div>
                <div>
                  <div
                    className="text-4xl font-bold leading-none text-white"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    330+
                  </div>
                  <div
                    className="mt-1 text-xs font-medium text-white/60"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {t.hero.statsClients[language]}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-5 h-px bg-white/10" />

              {/* Rating Row */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FCCA2F">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span
                  className="text-sm font-medium text-white/70"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {t.hero.statsReviews[language]}
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Photo Marquee Section - Scroll-linked image gallery */}
      <PhotoMarquee
        images={[
          { src: "/583885743_1328256685978713_2655459420314320017_n.jpg", alt: "Lawn care project" },
          { src: "/581810828_1328256535978728_1331481319508351998_n.jpg", alt: "Lawn care project" },
          { src: "/557740636_1289505913187124_6273098613637142558_n.jpg", alt: "Lawn care project" },
          { src: "/557346761_1289505829853799_5272241035925803687_n.jpg", alt: "Lawn care project" },
          { src: "/540895651_1254299423374440_7077910242545649879_n.jpg", alt: "Lawn care project" },
          { src: "/518405774_1238192228318493_2858524767760671889_n.jpg", alt: "Lawn care project" },
          { src: "/492503124_1152343840236666_4536240585132358357_n.jpg", alt: "Lawn care project" },
          { src: "/487549405_1128125985991785_3970230590803549414_n.jpg", alt: "Lawn care project" },
          { src: "/486766382_1127138076090576_6929681550466688351_n.jpg", alt: "Lawn care project" },
          { src: "/385307532_752671176870603_7029622015782133240_n.jpg", alt: "Lawn care project" },
        ]}
        imageSize={250}
        gap={16}
        borderRadius={20}
        perspective={1200}
        slideDistance={400}
      />

      {/* Trust Bar / Stats Strip */}
      <section className="border-y px-8 md:px-16" style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'linear-gradient(135deg, #FAFAF7 0%, #F5F5F0 100%)' }}>
        <div className="mx-auto max-w-[1360px]">
          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
            {[
              { target: 8, suffix: "+", label: t.statsBar.yearsLabel[language] },
              { target: 330, suffix: "+", label: t.statsBar.clientsLabel[language] },
              { target: 18, suffix: "+", label: t.statsBar.reviewsLabel[language] },
              { target: null, display: t.statsBar.freeValue[language], suffix: "", label: t.statsBar.estimatesLabel[language] },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.1 }}
              >
                <div
                  className="text-3xl font-bold text-foreground md:text-4xl"
                  style={{ fontFamily: "var(--font-raleway), sans-serif", color: "var(--green-primary)" }}
                >
                  {stat.target !== null ? (
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  ) : (
                    stat.display
                  )}
                </div>
                <div
                  className="mt-1 text-sm text-foreground-secondary"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="dot-grid relative overflow-hidden py-24 px-8 md:px-16 lg:py-32" style={{ background: '#FAFAF7' }}>
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, var(--green-primary), transparent 70%)', opacity: 0.06 }} />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full" style={{ background: 'radial-gradient(circle, var(--yellow-accent), transparent 70%)', opacity: 0.05 }} />
        <div className="relative mx-auto max-w-[1360px]">
          {/* Centered Header */}
          <motion.div
            className="mb-16 flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center rounded-2xl px-4 py-1.5"
              style={{ backgroundColor: 'var(--green-primary)' }}
            >
              <span
                className="text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
              >
                {t.services.badge[language]}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              {t.services.heading[language]}
            </h2>

            {/* Subtitle */}
            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg"
              style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
            >
              {t.services.subtitle[language]}
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Service Card 1: Lawn Care & Mowing */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="card-hover group overflow-hidden rounded-[20px]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/557740636_1289505913187124_6273098613637142558_n.jpg"
                  alt="Lawn Care & Mowing"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-5 p-6" style={{ backgroundColor: '#EDECE4' }}>
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    {t.services.card1.title[language]}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    {t.services.card1.description[language]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelPerfectFor[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card1.perfectFor[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelFrequency[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card1.frequency[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelIncludes[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card1.includes[language]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 2: Landscaping Services */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
              className="card-hover group overflow-hidden rounded-[20px]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/540895651_1254299423374440_7077910242545649879_n.jpg"
                  alt="Landscaping Services"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-5 p-6" style={{ backgroundColor: '#EDECE4' }}>
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    {t.services.card2.title[language]}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    {t.services.card2.description[language]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelPerfectFor[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card2.perfectFor[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelIncludes[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card2.includes[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelDuration[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card2.duration[language]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 3: Hedge & Shrub Trimming */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
              className="card-hover group overflow-hidden rounded-[20px]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/557346761_1289505829853799_5272241035925803687_n.jpg"
                  alt="Hedge & Shrub Trimming"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-5 p-6" style={{ backgroundColor: '#EDECE4' }}>
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    {t.services.card3.title[language]}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    {t.services.card3.description[language]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelPerfectFor[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card3.perfectFor[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelFrequency[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card3.frequency[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelIncludes[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card3.includes[language]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 4: Mulch Installation & Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
              className="card-hover group overflow-hidden rounded-[20px]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/mulch.jpg"
                  alt="Mulch Installation & Delivery"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-5 p-6" style={{ backgroundColor: '#EDECE4' }}>
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    {t.services.card4.title[language]}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    {t.services.card4.description[language]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelPerfectFor[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card4.perfectFor[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelIncludes[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card4.includes[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelDuration[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card4.duration[language]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 5: Paver Patio & Walkway Installation */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
              className="card-hover group overflow-hidden rounded-[20px]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/487549405_1128125985991785_3970230590803549414_n.jpg"
                  alt="Paver Patio & Walkway Installation"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-5 p-6" style={{ backgroundColor: '#EDECE4' }}>
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    {t.services.card5.title[language]}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    {t.services.card5.description[language]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelPerfectFor[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card5.perfectFor[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelDuration[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card5.duration[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelAddons[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card5.addons[language]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Card 6: Fire Pit Installation */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
              className="card-hover group overflow-hidden rounded-[20px]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/Firepit.jpg"
                  alt="Fire Pit Installation"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-5 p-6" style={{ backgroundColor: '#EDECE4' }}>
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    {t.services.card6.title[language]}
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    {t.services.card6.description[language]}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelPerfectFor[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card6.perfectFor[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelDuration[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card6.duration[language]}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>{t.services.labelAddons[language]}</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>{t.services.card6.addons[language]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Before & After Transformation Section */}
      <section className="relative overflow-hidden px-8 py-24 md:px-16 lg:py-32" style={{ background: 'linear-gradient(180deg, #F3F2EC 0%, #FAF9F6 100%)' }}>
        <div className="relative mx-auto max-w-[900px]">
          <motion.div
            className="mb-12 flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div
              className="inline-flex items-center rounded-2xl px-4 py-1.5"
              style={{ backgroundColor: 'var(--green-primary)' }}
            >
              <span
                className="text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
              >
                {t.ourWork.badge[language]}
              </span>
            </div>
            <h2
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              {t.ourWork.heading[language]}
            </h2>
            <p
              className="mx-auto max-w-md text-base leading-relaxed text-foreground-secondary md:text-lg"
              style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
            >
              {t.ourWork.subtitle[language]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
          >
            <BeforeAfterSlider
              beforeSrc="/Beforev2.jpg"
              afterSrc="/afterv2.jpg"
              beforeAlt="Yard before Manzo's Lawn Care"
              afterAlt="Yard after Manzo's Lawn Care transformation"
              beforeLabel={t.ourWork.before[language]}
              afterLabel={t.ourWork.after[language]}
            />
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="cta-button inline-flex h-13 items-center gap-2.5 rounded-full bg-green-primary px-8 text-sm font-semibold text-white transition-all hover:bg-green-dark"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              {t.ourWork.cta[language]}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative overflow-hidden px-8 py-24 md:px-16 lg:py-32" style={{ background: 'linear-gradient(180deg, #F3F2EC 0%, #FAF9F6 100%)' }}>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, var(--green-primary), transparent 70%)', opacity: 0.04 }} />
        <div className="relative mx-auto max-w-[1360px]">
          {/* Header */}
          <motion.div
            className="mb-16 flex flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div
              className="inline-flex items-center rounded-2xl px-4 py-1.5"
              style={{ backgroundColor: 'var(--green-primary)' }}
            >
              <span
                className="text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
              >
                {t.howItWorks.badge[language]}
              </span>
            </div>
            <h2
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              {t.howItWorks.heading[language]}
            </h2>
            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg"
              style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
            >
              {t.howItWorks.subtitle[language]}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: t.howItWorks.step1Title[language],
                description: t.howItWorks.step1Desc[language],
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: t.howItWorks.step2Title[language],
                description: t.howItWorks.step2Desc[language],
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: t.howItWorks.step3Title[language],
                description: t.howItWorks.step3Desc[language],
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="card-hover relative rounded-[20px] bg-background p-8"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.15 }}
              >
                {/* Step Number */}
                <div
                  className="mb-6 text-6xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-raleway), sans-serif", color: "rgba(60, 135, 43, 0.1)" }}
                >
                  {item.step}
                </div>

                {/* Icon */}
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "rgba(60, 135, 43, 0.08)", color: "var(--green-primary)" }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed text-foreground-secondary"
                  style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Auto-Scrolling Carousel */}
      <TestimonialsSection
        heading={t.testimonials.heading[language]}
        label={t.testimonials.label[language]}
        ctaText={t.testimonials.ctaText[language]}
        checkMoreText={t.testimonials.checkMore[language]}
        ctaHref="https://www.facebook.com/profile.php?id=100063831811913&sk=reviews"
        backgroundImage="/581810828_1328256535978728_1331481319508351998_n.jpg"
        testimonials={[
          {
            id: "1",
            name: "Paige Cooper",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review1[language],
            source: "Facebook Review",
          },
          {
            id: "2",
            name: "Rebecca Huggins",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review2[language],
            source: "Facebook Review",
          },
          {
            id: "3",
            name: "David Dowdy",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review3[language],
            source: "Facebook Review",
          },
          {
            id: "4",
            name: "Will Hull",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review4[language],
            source: "Facebook Review",
          },
          {
            id: "5",
            name: "Dani Powell",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review5[language],
            source: "Facebook Review",
          },
          {
            id: "6",
            name: "Zach Robertson",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review6[language],
            source: "Facebook Review",
          },
          {
            id: "7",
            name: "Diane Lyons",
            location: "Columbia, SC",
            avatarSrc: "",
            review: t.testimonials.review7[language],
            source: "Facebook Review",
          },
        ]}
        reviewPlatforms={[
          {
            name: "Facebook Reviews",
            subtitle: t.testimonials.platformSubtitle[language],
            href: "https://www.facebook.com/profile.php?id=100063831811913&sk=reviews",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            ),
          }
        ]}
      />

      {/* Contact CTA Section */}
      <section id="contact" className="bg-background px-8 py-24 md:px-16 lg:py-32">
        <div className="mx-auto max-w-[1360px]">
          <motion.div
            className="relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-24"
            style={{ backgroundColor: "var(--foreground)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {/* Decorative gradient */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at top right, var(--green-primary), transparent 60%)",
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2
                className="mb-4 text-3xl font-bold text-white md:text-5xl"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {t.contact.heading[language]}
              </h2>
              <p
                className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60 md:text-lg"
                style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
              >
                {t.contact.description[language]}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:8037438679"
                  className="cta-button inline-flex h-13 items-center gap-2.5 rounded-full bg-green-primary px-8 text-sm font-semibold text-white transition-all hover:bg-green-dark"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {t.contact.cta1[language]}
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100063831811913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex h-13 items-center gap-2.5 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {t.contact.cta2[language]}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "var(--foreground)" }}>
        <div className="mx-auto max-w-[1360px] px-8 py-12 md:px-16 md:py-16">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <Image
                  src="/icon.svg"
                  alt="Manzo's Lawn Care Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Manzo&apos;s Lawn Care
                </span>
              </div>
              <p
                className="max-w-xs text-sm leading-relaxed text-white/50"
                style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
              >
                {t.footer.description[language]}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {t.footer.quickLinks[language]}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: t.nav.services[language], href: "#services" },
                  { label: t.nav.ourWork[language], href: "#our-work" },
                  { label: t.nav.howItWorks[language], href: "#how-it-works" },
                  { label: t.nav.testimonials[language], href: "#testimonials" },
                  { label: t.nav.contact[language], href: "#contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {t.footer.contactHeading[language]}
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2.5 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href="tel:8037438679" className="transition-colors hover:text-white">(803) 743-8679</a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t.footer.location[language]}
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <a
                    href="https://www.facebook.com/profile.php?id=100063831811913"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p
              className="text-xs text-white/30"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              &copy; {new Date().getFullYear()} Manzo&apos;s Lawn Care. {t.footer.rights[language]}
            </p>
          </div>
        </div>
      </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
