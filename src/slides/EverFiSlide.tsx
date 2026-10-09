import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { everfiContent } from '../data/presentation';

/** Three topics stacked on the left, the certificate large on the right, one sentence below. */
export function EverFiSlide() {
  return (
    <SlideShell title="Eleventh Grade" subtitle="EverFi Financial Literacy">
      <div className="flex h-full flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_940px]">
          <div className="flex h-full flex-col pr-[48px]">
            {everfiContent.topics.map((t, i) => (
              <AnimatedSection key={t.name} delay={0.1 + i * 0.1} className="flex-1">
                <div className={`flex h-full flex-col justify-center ${i > 0 ? 'rule' : ''}`}>
                  <h2 className="m-0 font-serif text-[84px] font-medium leading-[1.05]">{t.name}</h2>
                  {t.note && <p className="m-0 mt-[12px] text-[34px] leading-[1.25] text-muted">{t.note}</p>}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.2} className="flex h-full items-center border-l border-line pl-[48px]">
            <ImageSlot
              name={everfiContent.certificate.image}
              alt={everfiContent.certificate.alt}
              label={everfiContent.certificate.label}
              fit="contain"
              className="aspect-[857/655] w-full"
            />
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.4}>
          <p className="rule m-0 pt-[24px] text-[44px] leading-[1.2] text-ink">{everfiContent.why}</p>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
