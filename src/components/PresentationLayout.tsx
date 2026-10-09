import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { slideComponents } from '../slides';
import { slideMeta } from '../data/presentation';
import { TOTAL, useSlideNavigation } from '../hooks/useSlideNavigation';
import { STAGE_H, STAGE_W, useStageScale } from '../hooks/useStageScale';
import { PresentationControls } from './PresentationControls';
import { SlideIndex } from './SlideNavigation';
import { SlideProgress } from './SlideProgress';
import { SpeakerNotesPanel } from './SpeakerNotes';

/** Main presentation: fixed 1920x1080 stage scaled to the window, keyboard navigation, toolbar, overlays. */
export function PresentationLayout() {
  const { index, direction, go, next, prev } = useSlideNavigation(true);
  const { scale, left, top } = useStageScale();
  const reduced = !!useReducedMotion();
  const [indexOpen, setIndexOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const hideTimer = useRef<number | undefined>(undefined);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => undefined);
  }, []);

  const openPresenter = useCallback(() => {
    window.open('#/presenter', 'senior-presenter', 'width=1100,height=760');
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // Auto-hide the toolbar after 2.5 s of pointer inactivity.
  useEffect(() => {
    const show = () => {
      setToolbarVisible(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setToolbarVisible(false), 2500);
    };
    show();
    window.addEventListener('mousemove', show);
    window.addEventListener('touchstart', show);
    window.addEventListener('keydown', show);
    return () => {
      window.removeEventListener('mousemove', show);
      window.removeEventListener('touchstart', show);
      window.removeEventListener('keydown', show);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.body.dataset.overlay) return; // an overlay owns the keyboard (it handles Escape itself)
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case ' ':
          // Space on a focused button activates it; otherwise advance.
          if (t && t.tagName === 'BUTTON') return;
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          go(0);
          break;
        case 'End':
          e.preventDefault();
          go(TOTAL - 1);
          break;
        case 'Escape':
          setNotesOpen(false);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          setNotesOpen((o) => !o);
          break;
        case 'g':
        case 'G':
          setIndexOpen(true);
          break;
        case 'p':
        case 'P':
          openPresenter();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, toggleFullscreen, openPresenter]);

  const Slide = slideComponents[index];
  const dx = reduced ? 0 : 36 * direction;

  return (
    <div className="fixed inset-0 overflow-hidden bg-paper">
      <div className="sr-only" aria-live="polite">
        Slide {index + 1} of {TOTAL}: {slideMeta[index].label}
      </div>
      <div className="stage" style={{ left, top, transform: `scale(${scale})`, width: STAGE_W, height: STAGE_H }}>
        <AnimatePresence mode="wait" initial={false} custom={dx}>
          <motion.div
            key={index}
            className="absolute inset-0"
            custom={dx}
            initial={{ opacity: 0, x: dx }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dx / 2, transition: { duration: 0.14 } }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>

      <SlideProgress index={index} />
      <PresentationControls
        index={index}
        visible={toolbarVisible}
        fullscreen={fullscreen}
        notesOpen={notesOpen}
        onPrev={prev}
        onNext={next}
        onIndex={() => setIndexOpen(true)}
        onNotes={() => setNotesOpen((o) => !o)}
        onPresenter={openPresenter}
        onFullscreen={toggleFullscreen}
      />
      {notesOpen && <SpeakerNotesPanel index={index} onClose={() => setNotesOpen(false)} />}
      {indexOpen && <SlideIndex index={index} onSelect={go} onClose={() => setIndexOpen(false)} />}
    </div>
  );
}
