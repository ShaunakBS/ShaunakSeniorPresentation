import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { serviceContent } from '../data/presentation';

export function ServiceLearningSlide() {
  return (
    <SlideShell title="Service Learning" subtitle={serviceContent.organization}>
      <div className="grid h-full grid-cols-[640px_1fr]">
        {/* Logo fills the full column height, shown whole on a white tile */}
        <AnimatedSection delay={0.1} className="relative h-full">
          <ImageSlot
            name={serviceContent.logo.image}
            alt={serviceContent.logo.alt}
            label={serviceContent.logo.label}
            fit="contain"
            matte
            className="!absolute inset-0"
          />
        </AnimatedSection>

        <div className="ml-[56px] flex h-full flex-col justify-between border-l border-line pl-[56px]">
          {/* Hours: one figure, then the breakdown from the signed log */}
          <AnimatedSection delay={0.15}>
            <div className="flex items-end justify-between gap-[40px]">
              <div className="flex items-baseline gap-[16px]">
                <span className="font-serif text-[184px] font-medium leading-[0.85] text-accent-hover">{serviceContent.hours}</span>
                <span className="font-serif text-[44px] text-muted">hours</span>
              </div>
              <dl className="m-0 flex gap-[32px]">
                {serviceContent.hoursByTask.map((h) => (
                  <div key={h.task} className="rule w-[170px] pt-[12px]">
                    <dt className="text-[24px] text-muted">{h.task}</dt>
                    <dd className="m-0 font-serif text-[38px]">
                      {h.hours} {h.hours === 1 ? 'hour' : 'hours'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <h2 className="t-h3 m-0 pb-[8px]">What I did at a home meet</h2>
            <ul className="m-0 list-none p-0">
              {serviceContent.duties.map((d) => (
                <li key={d} className="rule py-[14px] text-[38px] leading-[1.15]">
                  {d}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.35} className="rule pt-[20px]">
            <p className="m-0 mb-[8px] text-[24px] text-muted">What I learned</p>
            <p className="m-0 text-[32px] leading-[1.25] text-ink">{serviceContent.reflection}</p>
          </AnimatedSection>
        </div>
      </div>
    </SlideShell>
  );
}
