import { X } from 'lucide-react';
import { speakerNotes } from '../data/speakerNotes';
import { slideMeta } from '../data/presentation';

export function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function NoteBody({ index, large = false }: { index: number; large?: boolean }) {
  const note = speakerNotes[index];
  return (
    <div>
      {note.paragraphs.map((p, i) => (
        <p key={i} className={`m-0 mb-3 leading-relaxed ${large ? 'text-[26px]' : 'text-[17px]'} ${p.includes('[CONFIRM') ? 'rounded bg-accent-dark/60 px-2 py-1 text-white' : ''}`}>
          {p}
        </p>
      ))}
      {note.reference && (
        <div className="mb-3 rounded border border-line bg-paper px-3 py-2">
          <p className="m-0 mb-1 text-[14px] font-semibold uppercase tracking-[0.1em] text-accent-hover">Reference (do not read aloud)</p>
          {note.reference.map((r, i) => (
            <p key={i} className="m-0 text-[15px] text-muted">{r}</p>
          ))}
        </div>
      )}
      {note.confirm && (
        <p className="m-0 text-[15px] font-medium text-accent-hover">Needs your review: {note.confirm.join(' · ')}</p>
      )}
    </div>
  );
}

/** Private notes panel. Hidden by default; opened only with N or the toolbar button. */
export function SpeakerNotesPanel({ index, onClose }: { index: number; onClose: () => void }) {
  const meta = slideMeta[index];
  return (
    <aside
      aria-label="Speaker notes (private)"
      className="no-print fixed inset-x-0 bottom-0 z-[60] max-h-[45vh] overflow-auto border-t-2 border-accent bg-surface px-8 pb-20 pt-4 shadow-2xl"
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="m-0 text-[15px] font-semibold uppercase tracking-[0.12em] text-accent-hover">
          Private notes · Slide {index + 1}: {meta.label} · Target {fmt(meta.seconds)}
        </h2>
        <button type="button" onClick={onClose} aria-label="Close speaker notes" className="rounded p-2 hover:bg-line">
          <X size={18} />
        </button>
      </div>
      <NoteBody index={index} />
    </aside>
  );
}
