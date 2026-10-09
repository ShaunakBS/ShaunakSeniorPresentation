import { slideComponents } from '../slides';
import { StaticContext } from './MotionContext';

/** All 12 slides stacked, one per 1920x1080 page, with no controls or notes. Used for PDF export and browser print. */
export function PrintView() {
  return (
    <StaticContext.Provider value={true}>
      <div className="print-root" data-ready="true">
        {slideComponents.map((Slide, i) => (
          <div key={i} className="print-page" data-slide={i + 1}>
            <Slide />
          </div>
        ))}
      </div>
    </StaticContext.Provider>
  );
}
