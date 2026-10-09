import { AnimatedSection } from '../components/AnimatedSection';
import { SlideShell } from '../components/SlideShell';
import { tenthContent } from '../data/presentation';

/** Two activities, so two large rows. Skill area on the right. */
export function TenthGradeSlide() {
  return (
    <SlideShell title="Tenth Grade" subtitle="Smart Futures">
      <div className="flex h-full flex-col">
        {tenthContent.activities.map((a, i) => (
          <AnimatedSection key={a.name} delay={0.1 + i * 0.1} className="flex-1">
            <div className={`flex h-full items-center justify-between gap-[48px] ${i > 0 ? 'rule' : ''}`}>
              <h2 className="m-0 font-serif text-[96px] font-medium leading-[1.05]">{a.name}</h2>
              <p className="m-0 shrink-0 font-serif text-[48px] text-muted">{a.skill}</p>
            </div>
          </AnimatedSection>
        ))}
        <AnimatedSection delay={0.35}>
          <p className="rule m-0 pt-[24px] text-[44px] leading-[1.25] text-ink">{tenthContent.connection}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
