import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { futureContent } from '../data/presentation';

/** Four schools in a 2 x 2 grid. Each block: a large seal on the left, text on the right. Dividers only, no boxes. */
export function FuturePlansSlide() {
  return (
    <SlideShell title="Future Plans">
      <div className="grid h-full grid-cols-2 grid-rows-2">
        {futureContent.schools.map((s, i) => (
          <AnimatedSection
            key={s.university}
            delay={0.1 + i * 0.1}
            className={`min-h-0 ${i % 2 === 0 ? 'pr-[44px]' : 'border-l border-line pl-[44px]'} ${i > 1 ? 'rule pt-[28px]' : 'pb-[28px]'}`}
          >
            <div data-school={s.university} className="flex h-full items-stretch gap-[32px]">
              {/* Seal: shown whole (object-contain) on a white tile so dark seals stay legible */}
              <ImageSlot
                name={s.seal.image}
                alt={s.seal.alt}
                label={s.seal.label}
                fit="contain"
                matte
                className="h-[270px] w-[270px] shrink-0 [&_span]:text-[20px] [&_span]:leading-tight"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="m-0 font-serif text-[42px] font-medium leading-[1.1]">{s.university}</h2>
                <p className="m-0 mt-[6px] text-[32px] leading-[1.2] text-accent-hover">{s.business}</p>
                <ul className="m-0 mt-[18px] list-none p-0">
                  {s.reasons.map((r) => (
                    <li key={r} className="text-[31px] leading-[1.25] text-ink" style={{ paddingBlock: 5 }}>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="m-0 mt-auto text-[22px] text-muted">{s.apply}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SlideShell>
  );
}
