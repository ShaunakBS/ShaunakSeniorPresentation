import { TOTAL } from '../hooks/useSlideNavigation';

/** Thin progress bar fixed to the top edge. */
export function SlideProgress({ index }: { index: number }) {
  const pct = ((index + 1) / TOTAL) * 100;
  return (
    <div
      className="no-print fixed left-0 right-0 top-0 z-40 h-[3px] bg-line"
      role="progressbar"
      aria-label="Presentation progress"
      aria-valuemin={1}
      aria-valuemax={TOTAL}
      aria-valuenow={index + 1}
    >
      <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
