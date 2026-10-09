import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useStatic } from './MotionContext';

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}

/** Subtle fade-and-rise reveal. Renders a plain div in print view or when reduced motion is requested. */
export function AnimatedSection({ children, delay = 0, y = 14, x = 0, className }: Props) {
  const isStatic = useStatic();
  const reduce = useReducedMotion();
  if (isStatic || reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
