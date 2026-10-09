import { AnimatedSection } from '../components/AnimatedSection';
import { SlideShell } from '../components/SlideShell';
import { reflectionContent } from '../data/presentation';

const GAP = 24;
// Long words (e.g. Entrepreneurship) get a wider column so nothing runs past the slide margin.
const weight = (what: string) => (what.length > 14 && !what.includes(' ') ? 1.5 : 1);

export function ReflectionSlide() {
  const { phases } = reflectionContent;
  const total = phases.reduce((n, p) => n + p.steps.length, 0);
  const cols = phases.flatMap((p) => p.steps.map((s) => `${weight(s.what)}fr`)).join(' ');
  let index = 0;
  return (
    <SlideShell title="Personal Reflection">
      <div className="flex h-full flex-col justify-center gap-[56px]">
        <div>
          {/* Phase headers, spanning the same columns as their milestones */}
          <div className="mb-[34px] grid" style={{ columnGap: GAP, gridTemplateColumns: phases.map((p) => `${p.steps.reduce((n, s) => n + weight(s.what), 0)}fr`).join(' ') }}>
            {phases.map((ph, pi) => (
              <AnimatedSection key={ph.title} delay={0.05 + pi * 0.1}>
                <div
                  className={`border-b-2 pb-[10px] text-[24px] font-semibold uppercase tracking-[0.14em] ${pi === 0 ? 'border-line text-muted' : 'border-accent text-accent-hover'}`}
                >
                  {ph.title}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Milestones on a thin connecting line */}
          <div className="grid" style={{ columnGap: GAP, gridTemplateColumns: cols.split(' ').map((c) => `minmax(0, ${c})`).join(' ') }}>
            {phases.flatMap((ph) =>
              ph.steps.map((s) => {
                const i = index++;
                return (
                  <AnimatedSection key={`${s.when}-${s.what}`} delay={0.15 + i * 0.08}>
                    <div className="relative">
                      <div className="absolute top-[11px] h-px bg-line" style={{ left: 0, right: i === total - 1 ? 0 : -GAP }} aria-hidden />
                      <span
                        className={`relative z-10 block h-[23px] w-[23px] rounded-full border-[3px] ${s.current ? 'border-accent bg-accent' : 'border-line bg-paper'}`}
                        aria-hidden
                      />
                      <div className={`mt-[24px] text-[20px] font-semibold uppercase tracking-[0.1em] ${s.current ? 'text-accent-hover' : 'text-muted'}`}>{s.when}</div>
                      <h2 className="m-0 mt-3 font-serif text-[38px] font-medium leading-[1.1]">{s.what}</h2>
                    </div>
                  </AnimatedSection>
                );
              }),
            )}
          </div>
        </div>
        <AnimatedSection delay={0.8}>
          <p className="m-0 border-l-[6px] border-accent pl-[30px] font-serif text-[40px] italic leading-[1.3]">{reflectionContent.statement}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
