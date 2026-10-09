import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { ninthContent } from '../data/presentation';

export function NinthGradeSlide() {
  return (
    <SlideShell title="Ninth Grade">
      <div className="flex h-full flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-2">
          {/* Smart Futures: two activities that share the column height */}
          <AnimatedSection delay={0.1} className="h-full pr-[56px]">
            <div className="flex h-full flex-col">
              <h2 className="t-h2 m-0 pb-[20px]">Smart Futures</h2>
              {ninthContent.smartFutures.map((a) => (
                <div key={a.name} className="rule flex flex-1 flex-col justify-center">
                  <p className="m-0 font-serif text-[62px] font-medium leading-[1.1]">{a.name}</p>
                  <p className="m-0 mt-[12px] text-[38px] leading-[1.25] text-muted">{a.note}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* College essay: seal beside the title, topics fill the rest */}
          <AnimatedSection delay={0.2} className="h-full border-l border-line pl-[56px]">
            <div data-section="college-essay" className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-[32px] pb-[24px]">
                <div>
                  <h2 className="t-h2 m-0">College essay</h2>
                  <p className="m-0 mt-[10px] text-[38px] leading-[1.25]">{ninthContent.essayTopic}</p>
                </div>
                <ImageSlot
                  name={ninthContent.essaySeal.image}
                  alt={ninthContent.essaySeal.alt}
                  label={ninthContent.essaySeal.label}
                  fit="contain"
                  className="h-[210px] w-[210px] shrink-0 [&_span]:text-[20px]"
                />
              </div>
              <ul className="m-0 flex min-h-0 flex-1 list-none flex-col p-0">
                {ninthContent.essayCovered.map((c) => (
                  <li key={c} className="rule flex flex-1 items-center text-[34px]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.35}>
          <p className="rule m-0 pt-[24px] text-[36px] leading-[1.25] text-ink">{ninthContent.reflection}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
