import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { SlideShell } from '../components/SlideShell';
import { aboutContent } from '../data/presentation';
import { awards, leadership, type AccomplishmentGroup } from '../data/accomplishments';

/** Leadership / awards: plain rows. Ranks are set in red text, not badges. */
function Rows({ group }: { group: AccomplishmentGroup }) {
  const hasRanks = group.items.some((i) => i.rank !== undefined);
  return (
    <div>
      <h2 className="t-h3 m-0 mb-[12px]">{group.title}</h2>
      <ul className="m-0 list-none p-0">
        {group.items.map((it) => (
          <li key={it.text} className={`flex items-baseline gap-[14px] ${it.detail ? 'py-[7px]' : 'py-[5px]'}`}>
            {hasRanks && <span className="w-[54px] shrink-0 text-[26px] font-medium text-accent-hover">{it.rank}</span>}
            <span>
              <span className="block text-[27px] leading-[1.2] text-ink">{it.text}</span>
              {it.detail && <span className="block text-[22px] leading-[1.3] text-muted">{it.detail}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutMeSlide() {
  const last = aboutContent.timeline.length - 1;
  return (
    <SlideShell title="About Me">
      <div className="grid h-full grid-cols-[500px_590px_1fr]">
        {/* School and activities */}
        <div className="flex flex-col justify-between pr-[40px]">
          <AnimatedSection delay={0.1}>
            <h2 className="t-h3 m-0 mb-[24px]">School progression</h2>
            <ol className="relative m-0 list-none p-0">
              <div className="absolute bottom-[14px] left-[6px] top-[14px] w-px bg-line" aria-hidden />
              {aboutContent.timeline.map((t, i) => (
                <li key={t.grades} className="relative pb-[22px] pl-[34px] last:pb-0">
                  <span className={`absolute left-0 top-[12px] h-[13px] w-[13px] rounded-full ${i === last ? 'bg-accent' : 'border border-muted bg-paper'}`} aria-hidden />
                  <p className="m-0 text-[22px] leading-[1.3] text-muted">{t.grades}</p>
                  <p className="m-0 text-[27px] leading-[1.25] text-ink">
                    {t.school}
                    {t.place && `, ${t.place}`}
                  </p>
                </li>
              ))}
            </ol>
          </AnimatedSection>
          <AnimatedSection delay={0.25} className="rule pt-[24px]">
            <h2 className="t-h3 m-0 mb-[12px]">{aboutContent.activitiesTitle}</h2>
            <p className="m-0 text-[25px] leading-[1.5] text-muted">{aboutContent.activities.join(' · ')}</p>
          </AnimatedSection>
        </div>

        {/* Leadership and awards */}
        <div className="flex flex-col justify-between border-l border-line px-[40px]">
          <AnimatedSection delay={0.2}>
            <Rows group={leadership} />
          </AnimatedSection>
          <AnimatedSection delay={0.3} className="rule pt-[20px]">
            <Rows group={awards} />
          </AnimatedSection>
        </div>

        {/* Family and Friends */}
        <div className="flex min-h-0 flex-col border-l border-line pl-[40px]">
          <AnimatedSection delay={0.25}>
            <h2 className="t-h3 m-0">Family and Friends</h2>
            <p className="m-0 mb-[20px] mt-[4px] text-[24px] text-muted">{aboutContent.familyAndFriends}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.35} className="min-h-0 flex-1">
            <div className="grid h-full grid-cols-2 grid-rows-2 gap-[14px]">
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
