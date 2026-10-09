import { AnimatedSection } from '../components/AnimatedSection';
import { Card, Label, SlideShell } from '../components/SlideShell';
import { tenthContent } from '../data/presentation';

export function TenthGradeSlide() {
  return (
    <SlideShell title="Tenth Grade" subtitle="Smart Futures">
      <div className="flex h-full flex-col justify-center gap-[40px]">
        <div className="grid grid-cols-2 gap-[48px]">
          {tenthContent.activities.map((a, i) => (
            <AnimatedSection key={a.name} delay={0.1 + i * 0.12}>
              <Card className="px-[44px] py-[40px]">
                <div className="font-serif text-[64px] leading-none text-accent-hover">{String(i + 1).padStart(2, '0')}</div>
                <h2 className="m-0 mt-[20px] font-serif text-[58px] font-medium leading-tight">{a.name}</h2>
                <div className="my-[22px] h-px bg-line" />
                <Label>Skill area</Label>
                <p className="m-0 mt-1 text-[40px] font-medium">{a.skill}</p>
                <p className="m-0 mt-2 text-[30px] text-muted">{a.note}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.4}>
          <p className="m-0 border-l-[6px] border-accent pl-[28px] font-serif text-[42px] italic leading-snug">{tenthContent.connection}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
