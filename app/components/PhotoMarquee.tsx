"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

interface PhotoMarqueeProps {
  images: { src: string; alt: string }[];
  imageSize?: number;
  gap?: number;
  borderRadius?: number;
  perspective?: number;
  slideDistance?: number;
}

export default function PhotoMarquee({
  images,
  imageSize = 250,
  gap = 16,
  borderRadius = 20,
  perspective = 1200,
  slideDistance = 400,
}: PhotoMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [slideDistance, -slideDistance]);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden py-16"
      style={{ padding: "60px 0" }}
    >
      <div
        className="flex w-full justify-center"
        style={{ perspective: `${perspective}px` }}
      >
        <motion.div
          className="flex"
          style={{
            x,
            gap: `${gap}px`,
            display: "flex",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={`${imageSize}px`}
                className="object-cover object-center"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

