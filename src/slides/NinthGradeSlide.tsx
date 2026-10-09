import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { Card, Label, SlideShell } from '../components/SlideShell';
import { ninthContent } from '../data/presentation';

export function NinthGradeSlide() {
  return (
    <SlideShell title="Ninth Grade">
      <div className="grid h-full grid-rows-[1fr_auto] gap-[28px]">
        <div className="grid grid-cols-2 gap-[40px]">
          <AnimatedSection delay={0.1} className="h-full">
            <Card className="h-full px-[40px] py-[32px]">
              <Label>Smart Futures</Label>
              <div className="mt-[22px] flex flex-col gap-[44px]">
                {ninthContent.smartFutures.map((a, i) => (
                  <div key={a.name} className="border-t border-line pt-[20px]">
                    <div className="text-[18px] font-semibold uppercase tracking-[0.1em] text-muted">Activity {i + 1}</div>
                    <h2 className="m-0 font-serif text-[50px] font-medium leading-tight">{a.name}</h2>
                    <p className="m-0 mt-2 text-[31px] text-muted">{a.note}</p>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="h-full">
            <Card className="h-full px-[40px] py-[32px]">
              <Label>College Essay</Label>
              <div className="mt-[18px] flex items-start justify-between gap-[24px]">
                <h2 className="m-0 font-serif text-[46px] font-medium leading-tight">{ninthContent.essayTopic}</h2>
                <ImageSlot
                  name={ninthContent.essaySeal.image}
                  alt={ninthContent.essaySeal.alt}
                  label={ninthContent.essaySeal.label}
                  fit="contain"
                  className="h-[150px] w-[150px] shrink-0 [&_span]:text-[18px]"
                />
              </div>
              <p className="m-0 mb-[8px] mt-[14px] text-[26px] text-muted">The essay covered:</p>
              <ul className="m-0 list-none p-0">
                {ninthContent.essayCovered.map((c) => (
                  <li key={c} className="flex items-baseline gap-4 border-t border-line py-[11px] text-[30px]">
                    <span className="h-[8px] w-[8px] shrink-0 -translate-y-[3px] rounded-full bg-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.35}>
          <div className="rounded-[6px] border-l-[6px] border-accent bg-accent-light px-[36px] py-[22px]">
            <p className="m-0 font-serif text-[30px] italic leading-[1.35] text-ink">
              {ninthContent.reflection}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
