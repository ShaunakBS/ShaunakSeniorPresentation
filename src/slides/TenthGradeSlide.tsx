import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { tenthContent } from '../data/presentation';

/** Skills on the left, the certificates screenshot large on the right. */
export function TenthGradeSlide() {
  const t = tenthContent;
  return (
    <SlideShell title="Tenth Grade" subtitle="Smart Futures">
      <div className="grid h-full grid-cols-[560px_1fr]">
        <AnimatedSection delay={0.1} className="h-full">
          <div className="flex h-full flex-col justify-center pr-[48px]">
            <h2 className="m-0 font-serif text-[68px] font-medium leading-[1.08]">{t.heading}</h2>
            <ul className="m-0 mt-[40px] list-none p-0">
              {t.skills.map((s) => (
                <li key={s} className="rule py-[20px] text-[38px] leading-[1.2]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="flex h-full items-center border-l border-line pl-[48px]">
          <ImageSlot
            name={t.image.image}
            alt={t.image.alt}
            label={t.image.label}
            fit="contain"
            className="aspect-[1332/597] w-full"
          />
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
