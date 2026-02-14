"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarSrc: string;
  review: string;
  source: string;
}

interface ReviewPlatform {
  name: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  heading: string;
  label?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage: string;
  reviewPlatforms: ReviewPlatform[];
}

export default function TestimonialsSection({
  testimonials,
  heading,
  label = "Testimonials",
  ctaText = "View Reviews",
  ctaHref = "/reviews",
  backgroundImage,
  reviewPlatforms,
}: TestimonialsSectionProps) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate scroll distance after render
  useEffect(() => {
    if (scrollContainerRef.current && testimonials.length > 0) {
      const firstSetHeight = scrollContainerRef.current.scrollHeight / 3; // Since we duplicate 3x
      setScrollDistance(firstSetHeight + 20); // Add gap
    }
  }, [testimonials.length]);

  // Duplicate testimonials 3x for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 px-8 md:px-16 lg:py-32">
      {/* Card Container */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-background shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Testimonials background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-[2] flex flex-col gap-10 p-8 md:p-12 lg:flex-row lg:gap-16 lg:p-16">
        {/* Left Column */}
        <div className="flex flex-col gap-8 lg:w-2/5">
          {/* Label Pill */}
          <div className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-1.5" style={{ background: "rgba(51, 66, 50, 0.05)" }}>
            <div className="h-0.5 w-4" style={{ background: "rgba(135, 186, 84, 0.5)" }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "rgb(135, 186, 84)" }}>
              {label}
            </span>
            <div className="h-0.5 w-4" style={{ background: "rgba(135, 186, 84, 0.5)" }} />
          </div>

          {/* Heading */}
          <h2
            className="max-w-[500px] text-4xl font-bold leading-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-raleway), sans-serif" }}
          >
            {heading}
          </h2>

          {/* CTA Button */}
          <a
            href={ctaHref}
            className="group inline-flex w-fit items-center overflow-hidden rounded-[20px] border transition-all hover:brightness-110"
            style={{ borderColor: "rgb(217, 124, 29)" }}
          >
            <span
              className="px-6 py-3 text-base font-semibold text-white"
              style={{
                background: "rgb(217, 124, 29)",
                fontFamily: "var(--font-raleway), sans-serif",
              }}
            >
              {ctaText}
            </span>
            <div
              className="flex h-12 w-12 items-center justify-center"
              style={{ background: "rgb(217, 124, 29)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="rotate-45 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>

          {/* Review Platform Links */}
          <div className="flex flex-col gap-4">
            <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Check More Reviews:
            </p>
            <div className="flex flex-wrap gap-4">
              {reviewPlatforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-[10px] px-4 py-3 transition-all hover:bg-white/10"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div style={{ color: "rgb(255, 122, 59)" }}>{platform.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{platform.name}</span>
                    <span className="text-[10px]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                      {platform.subtitle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Vertical Auto-Scrolling Carousel */}
        <div
          className="relative h-[500px] overflow-hidden lg:w-3/5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.ul
            ref={scrollContainerRef}
            className="flex flex-col gap-5"
            animate={{
              y: scrollDistance > 0 ? -scrollDistance : 0,
            }}
            transition={{
              duration: scrollDistance > 0 ? scrollDistance / 15 : 20, // Adjust speed here (lower = faster)
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            style={{
              willChange: "transform",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <li key={`${testimonial.id}-${index}`}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </motion.ul>
        </div>
        </div>
      </div>
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="rounded-[10px] p-5"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      {/* Header Row */}
      <div className="mb-4 flex items-center gap-3">
        {/* Avatar */}
        <div
          className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-[17px] p-1"
          style={{ background: "rgba(33, 80, 82, 0.06)" }}
        >
          {testimonial.avatarSrc ? (
            <Image
              src={testimonial.avatarSrc}
              alt={testimonial.name}
              fill
              className="rounded-[13px] object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[13px] bg-gray-600 text-xs font-semibold text-white">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Name & Location */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-white">{testimonial.name}</h3>
          <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            {testimonial.location}
          </p>
        </div>
      </div>

      {/* Review Text */}
      <p
        className="mb-4 text-sm leading-relaxed text-white"
        style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
      >
        {testimonial.review}
      </p>

      {/* Divider */}
      <div className="my-4 h-px" style={{ background: "rgba(255, 255, 255, 0.1)" }} />

      {/* Footer Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          {testimonial.source}
        </span>
        {/* Star Rating */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="rgb(255, 122, 59)"
              className="text-orange-400"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

