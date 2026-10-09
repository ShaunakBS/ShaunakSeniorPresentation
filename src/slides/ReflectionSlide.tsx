import { AnimatedSection } from '../components/AnimatedSection';
import { SlideShell } from '../components/SlideShell';
import { reflectionContent } from '../data/presentation';

const GAP = 24;
// Column width follows the longest word, so long words (Entrepreneurship, Cardiologist) never collide with a neighbour.
const weight = (what: string) => {
  const longest = Math.max(...what.split(' ').map((w) => w.length));
  return Math.min(2, Math.max(1, longest / 7.5));
};

/** One horizontal timeline across the full width, in two phases. Red marks only the current direction. */
export function ReflectionSlide() {
  const { phases } = reflectionContent;
  const total = phases.reduce((n, p) => n + p.steps.length, 0);
  const cols = phases.flatMap((p) => p.steps.map((s) => `minmax(0, ${weight(s.what)}fr)`)).join(' ');
  let index = 0;
  return (
    <SlideShell title="Personal Reflection">
      <div className="flex h-full flex-col justify-center gap-[104px]">
        <div>
          <div className="mb-[36px] grid" style={{ columnGap: GAP, gridTemplateColumns: phases.map((p) => `${p.steps.reduce((n, s) => n + weight(s.what), 0)}fr`).join(' ') }}>
            {phases.map((ph, pi) => (
              <AnimatedSection key={ph.title} delay={0.05 + pi * 0.1}>
                <p className={`m-0 font-serif text-[44px] font-medium ${pi === 0 ? 'text-muted' : 'text-ink'}`}>{ph.title}</p>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid" style={{ columnGap: GAP, gridTemplateColumns: cols }}>
            {phases.flatMap((ph) =>
              ph.steps.map((s) => {
                const i = index++;
                return (
                  <AnimatedSection key={`${s.when}-${s.what}`} delay={0.15 + i * 0.08}>
                    <div className="relative">
                      <div className="absolute top-[10px] h-px bg-line" style={{ left: 0, right: i === total - 1 ? 0 : -GAP }} aria-hidden />
                      <span className={`relative z-10 block h-[21px] w-[21px] rounded-full ${s.current ? 'bg-accent' : 'border-2 border-muted bg-paper'}`} aria-hidden />
                      <p className={`m-0 mt-[28px] min-h-[68px] text-[25px] leading-[1.3] ${s.current ? 'text-accent-hover' : 'text-muted'}`}>{s.when}</p>
                      <h2 className="m-0 mt-[6px] font-serif text-[42px] font-medium leading-[1.12]">{s.what}</h2>
                    </div>
                  </AnimatedSection>
                );
              }),
            )}
          </div>
        </div>
        <AnimatedSection delay={0.8}>
          <p className="rule m-0 max-w-[1500px] pt-[32px] text-[48px] leading-[1.25] text-ink">{reflectionContent.statement}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
