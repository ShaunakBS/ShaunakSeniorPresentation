import { AnimatedSection } from '../components/AnimatedSection';
import { SlideShell } from '../components/SlideShell';
import { everfiContent } from '../data/presentation';

/** Three topics as large type in three full-height columns, one sentence below. */
export function EverFiSlide() {
  return (
    <SlideShell title="Eleventh Grade" subtitle="EverFi Financial Literacy">
      <div className="flex h-full flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-3">
          {everfiContent.topics.map((t, i) => (
            <AnimatedSection key={t.name} delay={0.1 + i * 0.1} className="h-full">
              <div className={`flex h-full flex-col justify-center ${i === 0 ? 'pr-[40px]' : 'border-l border-line px-[40px]'}`}>
                <h2 className="m-0 font-serif text-[120px] font-medium leading-[1.02]">{t.name}</h2>
                {t.note && <p className="m-0 mt-[24px] text-[36px] leading-[1.25] text-muted">{t.note}</p>}
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.4}>
          <p className="rule m-0 pt-[28px] text-[48px] leading-[1.2] text-ink">{everfiContent.why}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
