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
              Your Dream Yard, Without the Weekend Work
            </motion.h1>

            <motion.p
              className="mb-10 max-w-[500px] text-base leading-relaxed text-white/80 md:text-lg"
              style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            >
              Columbia&apos;s trusted lawn care team. We handle the mowing, landscaping, and hardscaping, so your weekends stay free.
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
                Get Free Estimate
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
                (803) 743-8679
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
                    Years Experience
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
                    Satisfied Clients
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
                  18 Five-Star Reviews
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
              { target: 8, suffix: "+", label: "Years of Experience" },
              { target: 330, suffix: "+", label: "Satisfied Clients" },
              { target: 18, suffix: "+", label: "Five-Star Reviews" },
              { target: null, display: "Free", suffix: "", label: "Estimates & Consultations" },
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
                Services
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              What we <em className="italic">do</em>
            </h2>

            {/* Subtitle */}
            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg"
              style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
            >
              From weekly mowing to custom fire pits, we handle it all
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
                    Lawn Care & Mowing
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    Come home to a freshly cut lawn every week. We handle the mowing, edging, and cleanup so your yard always looks its best.
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Perfect for</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Residential yards, HOA properties</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Frequency</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Weekly or bi-weekly</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Includes</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Mowing, edging, blowing</span>
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
                    Landscaping Services
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    Give your property the curb appeal it deserves. From flower beds to tree rings, we design and maintain landscapes that stand out.
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Perfect for</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Property upgrades, curb appeal</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Includes</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Beds, tree rings, planting</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Estimated Duration</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>1&#8211;3 days</span>
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
                    Hedge & Shrub Trimming
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    Overgrown hedges drag down your whole yard. We shape and trim them back so your property looks clean and cared for.
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Perfect for</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Overgrown yards, HOA compliance</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Frequency</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Monthly or seasonal</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Includes</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Shaping, cleanup, hauling</span>
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
                    Mulch Installation & Delivery
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    Fresh mulch makes everything look finished. We deliver and spread it right, so your beds stay neat and your plants stay healthy.
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Perfect for</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Garden beds, tree rings</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Includes</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Delivery & professional spreading</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Estimated Duration</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>1&#8211;2 days</span>
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
                    Paver Patio & Walkway
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    Create the outdoor space you&apos;ve been wanting. We build custom paver patios and walkways made to last.
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Perfect for</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Outdoor living, entertaining</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Estimated Duration</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>3&#8211;7 days</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Popular add-ons</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Fire pit, retaining walls</span>
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
                    Fire Pit Installation
                  </h4>
                  <p
                    className="text-sm leading-relaxed text-foreground-secondary"
                    style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
                  >
                    Cool evenings, good company, your own backyard fire pit. We build them from scratch, ready for your first night out.
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Perfect for</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Backyard gatherings, ambiance</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Estimated Duration</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>1&#8211;3 days</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>Popular add-ons</span>
                    <span className="text-right text-sm text-foreground-secondary" style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}>Paver patio, seating walls</span>
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
                The Proof
              </span>
            </div>
            <h2
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              What could we do with <em className="italic">your</em> yard?
            </h2>
            <p
              className="mx-auto max-w-md text-base leading-relaxed text-foreground-secondary md:text-lg"
              style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
            >
              Drag to see the transformation
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
              Get Your Free Estimate
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
                How It Works
              </span>
            </div>
            <h2
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              Simple as <em className="italic">1, 2, 3</em>
            </h2>
            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg"
              style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
            >
              From first call to finished yard, here&apos;s how we work with you
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Call for a Free Estimate",
                description: "Give us a call or reach out on Facebook. We\u2019ll schedule a time to visit your property at no cost.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "We Discuss Your Vision",
                description: "Carlos walks your property with you, listens to what you want, and puts together a clear plan with honest pricing.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "We Transform Your Yard",
                description: "We show up on time, do the work right, and don\u2019t leave until you\u2019re happy with the results.",
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
        heading="Don't Take Our Word for It"
        label="Testimonials"
        ctaText="View Reviews"
        ctaHref="https://www.facebook.com/profile.php?id=100063831811913&sk=reviews"
        backgroundImage="/581810828_1328256535978728_1331481319508351998_n.jpg"
        testimonials={[
          {
            id: "1",
            name: "Paige Cooper",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "Carlos and his team do great work. I'd highly recommend hiring them for all your landscaping needs.",
            source: "Facebook Review",
          },
          {
            id: "2",
            name: "Rebecca Huggins",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "Very happy with their work! Quick to provide service. Even invited me to inspect their initial work before they left to ensure I was satisfied.",
            source: "Facebook Review",
          },
          {
            id: "3",
            name: "David Dowdy",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "Carlos is a great person and a great lawn care professional. He has 15 years experience and I found him to be extremely patient and professional. I recommend Manzo to anyone needing lawn care. They ARE good people.",
            source: "Facebook Review",
          },
          {
            id: "4",
            name: "Will Hull",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "10/10. Excellent service and quality work. Highly recommend!",
            source: "Facebook Review",
          },
          {
            id: "5",
            name: "Dani Powell",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "Great service and attention to detail. My yard has never looked better!",
            source: "Facebook Review",
          },
          {
            id: "6",
            name: "Zach Robertson",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "Been using their services for years. Always reliable and professional. The best lawn care service in Columbia.",
            source: "Facebook Review",
          },
          {
            id: "7",
            name: "Diane Lyons",
            location: "Columbia, SC",
            avatarSrc: "",
            review: "Top notch work! They transformed my overgrown yard into something beautiful. Couldn't be happier.",
            source: "Facebook Review",
          },
        ]}
        reviewPlatforms={[
          {
            name: "Facebook Reviews",
            subtitle: "18 Five Star Reviews",
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
                Your yard is one call away from looking its best
              </h2>
              <p
                className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60 md:text-lg"
                style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
              >
                Every estimate is free, with no pressure and no contracts. Carlos will walk your property, hear what you want, and give you an honest quote.
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
                  Call (803) 743-8679
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100063831811913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex h-13 items-center gap-2.5 rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Message on Facebook
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
                Lawn care and landscaping in Columbia, SC. 8+ years of experience. Licensed &amp; insured.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5">
                {["Services", "Our Work", "How It Works", "Testimonials", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {link}
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
                Contact
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
                  Columbia, SC & surrounding areas
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
              &copy; {new Date().getFullYear()} Manzo&apos;s Lawn Care. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
