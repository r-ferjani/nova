"use client";

import { useReducedMotion, motion, type Variants } from "motion/react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the entrance starts. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  distance?: number;
  /** Render a custom element instead of a `div`. */
  as?: ElementType;
  style?: CSSProperties;
  /** Disable the animation entirely (content still renders). */
  static?: boolean;
};

/**
 * Scroll-triggered entrance animation with an accessible, reduced-motion
 * fallback: content renders instantly when the visitor prefers less motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  as = "div",
  style,
  static: isStatic = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (isStatic || prefersReducedMotion) {
    const MotionTag = motion(as);
    return (
      <MotionTag className={className} style={style} initial={false}>
        {children}
      </MotionTag>
    );
  }

  const MotionTag = motion(as);

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerGroup({
  children,
  className,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion(as);

  if (prefersReducedMotion) {
    return (
      <MotionTag className={className} style={style} initial={false}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const MotionTag = motion(as);
  return (
    <MotionTag className={className} style={style} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
