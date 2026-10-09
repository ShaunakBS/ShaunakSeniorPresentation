import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { Card, Label, SlideShell } from '../components/SlideShell';
import { aboutContent } from '../data/presentation';
import { awards, leadership, type AccomplishmentGroup } from '../data/accomplishments';

function Group({ group, tight = false }: { group: AccomplishmentGroup; tight?: boolean }) {
  const hasRanks = group.items.some((i) => i.rank !== undefined);
  return (
    <Card className="px-[28px] py-[20px]">
      <h2 className="m-0 mb-[8px] border-b border-line pb-[8px] font-serif text-[32px] font-medium text-accent-hover">{group.title}</h2>
      <ul className="m-0 list-none p-0">
        {group.items.map((it) => (
          <li key={it.text} className={`flex items-baseline gap-4 leading-[1.2] ${tight ? 'py-[4px] text-[25px]' : 'py-[6px] text-[27px]'}`}>
            {hasRanks && (
              <span className={`w-[56px] shrink-0 rounded-[3px] py-[1px] text-center text-[19px] font-semibold text-white ${it.rank ? 'bg-accent' : ''}`}>{it.rank}</span>
            )}
            <span>
              <span className="font-medium">{it.text}</span>
              {it.detail && <span className="block text-[21px] text-muted">{it.detail}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function AboutMeSlide() {
  return (
    <SlideShell title="About Me">
      <div className="grid h-full grid-cols-[470px_610px_1fr] gap-[40px]">
        {/* Column 1: school timeline and activities */}
        <div className="flex flex-col gap-[26px]">
          <AnimatedSection delay={0.1}>
            <Label className="mb-3">School progression</Label>
            <ol className="relative m-0 list-none p-0">
              <div className="absolute bottom-[14px] left-[7px] top-[14px] w-px bg-line" aria-hidden />
              {aboutContent.timeline.map((t) => (
                <li key={t.grades} className="relative mb-[8px] pl-[36px]">
                  <span className="absolute left-0 top-[12px] h-[15px] w-[15px] rounded-full border-2 border-accent bg-paper" aria-hidden />
                  <div className="text-[17px] font-semibold uppercase tracking-[0.1em] text-accent-hover">{t.grades}</div>
                  <div className="text-[25px] leading-[1.2]">
                    {t.school}
                    {t.place && <span>, {t.place}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </AnimatedSection>
          <AnimatedSection delay={0.25}>
            <Label className="mb-3">{aboutContent.activitiesTitle}</Label>
            <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0">
              {aboutContent.activities.map((i) => (
                <li key={i} className="rounded-full border border-line bg-surface px-[16px] py-[5px] text-[20px]">
                  {i}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        {/* Column 2: leadership and awards */}
        <div className="flex flex-col gap-[22px]">
          <AnimatedSection delay={0.2}>
            <Group group={leadership} tight />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Group group={awards} tight />
          </AnimatedSection>
        </div>

        {/* Column 3: Family and Friends and photos */}
        <div className="flex min-h-0 flex-col">
          <AnimatedSection delay={0.25}>
            <h2 className="m-0 font-serif text-[36px] font-medium leading-tight">Family and Friends</h2>
            <p className="m-0 mb-[18px] mt-1 text-[22px] leading-snug text-muted">{aboutContent.familyAndFriends}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.35} className="min-h-0 flex-1">
            <div className="grid h-full grid-cols-2 grid-rows-2 gap-[16px]">
              {aboutContent.photos.map((ph) => (
                <ImageSlot key={ph.image} name={ph.image} alt={ph.alt} label={ph.label} caption={ph.label} fit={ph.fit} position={ph.position} className="h-full" />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </SlideShell>
  );
}
