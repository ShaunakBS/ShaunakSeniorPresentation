import { useEffect, useState } from 'react';
import { useSlideNavigation, TOTAL } from '../hooks/useSlideNavigation';
import { slideMeta } from '../data/presentation';
import { speakerNotes } from '../data/speakerNotes';
import { NoteBody, fmt } from './SpeakerNotes';

const TARGET = speakerNotes.reduce((a, n) => a + n.seconds, 0);

/** Private presenter window (#/presenter). Open it on the laptop screen; project the main window. Syncs via BroadcastChannel. */
export function PresenterView() {
  const { index, next, prev, go } = useSlideNavigation(false);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next(); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(TOTAL - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go]);

  const meta = slideMeta[index];
  const nextMeta = slideMeta[index + 1];
  const planned = speakerNotes.slice(0, index).reduce((a, n) => a + n.seconds, 0);
  const pace = elapsed - planned;

  return (
    <div className="flex h-full flex-col bg-paper p-6 text-ink" style={{ overflow: 'auto' }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="label">Presenter view · private</div>
          <h1 className="m-0 font-serif text-[40px] font-medium">{index + 1}. {meta.label}</h1>
          <div className="text-[18px] text-muted">Next: {nextMeta ? nextMeta.label : 'End of presentation'}</div>
        </div>
        <div className="text-right">
          <div className="font-serif text-[56px] tabular-nums leading-none">{fmt(elapsed)}</div>
          <div className="text-[16px] text-muted">Target {fmt(TARGET)} · Slide target {fmt(meta.seconds)}</div>
          {running && elapsed > 0 && (
            <div className="text-[16px] font-medium">{pace > 15 ? `${fmt(pace)} behind plan` : pace < -15 ? `${fmt(-pace)} ahead of plan` : 'On pace'}</div>
          )}
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" className="rounded bg-accent px-3 py-1 text-white" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start timer'}</button>
            <button type="button" className="rounded border border-line px-3 py-1" onClick={() => { setElapsed(0); setRunning(false); }}>Reset</button>
          </div>
        </div>
      </div>
      <div className="flex-1"><NoteBody index={index} large /></div>
      <div className="mt-4 flex gap-3">
        <button type="button" className="rounded bg-line px-5 py-3 text-white disabled:opacity-40" onClick={prev} disabled={index === 0}>Previous</button>
        <button type="button" className="rounded bg-accent px-5 py-3 text-white disabled:opacity-40" onClick={next} disabled={index === TOTAL - 1}>Next</button>
      </div>
    </div>
  );
}
