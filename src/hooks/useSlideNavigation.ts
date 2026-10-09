import { useCallback, useEffect, useRef, useState } from 'react';
import { slideMeta } from '../data/presentation';

export const TOTAL = slideMeta.length;
export type Route = { kind: 'slide'; index: number } | { kind: 'print' } | { kind: 'presenter' };

export function parseHash(hash: string): Route {
  if (hash.startsWith('#/print')) return { kind: 'print' };
  if (hash.startsWith('#/presenter')) return { kind: 'presenter' };
  const m = hash.match(/^#\/slide\/(\d+)/);
  const n = m ? parseInt(m[1], 10) : 1;
  const index = Number.isFinite(n) ? Math.min(Math.max(n, 1), TOTAL) - 1 : 0;
  return { kind: 'slide', index };
}

const CHANNEL = 'senior-presentation-sync';

/** Slide index state, kept in sync with the URL hash (#/slide/N) and with other windows (presenter view). */
export function useSlideNavigation(writeHash: boolean) {
  const [index, setIndex] = useState(() => {
    const r = parseHash(window.location.hash);
    return r.kind === 'slide' ? r.index : 0;
  });
  const [direction, setDirection] = useState(1);
  const indexRef = useRef(index);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const apply = useCallback(
    (next: number, broadcast: boolean) => {
      const clamped = Math.min(Math.max(next, 0), TOTAL - 1);
      if (clamped === indexRef.current) return;
      setDirection(clamped > indexRef.current ? 1 : -1);
      indexRef.current = clamped;
      setIndex(clamped);
      if (writeHash) window.history.replaceState(null, '', `#/slide/${clamped + 1}`);
      if (broadcast) channelRef.current?.postMessage({ type: 'goto', index: clamped });
    },
    [writeHash],
  );

  useEffect(() => {
    if (writeHash) window.history.replaceState(null, '', `#/slide/${indexRef.current + 1}`);
    const onHash = () => {
      const r = parseHash(window.location.hash);
      if (r.kind === 'slide') apply(r.index, true);
    };
    window.addEventListener('hashchange', onHash);
    let ch: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      ch = new BroadcastChannel(CHANNEL);
      channelRef.current = ch;
      ch.onmessage = (e) => {
        if (e.data?.type === 'goto') apply(e.data.index, false);
        if (e.data?.type === 'hello' && writeHash) ch?.postMessage({ type: 'goto', index: indexRef.current });
      };
      if (!writeHash) ch.postMessage({ type: 'hello' });
    }
    return () => {
      window.removeEventListener('hashchange', onHash);
      ch?.close();
      channelRef.current = null;
    };
  }, [apply, writeHash]);

  const go = useCallback((n: number) => apply(n, true), [apply]);
  const next = useCallback(() => apply(indexRef.current + 1, true), [apply]);
  const prev = useCallback(() => apply(indexRef.current - 1, true), [apply]);
  return { index, direction, go, next, prev };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onHash = () =>
      setRoute((old) => {
        const r = parseHash(window.location.hash);
        // Slide changes are handled by useSlideNavigation; only switch views here.
        return r.kind === old.kind ? old : r;
      });
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}
