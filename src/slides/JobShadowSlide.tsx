import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { jobShadowContent } from '../data/presentation';

export function JobShadowSlide() {
  const j = jobShadowContent;
  return (
    <SlideShell title="Job Shadow">
      <div className="flex h-full flex-col">
        {/* Placement and profession: the confirmed facts, set large */}
        <div className="grid min-h-0 flex-1 grid-cols-2">
          <AnimatedSection delay={0.1} className="h-full">
            <div className="flex h-full flex-col justify-center pr-[48px]">
              <p className="label">Placement</p>
              <p className="m-0 mt-[8px] font-serif text-[148px] font-medium leading-[1.02]">{j.placement}</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="h-full">
            <div className="flex h-full flex-col justify-center border-l border-line pl-[56px]">
              <p className="label">Profession</p>
              <p className="m-0 mt-[8px] font-serif text-[148px] font-medium leading-[1.02]">{j.profession}</p>
            </div>
          </AnimatedSection>
        </div>

        <div className="rule grid grid-cols-[660px_1fr] items-stretch pt-[40px]">
          <AnimatedSection delay={0.3}>
            <ImageSlot name={j.logo.image} alt={j.logo.alt} label={j.logo.label} fit="contain" matte className="h-[330px] w-[660px]" />
          </AnimatedSection>
          <AnimatedSection delay={0.35} className="ml-[48px] border-l border-line pl-[48px]">
            <h2 className="t-h3 m-0 mb-[8px]">Accounting and finance</h2>
            {j.generalConnection.map((g) => (
              <div key={g.title} className="rule grid grid-cols-[190px_1fr] gap-[24px] py-[18px]">
                <p className="m-0 text-[32px] text-ink">{g.title}</p>
                <p className="m-0 text-[32px] text-muted">{g.text}</p>
              </div>
            ))}
            <p className="rule m-0 pt-[18px] text-[38px] leading-[1.25] text-ink">{j.goalLink}</p>
          </AnimatedSection>
        </div>
      </div>
    </SlideShell>
  );
}
