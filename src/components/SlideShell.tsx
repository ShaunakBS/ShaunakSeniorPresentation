import type { ReactNode } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { student } from '../data/presentation';

interface Props {
  title: string;
  /** Optional context line, set in muted gray at the right of the heading. */
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Common slide frame for the 1920x1080 stage: 72px side margins, heading with one hairline, content area, small footer.
 * Content area is 1776 px wide and about 830 px tall.
 */
export function SlideShell({ title, subtitle, children, className = '' }: Props) {
  return (
    <section className="absolute inset-0 flex flex-col px-[72px] pb-[76px] pt-[44px]" aria-label={title}>
      <header className="flex items-baseline justify-between border-b border-line pb-[18px]">
        <AnimatedSection y={8}>
          <h1 className="t-title m-0 text-ink">{title}</h1>
        </AnimatedSection>
        {subtitle && <p className="m-0 text-[32px] text-muted">{subtitle}</p>}
      </header>
      <div className={`min-h-0 flex-1 pt-[28px] ${className}`}>{children}</div>
      <footer className="absolute bottom-[26px] left-[72px] right-[72px] text-[18px] text-muted">
        <span>{student.name}</span>
      </footer>
    </section>
  );
}

/** Small gray label, sentence case. */
export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`label m-0 ${className}`}>{children}</p>;
}
