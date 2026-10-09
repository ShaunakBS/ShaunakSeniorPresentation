import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { Card, SlideShell } from '../components/SlideShell';
import { futureContent } from '../data/presentation';

export function FuturePlansSlide() {
  return (
    <SlideShell title="Future Plans">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-[28px]">
        {futureContent.schools.map((s, i) => (
          <AnimatedSection key={s.university} delay={0.1 + i * 0.1} className="min-h-0">
            <Card className="relative flex h-full flex-col overflow-hidden px-[36px] py-[24px]">
              <span className="absolute left-0 top-0 h-full w-[5px] bg-accent" aria-hidden />
              <div className="flex items-center gap-[24px]">
                {/* Seal: square, never cropped (object-contain). Add the file named in futureContent to src/assets/images/. */}
                <ImageSlot
                  name={s.seal.image}
                  alt={s.seal.alt}
                  label={s.seal.label}
                  fit="contain"
                  matte
                  className="h-[124px] w-[124px] shrink-0 [&_span]:text-[17px] [&_span]:leading-tight"
                />
                <div className="min-w-0">
                  <h2 className="m-0 font-serif text-[36px] font-medium leading-[1.1]">{s.university}</h2>
                  <p className="m-0 mt-1 text-[27px] font-medium text-accent-hover">{s.business}</p>
                </div>
              </div>
              <ul className="m-0 mt-[16px] list-none border-t border-line p-0">
                {s.reasons.map((r) => (
                  <li key={r} className="flex items-baseline gap-4 py-[7px] text-[27px] leading-snug">
                    <span className="h-[8px] w-[8px] shrink-0 -translate-y-[3px] rounded-full bg-accent" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-auto pt-[8px] text-[21px] tracking-wide text-muted">{s.apply}</p>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </SlideShell>
  );
}
