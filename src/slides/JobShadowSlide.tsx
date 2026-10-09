import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { Card, Label, SlideShell } from '../components/SlideShell';
import { jobShadowContent } from '../data/presentation';

export function JobShadowSlide() {
  return (
    <SlideShell title="Job Shadow">
      <div className="grid h-full grid-cols-[760px_1fr] gap-[64px]">
        <AnimatedSection delay={0.1} className="h-full">
          {/* Ledger-style panel: ruled lines and a double rule, a restrained nod to accounting */}
          <div
            className="flex h-full flex-col justify-center rounded-[6px] border border-line bg-surface px-[56px] shadow-card"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 51px, rgba(255,255,255,0.05) 51px 52px)' }}
          >
            <ImageSlot
              name={jobShadowContent.logo.image}
              alt={jobShadowContent.logo.alt}
              label={jobShadowContent.logo.label}
              fit="contain"
              matte
              className="mb-[40px] h-[200px] w-[520px] [&_span]:text-[22px]"
            />
            <Label>Placement</Label>
            <h2 className="m-0 mt-2 font-serif text-[104px] font-medium leading-[1.05]">{jobShadowContent.placement}</h2>
            <div className="my-[34px] border-y-[3px] border-double border-accent/50" />
            <Label>Profession</Label>
            <p className="m-0 mt-2 font-serif text-[76px] leading-[1.1] text-accent-hover">{jobShadowContent.profession}</p>
          </div>
        </AnimatedSection>
        <div className="flex flex-col">
          <AnimatedSection delay={0.2}>
            <Label className="mb-3">How accounting connects to finance</Label>
          </AnimatedSection>
          <div className="flex flex-col gap-[24px]">
            {jobShadowContent.generalConnection.map((g, i) => (
              <AnimatedSection key={g.title} delay={0.25 + i * 0.1}>
                <Card className="px-[32px] py-[26px]">
                  <h3 className="m-0 font-serif text-[46px] font-medium">{g.title}</h3>
                  <p className="m-0 mt-1 text-[30px] leading-snug text-muted">{g.text}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.6} className="mt-auto">
            <p className="m-0 border-l-[6px] border-accent pl-[26px] font-serif text-[34px] italic leading-snug">{jobShadowContent.goalLink}</p>
          </AnimatedSection>
        </div>
      </div>
    </SlideShell>
  );
}
