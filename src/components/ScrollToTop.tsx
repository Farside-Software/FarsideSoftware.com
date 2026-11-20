import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

/**
 * Shows past SHOW_AT and hides only back above HIDE_AT. The gap keeps small
 * scroll wobbles (iOS momentum and bounce, a reader nudging the page) from
 * fading the button in and out over and over.
 */
const SHOW_AT = 600;
const HIDE_AT = 250;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setIsVisible((visible) => (visible ? y > HIDE_AT : y > SHOW_AT));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          // Only the hover filter transitions in CSS; opacity and scale belong to
          // framer-motion, and a CSS transition on them makes the fade stutter.
          className="fixed bottom-8 right-6 z-50 p-3 rounded-full bg-signal text-night shadow-lg shadow-black/25 transition-[filter] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          aria-label="Scroll to top"
          type="button"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
