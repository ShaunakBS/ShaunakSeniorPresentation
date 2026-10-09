import { AnimatedSection } from '../components/AnimatedSection';
import { ResumeViewer } from '../components/ResumeViewer';
import { SlideShell } from '../components/SlideShell';
import { resumeContent } from '../data/presentation';

export function ResumeSlide() {
  return (
    <SlideShell title="Resume">
      <div className="grid h-full grid-cols-[590px_1fr] gap-[90px]">
        <AnimatedSection delay={0.1} x={-20} y={0} className="h-full">
          <ResumeViewer image={resumeContent.image} className="h-full" />
        </AnimatedSection>
        <div className="flex flex-col justify-center gap-[34px]">
          {resumeContent.highlights.map((h, i) => (
            <AnimatedSection key={h.title} delay={0.2 + i * 0.1}>
              <div className="flex gap-[28px] border-t border-line pt-[22px]">
                <span className="font-serif text-[44px] leading-none text-accent-hover">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="m-0 font-serif text-[42px] font-medium leading-tight">{h.title}</h2>
                  <p className="m-0 mt-2 text-[27px] leading-snug text-muted">{h.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
