import { ChevronLeft, ChevronRight, ListOrdered, Maximize, Minimize, MonitorUp, NotebookText, Printer } from 'lucide-react';
import { TOTAL } from '../hooks/useSlideNavigation';

interface Props {
  index: number;
  visible: boolean;
  fullscreen: boolean;
  notesOpen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onIndex: () => void;
  onNotes: () => void;
  onPresenter: () => void;
  onFullscreen: () => void;
}

const btn =
  'flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-accent disabled:opacity-35 disabled:hover:bg-transparent';

/** Discreet toolbar. Fades out when the pointer is idle so it never covers the projected slide. */
export function PresentationControls(p: Props) {
  return (
    <div
      className={`no-print fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-accent-light/95 px-3 py-1.5 shadow-lg transition-opacity duration-300 focus-within:opacity-100 ${p.visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      role="toolbar"
      aria-label="Presentation controls"
    >
      <button type="button" className={btn} onClick={p.onPrev} disabled={p.index === 0} aria-label="Previous slide" title="Previous (←)">
        <ChevronLeft size={22} />
      </button>
      <button type="button" onClick={p.onIndex} className="rounded-md px-3 py-1.5 text-[15px] tabular-nums text-ink hover:bg-accent" aria-label="Open slide index" title="Slide index (G)">
        {p.index + 1} / {TOTAL}
      </button>
      <button type="button" className={btn} onClick={p.onNext} disabled={p.index === TOTAL - 1} aria-label="Next slide" title="Next (→ or Space)">
        <ChevronRight size={22} />
      </button>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <button type="button" className={btn} onClick={p.onIndex} aria-label="Slide index" title="Slide index (G)">
        <ListOrdered size={20} />
      </button>
      <button type="button" className={`${btn} ${p.notesOpen ? 'bg-accent' : ''}`} onClick={p.onNotes} aria-pressed={p.notesOpen} aria-label="Toggle speaker notes" title="Speaker notes (N)">
        <NotebookText size={20} />
      </button>
      <button type="button" className={btn} onClick={p.onPresenter} aria-label="Open presenter view in a new window" title="Presenter view (P)">
        <MonitorUp size={20} />
      </button>
      <button type="button" className={btn} onClick={() => window.open('#/print', '_blank')} aria-label="Open printable version" title="Printable version">
        <Printer size={20} />
      </button>
      <button type="button" className={btn} onClick={p.onFullscreen} aria-label={p.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title="Fullscreen (F)">
        {p.fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>
    </div>
  );
}
