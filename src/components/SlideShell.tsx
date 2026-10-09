import type { ReactNode } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { student } from '../data/presentation';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/** Common slide frame: heading row, thin divider, content area, discreet footer. Sized for the 1920x1080 stage. */
export function SlideShell({ title, subtitle, children, className = '' }: Props) {
  return (
    <section className="absolute inset-0 flex flex-col px-[96px] pb-[72px] pt-[60px]" aria-label={title}>
      <header className="flex items-end justify-between border-b border-line pb-[16px]">
        <AnimatedSection y={10}>
          <h1 className="m-0 font-serif text-[76px] font-medium leading-[1] tracking-[-0.015em] text-ink">{title}</h1>
        </AnimatedSection>
        {subtitle && (
          <AnimatedSection delay={0.1} y={8}>
            <p className="m-0 pb-[6px] text-[28px] font-medium text-accent-hover">{subtitle}</p>
          </AnimatedSection>
        )}
      </header>
      <div className={`min-h-0 flex-1 pt-[28px] ${className}`}>{children}</div>
      <footer className="absolute bottom-[26px] left-[96px] right-[96px] flex justify-between text-[17px] tracking-wide text-muted">
        <span>{student.name}</span>
      </footer>
    </section>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[6px] border border-line bg-surface shadow-card ${className}`}>{children}</div>;
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`label ${className}`}>{children}</div>;
}
