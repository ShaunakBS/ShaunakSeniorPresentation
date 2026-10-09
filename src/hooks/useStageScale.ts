import { useEffect, useState } from 'react';

export const STAGE_W = 1920;
export const STAGE_H = 1080;

function calc() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.min(vw / STAGE_W, vh / STAGE_H);
  return { scale, left: (vw - STAGE_W * scale) / 2, top: (vh - STAGE_H * scale) / 2 };
}

/** Scale factor + offsets that fit the fixed 1920x1080 stage inside the browser window. */
export function useStageScale() {
  const [s, setS] = useState(calc);
  useEffect(() => {
    const onResize = () => setS(calc());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return s;
}
