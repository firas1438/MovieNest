"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: keyof typeof variants;
  once?: boolean;
};

const variants: Record<string, Variants> = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 }, },
  slideUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, },
  slideDown: { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 }, },
  slideLeft: { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 }, },
  slideRight: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 }, },
  scaleIn: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 }, },
  rotateIn: { hidden: { opacity: 0, rotate: -10 }, visible: { opacity: 1, rotate: 0 }, },
  blurIn: { hidden: { opacity: 0, filter: "blur(8px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" }, }, },
};

export default function MotionWrapper({ children, className, delay = 0, duration = 0.6, variant = "fadeIn", once = true, }: MotionWrapperProps) {
  return (
    <motion.div variants={variants[variant]} initial="hidden" whileInView="visible" viewport={{ once, amount: 0.2 }} 
    transition={{ duration, delay, ease: "easeOut" }} className={className} 
    >
      {children}
    </motion.div>
  );
}
