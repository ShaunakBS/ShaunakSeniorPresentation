import { AnimatedSection } from '../components/AnimatedSection';
import { Card, SlideShell } from '../components/SlideShell';
import { everfiContent } from '../data/presentation';

export function EverFiSlide() {
  return (
    <SlideShell title="Eleventh Grade" subtitle="EverFi Financial Literacy">
      <div className="flex h-full flex-col justify-center gap-[44px]">
        <div className="grid grid-cols-3 gap-[36px]">
          {everfiContent.topics.map((t, i) => (
            <AnimatedSection key={t.name} delay={0.1 + i * 0.12}>
              <Card className="h-[420px] px-[36px] py-[36px]">
                <div className="font-serif text-[64px] leading-none text-accent-hover">{String(i + 1).padStart(2, '0')}</div>
                <h2 className="m-0 mt-[28px] font-serif text-[58px] font-medium leading-tight">{t.name}</h2>
                <div className="my-[22px] h-px bg-line" />
                <p className="m-0 text-[32px] leading-snug text-muted">{t.note}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.5}>
          <p className="m-0 border-l-[6px] border-accent pl-[28px] font-serif text-[44px] italic leading-snug">{everfiContent.why}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
