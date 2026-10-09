import { createContext, useContext } from 'react';

/** True when rendering the print/PDF view: animations are skipped so every slide renders in its final state. */
export const StaticContext = createContext(false);
export const useStatic = () => useContext(StaticContext);
