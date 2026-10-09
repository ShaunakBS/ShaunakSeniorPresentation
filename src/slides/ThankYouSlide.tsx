import { AnimatedSection } from '../components/AnimatedSection';
import { student, thanksContent } from '../data/presentation';

// Nothing here is absolutely positioned INSIDE an AnimatedSection. An animating wrapper has a CSS transform,
// which makes it the containing block for absolute children; when the animation ends the transform is removed and
// such a child jumps to a new position. The name line below is a direct child of the section and is not animated.
export function ThankYouSlide() {
  return (
    <section className="absolute inset-0 flex flex-col items-center justify-center text-center" aria-label="Thank you">
      <AnimatedSection delay={0.1} y={16}>
        <h1 className="m-0 font-serif text-[150px] font-medium leading-none tracking-[-0.02em]">{thanksContent.heading}</h1>
      </AnimatedSection>
      <AnimatedSection delay={0.25}>
        <div className="mx-auto my-[48px] h-[3px] w-[96px] bg-accent" />
        <p className="m-0 font-serif text-[64px] text-muted">{thanksContent.sub}</p>
      </AnimatedSection>
      <p className="absolute bottom-[110px] left-0 right-0 m-0 text-[22px] text-muted">{student.name}</p>
    </section>
  );
}
