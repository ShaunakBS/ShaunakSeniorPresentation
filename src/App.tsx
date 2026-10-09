import { MotionConfig } from 'framer-motion';
import { PresentationLayout } from './components/PresentationLayout';
import { PresenterView } from './components/PresenterView';
import { PrintView } from './components/PrintView';
import { useRoute } from './hooks/useSlideNavigation';

export default function App() {
  const route = useRoute();
  return (
    <MotionConfig reducedMotion="user">
      {route.kind === 'print' ? <PrintView /> : route.kind === 'presenter' ? <PresenterView /> : <PresentationLayout />}
    </MotionConfig>
  );
}
