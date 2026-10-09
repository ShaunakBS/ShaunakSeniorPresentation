import { AnimatedSection } from '../components/AnimatedSection';
import { ImageSlot } from '../components/ImageGallery';
import { student, titleContent } from '../data/presentation';

export function TitleSlide() {
  const p = titleContent.portrait;
  return (
    <section className="absolute inset-0 grid grid-cols-[55fr_45fr]" aria-label="Title">
      <div className="flex flex-col justify-center pl-[120px] pr-[40px]">
        <AnimatedSection delay={0.05}>
          <div className="label mb-[40px]">{student.school}</div>
        </AnimatedSection>
        <AnimatedSection delay={0.15} y={22}>
          <h1 className="m-0 font-serif text-[132px] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            Shaunak
            <br />
            Bangalore
            <br />
            Shashikanth
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.35}>
          <div className="my-[44px] h-[3px] w-[200px] bg-accent" />
          <p className="m-0 font-serif text-[56px] italic text-ink">{student.title}</p>
        </AnimatedSection>
        <AnimatedSection delay={0.5}>
          <div className="m-0 mt-[48px] flex gap-[64px] text-[34px] font-medium">
            <p className="m-0">Student ID: {student.studentId}</p>
            <p className="m-0">Homeroom: {student.homeroom}</p>
          </div>
        </AnimatedSection>
      </div>

      {/* Portrait: 4:5, red frame. The label disappears automatically once a real photo is supplied. */}
      <div className="flex items-center justify-center pl-[20px] pr-[100px]">
        <AnimatedSection x={30} y={0} delay={0.2}>
          <div className="relative">
            <span className="absolute left-[18px] top-[18px] h-full w-full rounded-[6px] border border-accent/60" aria-hidden />
            <ImageSlot
              name={p.image}
              alt={p.alt}
              label={p.label}
              fit={p.fit}
              position={p.position}
              className="relative aspect-[4/5] h-[780px] !border-2 !border-accent"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
