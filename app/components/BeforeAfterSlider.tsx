"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-[20px] select-none"
      style={{ aspectRatio: "16 / 10" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After image (full, sits behind) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (clipped by slider position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before label */}
      <div
        className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm transition-opacity"
        style={{ opacity: sliderPos > 12 ? 1 : 0 }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider text-white"
          style={{ fontFamily: "var(--font-raleway), sans-serif" }}
        >
          Before
        </span>
      </div>

      {/* After label */}
      <div
        className="absolute right-4 bottom-4 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm transition-opacity"
        style={{ opacity: sliderPos < 88 ? 1 : 0 }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider text-white"
          style={{ fontFamily: "var(--font-raleway), sans-serif" }}
        >
          After
        </span>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      />

      {/* Slider handle */}
      <div
        className="absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 border-white bg-green-primary shadow-lg active:cursor-grabbing"
        style={{ left: `${sliderPos}%`, transform: "translate(-50%, -50%)" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="8 4 4 12 8 20" />
          <polyline points="16 4 20 12 16 20" />
        </svg>
      </div>
    </div>
  );
}
