import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { Card, Label, SlideShell } from '../components/SlideShell';
import { experienceContent as c } from '../data/presentation';

function Points({ items, size = 'text-[25px]' }: { items: string[]; size?: string }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((p) => (
        <li key={p} className={`flex items-baseline gap-4 border-t border-line py-[8px] leading-snug ${size}`}>
          <span className="h-[8px] w-[8px] shrink-0 -translate-y-[3px] rounded-full bg-accent" aria-hidden />
          {p}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceSlide() {
  return (
    <SlideShell title="Experience">
      <div className="grid h-full grid-cols-[0.92fr_1.08fr] gap-[40px]">
        {/* A. District website internship */}
        <AnimatedSection delay={0.1} x={-16} y={0} className="h-full">
          <Card className="flex h-full flex-col px-[36px] py-[30px]">
            <Label>Web development</Label>
            <div className="mt-[16px] flex items-center gap-[28px]">
              <ImageSlot
                name={c.web.logo.image}
                alt={c.web.logo.alt}
                label={c.web.logo.label}
                fit="contain"
                matte
                className="h-[150px] w-[150px] shrink-0 [&_span]:text-[18px]"
              />
              <div>
                <h2 className="m-0 font-serif text-[46px] font-medium leading-tight">{c.web.role}</h2>
                <p className="m-0 mt-2 text-[26px] font-medium text-accent-hover">Boyertown Area School District</p>
                <p className="m-0 mt-1 text-[22px] text-muted">2025 – Present</p>
              </div>
            </div>
            <div className="mt-[34px]">
              <Points items={c.web.points} size="text-[30px]" />
            </div>
          </Card>
        </AnimatedSection>

        {/* B. Engineering */}
        <AnimatedSection delay={0.2} x={16} y={0} className="h-full">
          <div className="flex h-full flex-col gap-[24px]">
            <Card className="flex-1 px-[36px] py-[26px]">
              <Label>Engineering</Label>
              <h2 className="m-0 mt-2 font-serif text-[40px] font-medium leading-tight">{c.titration.name}</h2>
              <p className="m-0 mb-3 text-[23px] font-medium text-accent-hover">{c.titration.tag}</p>
              <div className="grid grid-cols-[1fr_370px] items-start gap-[24px]">
                <Points items={c.titration.points} size="text-[26px]" />
                <ImageSlot
                  name={c.titration.image.image}
                  alt={c.titration.image.alt}
                  label={c.titration.image.label}
                  fit="contain"
                  matte
                  className="mt-[8px] h-[330px]"
                />
              </div>
            </Card>
            <Card className="px-[36px] py-[22px]">
              <div className="flex items-center justify-between gap-[24px]">
                <div>
                  <h2 className="m-0 font-serif text-[38px] font-medium leading-tight">{c.clothing.name}</h2>
                  <p className="m-0 mb-2 text-[23px] font-medium text-accent-hover">{c.clothing.tag}</p>
                </div>
                <ImageSlot
                  name={c.clothing.logo.image}
                  alt={c.clothing.logo.alt}
                  label={c.clothing.logo.label}
                  fit="contain"
                  matte
                  className="mb-2 h-[96px] w-[150px] shrink-0 [&_span]:text-[16px]"
                />
              </div>
              <Points items={c.clothing.points} size="text-[25px]" />
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
