import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';
import { publicUrl } from '../assets';

interface Props {
  image: string;
  className?: string;
}

/** Resume preview with an expand button that opens a full-screen, scrollable reader. */
export function ResumeViewer({ image, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const src = publicUrl(image);

  useEffect(() => {
    if (!open) return;
    document.body.dataset.overlay = '1';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      delete document.body.dataset.overlay;
    };
  }, [open]);

  return (
    <>
      <div className={`relative ${className}`}>
        <img
          src={src}
          alt="Shaunak's current resume: experience, engineering projects, awards, skills, and goals"
          className="absolute inset-0 h-full w-full rounded-[6px] border border-line bg-white object-contain object-top shadow-card"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="no-print absolute bottom-4 right-4 flex items-center gap-2 rounded-[6px] bg-accent px-5 py-3 text-[20px] font-medium text-white shadow-card hover:bg-accent-hover"
        >
          <Maximize2 size={20} aria-hidden /> Expand resume
        </button>
      </div>
      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label="Resume" className="no-print fixed inset-0 z-[100] flex flex-col bg-black/90">
            <div className="flex items-center justify-between px-6 py-3 text-white">
              <span className="text-lg font-medium">Resume. Scroll to read, Esc to close.</span>
              <button type="button" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md bg-white/15 px-4 py-2 hover:bg-white/25" autoFocus>
                <X size={18} aria-hidden /> Close
              </button>
            </div>
            <div className="flex-1 overflow-auto px-4 pb-6">
              <img src={src} alt="Resume, full size" className="mx-auto block h-auto w-full max-w-[1100px] rounded-md bg-white" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
