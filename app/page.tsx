"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PhotoMarquee from "./components/PhotoMarquee";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Header/Navbar with transparent background */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 md:px-16 md:py-8">
          {/* Logo and Business Name - Properly aligned */}
          <div className="flex items-center gap-2">
        <Image
              src="/icon.svg"
              alt="Manzo's Lawn Care Logo"
              width={48}
              height={48}
              className="h-12 w-12 flex-shrink-0"
            />
            <span 
              className="text-xl font-semibold text-background"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              Manzo&apos;s Lawn Care
            </span>
          </div>

          {/* Navbar Links - Proper spacing */}
          <div className="flex items-center gap-8">
            <a
              href="#services"
              className="text-base font-medium text-background transition-colors hover:text-green-primary"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              Services
            </a>
            <a
              href="#our-work"
              className="text-base font-medium text-background transition-colors hover:text-green-primary"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              Our Work
            </a>
            <a
              href="#contact"
              className="text-base font-medium text-background transition-colors hover:text-green-primary"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              Contact
            </a>
            <span 
              className="text-base font-medium text-background/80"
              style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
            >
              Columbia, SC
            </span>
          </div>
        </nav>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/Manzo Hero BG.png"
            alt="Lawn care background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-8 pt-40  md:flex-row md:items-center md:gap-64 md:px-16 md:pt-56">
          {/* Left Side - Content */}
          <div className="mb-16 w-full max-w-[700px] md:mb-0 md:flex-1">
            {/* Header & Description */}
            <div className="mb-8">
              <h1 
                className="mb-8 text-5xl font-bold leading-none tracking-[-0.02em] text-background md:text-6xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
              >
                Your Dream Yard, Without the Weekend Work
              </h1>

              <p 
                className="mb-16 text-lg leading-[1.5] text-background/90"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif' }}
              >
                Overgrown flower gardens, unkempt hedges, messy beds? We clean up your yard and keep it looking sharp, so you can enjoy your property without the weekend work.
                <br />
                <br />
                With 15 years of experience, Carlos personally discusses your preferences and goes above and beyond. 100% recommendation rate from 18 five-star reviews means you can trust us with your property. Free estimates. Serving Columbia, SC and surrounding areas.
              </p>
            </div>

            {/* Buttons Section - Single CTA Button */}
            <div className="pb-8">
              <motion.a
                href="tel:8037438679"
                className="cta-button group relative inline-flex h-14 items-center gap-3 rounded-full bg-green-primary/90 px-8  text-base font-semibold text-background backdrop-blur-[10px]"
                style={{ 
                  fontFamily: 'var(--font-raleway), sans-serif',
                  borderRadius: '50px'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(60, 135, 43, 1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Call (803) 743-8679</span>
                <motion.div 
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-dark"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: -45
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                >
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-background"
                    initial={{ rotate: -45 }}
                    whileHover={{ 
                      x: 2,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              </motion.a>
            </div>
          </div>

          {/* Right Side - Glassmorphic Card (Satisfied Clients) */}
          <div className="w-full md:w-auto md:flex-shrink-0">
            <a
              href="https://www.facebook.com/profile.php?id=100063831811913&sk=reviews"
            target="_blank"
            rel="noopener noreferrer"
              className="group block rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-[10px] transition-all hover:bg-white/15"
            >
              {/* Stat Section */}
              <div className="mb-8">
                <div 
                  className="mb-2 text-5xl font-bold leading-none text-background"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                >
                  930+
                </div>
                <div 
                  className="text-sm font-medium text-background/90"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                >
                  Satisfied Clients
                </div>
              </div>

              {/* Avatars Section */}
              <div className="flex items-center">
                {/* Avatar placeholders with overlapping effect */}
                <div className="relative h-12 w-12 rounded-full border-2 border-white/30 bg-white/20"></div>
                <div className="relative -ml-3 h-12 w-12 rounded-full border-2 border-white/30 bg-white/20"></div>
                <div className="relative -ml-3 h-12 w-12 rounded-full border-2 border-white/30 bg-white/20"></div>
                <div className="relative -ml-3 h-12 w-12 rounded-full border-2 border-white/30 bg-white/20"></div>
                {/* More indicator */}
                <div className="relative -ml-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/20">
                  <span 
                    className="text-xs font-medium text-background/90"
                    style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
                  >
                    +
                  </span>
                </div>
              </div>
            </a>
          </div>
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

      {/* Services Section */}
      <section id="services" className="bg-background py-24 px-8 md:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* Left Column - Heading Content */}
            <div className="flex flex-col gap-8 lg:w-2/5">
              {/* Label Pill */}
              <div className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-1.5" style={{ background: "rgba(51, 66, 50, 0.05)" }}>
                <div className="h-0.5 w-4 rounded" style={{ background: "rgba(60, 135, 43, 0.5)" }} />
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "rgb(60, 135, 43)" }}>
                  Services
                </span>
                <div className="h-0.5 w-4 rounded" style={{ background: "rgba(60, 135, 43, 0.5)" }} />
              </div>

              {/* Heading */}
              <h2
                className="text-4xl font-bold leading-tight text-foreground md:text-5xl"
                style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
              >
                Professional Services for Your Property
              </h2>

              {/* Subtitle */}
              <p
                className="text-lg leading-[1.5] text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Explore a range of expert solutions tailored to transform your outdoor spaces into personalized retreats.
              </p>

              {/* CTA Button */}
              <a
                href="#services"
                className="group inline-flex w-fit items-center overflow-hidden rounded-[20px] border transition-all hover:brightness-110"
                style={{ borderColor: "rgb(217, 124, 29)" }}
              >
                <span
                  className="px-6 py-3 text-base font-semibold text-white"
                  style={{
                    background: "rgb(217, 124, 29)",
                    fontFamily: 'var(--font-raleway), sans-serif',
                  }}
                >
                  Explore Services
                </span>
                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: "rgb(217, 124, 29)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    fill="none"
                    className="rotate-45 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path
                      d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
            </div>

            {/* Right Column - Services Grid */}
            <div className="lg:w-3/5">
              <div className="grid gap-6 md:grid-cols-2">
            {/* Service Card 1: Lawn Care & Mowing */}
            <motion.a
              href="/services/lawn-care-mowing"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M236.52,187.09l-143-97.87a36,36,0,1,0-14.38,17.27l21.39,21.69L79.15,149.54l0,0a35.91,35.91,0,1,0,14.38,17.27l26.91-18.41L170,198.64a32.26,32.26,0,0,0,22.7,9.37,31.52,31.52,0,0,0,4.11-.27l.28,0,36.27-6.11a8,8,0,0,0,3.19-14.5Zm-162.38-97A20,20,0,1,1,80,76,20,20,0,0,1,74.14,90.13Zm0,104A20,20,0,1,1,80,180,20,20,0,0,1,74.14,194.15Zm61-101.5L169.94,57.4a32.19,32.19,0,0,1,26.84-9.14l.28,0,36,6.07a8.21,8.21,0,0,1,6.09,4.42,8,8,0,0,1-2.67,10.12l-69.93,47.85a4,4,0,0,1-4.51,0l-26.31-18A4,4,0,0,1,135.18,92.65Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Lawn Care & Mowing
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Regular mowing and edging to keep your lawn looking sharp and well-maintained.
              </p>
            </motion.a>

            {/* Service Card 2: Landscaping Services */}
            <motion.a
              href="/services/landscaping-services"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M200,144h-76.7l22.41-22.41a59.55,59.55,0,0,0,26.1,6.36,49.56,49.56,0,0,0,25.89-7.22c23.72-14.36,36.43-47.6,34-88.92a8,8,0,0,0-7.52-7.52c-41.32-2.43-74.56,10.28-88.93,34-9.35,15.45-9.59,34.11-.86,52L120,124.68l-12.21-12.21c6-13.25,5.57-27-1.39-38.48C95.53,56,70.61,46.41,39.73,48.22a8,8,0,0,0-7.51,7.51C30.4,86.6,40,111.52,58,122.4A38.22,38.22,0,0,0,78,128a45,45,0,0,0,18.52-4.19L108.69,136l-8,8H56a8,8,0,0,0,0,16h9.59L78.8,219.47A15.89,15.89,0,0,0,94.42,232h67.17a15.91,15.91,0,0,0,15.62-12.53L190.42,160H200a8,8,0,0,0,0-16Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Landscaping Services
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Complete bed maintenance, tree rings, and planting to enhance your property's beauty.
              </p>
            </motion.a>

            {/* Service Card 3: Hedge & Shrub Trimming */}
            <motion.a
              href="/services/hedge-shrub-trimming"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M255.15,97.72A16,16,0,0,0,242,86.94a136.46,136.46,0,0,1-51.65-18l10.31-10.3a25,25,0,0,0-35.32-35.32l-13.2,13.21c-2.33-2.8-3.81-4.84-4.41-5.69a16,16,0,0,0-24.41-2.15L84.68,67.36a16,16,0,0,0,2.14,24.4c.86.6,2.9,2.08,5.7,4.41L7.31,181.37a25,25,0,0,0,35.32,35.32l82.3-82.31a136.63,136.63,0,0,1,18,51.65,16,16,0,0,0,10.77,13.12,16.21,16.21,0,0,0,5.15.85,15.88,15.88,0,0,0,11.26-4.69l81.18-81.19A15.86,15.86,0,0,0,255.15,97.72Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Hedge & Shrub Trimming
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Professional trimming to keep your hedges and shrubs looking neat and healthy.
              </p>
            </motion.a>

            {/* Service Card 4: Mulch Installation & Delivery */}
            <motion.a
              href="/services/mulch-installation-delivery"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M245.83,121.63a15.53,15.53,0,0,0-9.52-7.33,73.55,73.55,0,0,0-22.17-2.22c4-19.85,1-35.55-2-44.86a16.17,16.17,0,0,0-18.8-10.88,85.53,85.53,0,0,0-28.55,12.12,94.58,94.58,0,0,0-27.11-33.25,16.05,16.05,0,0,0-19.26,0A94.58,94.58,0,0,0,91.26,68.46,85.53,85.53,0,0,0,62.71,56.34,16.14,16.14,0,0,0,43.92,67.22c-3,9.31-6,25-2.06,44.86a73.55,73.55,0,0,0-22.17,2.22,15.53,15.53,0,0,0-9.52,7.33,16,16,0,0,0-1.6,12.26c3.39,12.58,13.8,36.49,45.33,55.33S113.13,208,128.05,208s42.67,0,74-18.78c31.53-18.84,41.94-42.75,45.33-55.33A16,16,0,0,0,245.83,121.63Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Mulch Installation & Delivery
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Quality mulch delivery and professional installation to protect and beautify your landscape beds.
              </p>
            </motion.a>

            {/* Service Card 5: Paver Patio & Walkway Installation */}
            <motion.a
              href="/services/paver-patio-walkway-installation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M232,56V88a4,4,0,0,1-4,4H136V52a4,4,0,0,1,4-4h84A8,8,0,0,1,232,56Zm-4,52H184v44h44a4,4,0,0,0,4-4V112A4,4,0,0,0,228,108ZM88,152h80V108H88Zm-60,0H72V108H28a4,4,0,0,0-4,4v36A4,4,0,0,0,28,152Zm200,16H136v36a4,4,0,0,0,4,4h84a8,8,0,0,0,8-8V172A4,4,0,0,0,228,168ZM28,92h92V52a4,4,0,0,0-4-4H32a8,8,0,0,0-8,8V88A4,4,0,0,0,28,92Zm-4,80v28a8,8,0,0,0,8,8h84a4,4,0,0,0,4-4V168H28A4,4,0,0,0,24,172Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Paver Patio & Walkway Installation
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Beautiful and durable paver patios and walkways to enhance your outdoor living space.
              </p>
            </motion.a>

            {/* Service Card 6: Fire Pit Installation */}
            <motion.a
              href="/services/fire-pit-installation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75Zm9.85,105.59a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Fire Pit Installation
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Custom fire pit installation to create a cozy gathering spot in your backyard.
              </p>
            </motion.a>

            {/* Service Card 7: Retaining Wall & Stone Border Installation */}
            <motion.a
              href="/services/retaining-wall-stone-border-installation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="group block rounded-[20px] p-6 transition-all"
              style={{ background: "rgba(51, 66, 50, 0.05)" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[13px]"
                  style={{ background: "rgb(46, 61, 45)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" style={{ color: "rgb(252, 202, 47)" }}>
                    <path d="M240,208h-8V72a8,8,0,0,0-8-8H184V40a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8V96H32a8,8,0,0,0-8,8V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM80,176H64a8,8,0,0,1,0-16H80a8,8,0,0,1,0,16Zm0-32H64a8,8,0,0,1,0-16H80a8,8,0,0,1,0,16Zm64,64H112V168h32Zm-8-64H120a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm0-32H120a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm0-32H120a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm56,96H176a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm0-32H176a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm0-32H176a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Z" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-raleway), sans-serif', color: "rgb(33, 80, 82)" }}
                >
                  Retaining Wall & Stone Border Installation
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed text-foreground-secondary"
                style={{ fontFamily: 'var(--font-merriweather), Georgia, serif', opacity: 0.8 }}
              >
                Functional and attractive retaining walls and stone borders to define and protect your landscape.
              </p>
            </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Auto-Scrolling Carousel */}
      <TestimonialsSection
        heading="Our Customers Say Better Than Us"
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
          },
          {
            name: "Google Reviews",
            subtitle: "930+ Satisfied Clients",
            href: "#",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            ),
          },
        ]}
      />
    </div>
  );
}
