import { useEffect } from 'react';
import { X } from 'lucide-react';
import { slideMeta } from '../data/presentation';

interface Props {
  index: number;
  onSelect: (i: number) => void;
  onClose: () => void;
}

/** Clickable slide index overlay. */
export function SlideIndex({ index, onSelect, onClose }: Props) {
  useEffect(() => {
    document.body.dataset.overlay = '1';
    return () => {
      delete document.body.dataset.overlay;
    };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Slide index" className="no-print fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-6" onClick={onClose}>
      <div className="w-full max-w-[760px] rounded-[8px] border border-line bg-surface p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="m-0 font-serif text-2xl font-medium">Slides</h2>
          <button type="button" onClick={onClose} aria-label="Close slide index" className="rounded p-2 hover:bg-accent">
            <X size={20} />
          </button>
        </div>
        <ol className="m-0 grid list-none grid-cols-1 gap-1 p-0 sm:grid-cols-2">
          {slideMeta.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                autoFocus={i === index}
                onClick={() => {
                  onSelect(i);
                  onClose();
                }}
                aria-current={i === index ? 'true' : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[17px] hover:bg-line ${i === index ? 'bg-accent font-semibold text-white' : ''}`}
              >
                <span className="w-7 text-right tabular-nums opacity-80">{i + 1}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
