import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { experienceContent as c } from '../data/presentation';

function Rows({ items, size }: { items: string[]; size: string }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((p) => (
        <li key={p} className={`rule py-[13px] leading-[1.2] ${size}`}>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Two experiences side by side, separated by one vertical hairline. */
export function ExperienceSlide() {
  return (
    <SlideShell title="Experience">
      <div className="grid h-full grid-cols-[0.9fr_1.1fr]">
        {/* District internship */}
        <AnimatedSection delay={0.1} y={0} className="h-full">
          <div className="flex h-full flex-col pr-[48px]">
            <p className="label">Web development</p>
            <div className="mb-[28px] mt-[16px] flex items-center gap-[32px]">
              <ImageSlot
                name={c.web.logo.image}
                alt={c.web.logo.alt}
                label={c.web.logo.label}
                fit="contain"
                matte
                className="h-[210px] w-[210px] shrink-0 [&_span]:text-[20px]"
              />
              <div>
                <h2 className="t-h2 m-0">{c.web.role}</h2>
                <p className="m-0 mt-[10px] text-[32px] text-accent-hover">Boyertown Area School District</p>
                <p className="m-0 text-[24px] text-muted">2025 – Present</p>
              </div>
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
              {c.web.points.map((p) => (
                <p key={p} className="rule m-0 flex flex-1 items-center text-[34px] leading-[1.2]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Engineering */}
        <AnimatedSection delay={0.2} y={0} className="h-full">
          <div className="flex h-full flex-col border-l border-line pl-[48px]">
            <p className="label">Engineering</p>
            <h2 className="t-h2 m-0 mt-[12px]">{c.titration.name}</h2>
            <p className="m-0 mb-[16px] mt-[6px] text-[30px] text-accent-hover">{c.titration.tag}</p>
            <div className="grid grid-cols-[1fr_470px] items-start gap-[32px]">
              <Rows items={c.titration.points} size="text-[30px]" />
              <ImageSlot
                name={c.titration.image.image}
                alt={c.titration.image.alt}
                label={c.titration.image.label}
                fit="contain"
                matte
                className="h-[390px]"
              />
            </div>

            <div className="rule mt-auto pt-[22px]">
              <div className="flex items-center justify-between gap-[24px]">
                <div>
                  <h2 className="m-0 font-serif text-[40px] font-medium leading-[1.1]">{c.clothing.name}</h2>
                  <p className="m-0 mt-[6px] text-[28px] text-accent-hover">{c.clothing.tag}</p>
                </div>
                <ImageSlot
                  name={c.clothing.logo.image}
                  alt={c.clothing.logo.alt}
                  label={c.clothing.logo.label}
                  fit="contain"
                  matte
                  className="h-[112px] w-[176px] shrink-0 [&_span]:text-[16px]"
                />
              </div>
              <div className="mt-[10px]">
                <Rows items={c.clothing.points} size="text-[26px]" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </SlideShell>
  );
}
