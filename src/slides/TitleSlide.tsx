import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { student, titleContent } from '../data/presentation';

/** Cover: name set large on the left, full-height 4:5 portrait on the right (864 x 1080 px). */
export function TitleSlide() {
  const p = titleContent.portrait;
  return (
    <section className="absolute inset-0 grid grid-cols-[1056px_864px]" aria-label="Title">
      <div className="flex flex-col justify-center pl-[96px] pr-[32px]">
        <AnimatedSection delay={0.05}>
          <p className="m-0 mb-[32px] text-[34px] text-muted">{student.school}</p>
        </AnimatedSection>
        <AnimatedSection delay={0.15} y={16}>
          <h1 className="m-0 font-serif text-[156px] font-medium leading-[1] tracking-[-0.02em] text-ink">
            Shaunak
            <br />
            Bangalore
            <br />
            Shashikanth
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <div className="my-[48px] h-[3px] w-[120px] bg-accent" />
          <p className="m-0 font-serif text-[68px] text-ink">{student.title}</p>
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <div className="mt-[56px] flex gap-[56px] text-[40px] text-ink">
            <p className="m-0">Student ID: {student.studentId}</p>
            <p className="m-0">Homeroom: {student.homeroom}</p>
          </div>
        </AnimatedSection>
      </div>
      <AnimatedSection x={24} y={0} delay={0.2} className="h-full">
        <ImageSlot name={p.image} alt={p.alt} label={p.label} fit={p.fit} position={p.position} className="h-full w-full !rounded-none" />
      </AnimatedSection>
    </section>
  );
}
