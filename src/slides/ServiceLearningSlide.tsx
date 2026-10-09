import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { Card, Label, SlideShell } from '../components/SlideShell';
import { serviceContent } from '../data/presentation';

export function ServiceLearningSlide() {
  return (
    <SlideShell title="Service Learning" subtitle={serviceContent.organization}>
      <div className="grid h-full grid-cols-[560px_1fr] gap-[64px]">
        <div className="flex flex-col gap-[28px]">
          <AnimatedSection delay={0.1}>
            <Card className="px-[36px] py-[28px]">
              <Label>Total volunteer hours</Label>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[120px] font-medium leading-[1] text-accent-hover">{serviceContent.hours}</span>
                <span className="text-[36px] text-muted">hours</span>
              </div>
              <ul className="m-0 mt-3 list-none border-t border-line p-0">
                {serviceContent.hoursByTask.map((h) => (
                  <li key={h.task} className="flex justify-between border-b border-line py-[6px] text-[24px]">
                    <span>{h.task}</span>
                    <span className="font-medium tabular-nums">{h.hours} {h.hours === 1 ? 'hour' : 'hours'}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="relative min-h-0 flex-1">
            <ImageSlot
              name={serviceContent.logo.image}
              alt={serviceContent.logo.alt}
              label={serviceContent.logo.label}
              fit="contain"
              matte
              className="!absolute inset-0"
            />
          </AnimatedSection>
        </div>
        <div className="flex flex-col">
          <AnimatedSection delay={0.15}>
            <Label className="mb-3">What I did at a home meet</Label>
            <ul className="m-0 list-none p-0">
              {serviceContent.duties.map((d) => (
                <li key={d} className="flex items-baseline gap-5 border-t border-line py-[26px] text-[38px]">
                  <span className="h-[10px] w-[10px] shrink-0 -translate-y-[4px] rounded-full bg-accent" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.4} className="mt-auto">
            <div className="rounded-[6px] border-l-[6px] border-accent bg-accent-light px-[30px] py-[20px]">
              <div className="label mb-1">What I learned</div>
              <p className="m-0 font-serif text-[29px] italic leading-[1.35]">{serviceContent.reflection}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </SlideShell>
  );
}
