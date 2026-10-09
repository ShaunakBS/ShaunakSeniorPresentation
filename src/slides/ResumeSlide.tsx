import { AnimatedSection } from '../components/AnimatedSection';
import { ResumeViewer } from '../components/ResumeViewer';
import { SlideShell } from '../components/SlideShell';
import { resumeContent } from '../data/presentation';

/** The resume fills the full content height (it is a portrait page, so about 600 px wide). Headings fill the rest. */
export function ResumeSlide() {
  return (
    <SlideShell title="Resume">
      <div className="grid h-full grid-cols-[600px_1fr]">
        <AnimatedSection delay={0.1} y={0} className="h-full">
          <ResumeViewer image={resumeContent.image} className="h-full" />
        </AnimatedSection>
        <div className="flex h-full flex-col border-l border-line ml-[56px] pl-[56px]">
          {resumeContent.highlights.map((h, i) => (
            <AnimatedSection key={h.title} delay={0.2 + i * 0.08} className="flex-1">
              <div className={`flex h-full flex-col justify-center ${i > 0 ? 'rule' : ''}`}>
                <h2 className="m-0 font-serif text-[60px] font-medium leading-[1.1]">{h.title}</h2>
                <p className="m-0 mt-[12px] text-[38px] leading-[1.25] text-muted">{h.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
