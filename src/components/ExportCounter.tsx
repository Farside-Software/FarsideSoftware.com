import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { accentText } from '../theme/contrast';
import { useExportCount } from '../hooks/useExportCount';

/**
 * Near-real-time count of light shows exported from Maestro, polled from the
 * Cloudflare Worker every 30 seconds and rolled up with a count animation.
 * Renders a quiet em dash until the first successful fetch, and keeps the
 * last-known number if a poll fails - the counter never goes backwards or
 * blanks out mid-visit.
 */
export default function ExportCounter({ accentColor }: { accentColor: string }) {
  const target = useExportCount();
  const [displayed, setDisplayed] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Roll the displayed number toward the target over ~1s.
  useEffect(() => {
    if (target === null) return;
    const from = displayed ?? Math.max(0, target - 40);
    if (from === target) {
      setDisplayed(target);
      return;
    }
    const start = performance.now();
    const duration = 1000;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(from + (target - from) * eased));
      if (t < 1) animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
      aria-live="polite"
    >
      <div
        className="font-mono text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight tabular-nums"
        style={{ color: accentText(accentColor) }}
      >
        {displayed === null ? '—' : displayed.toLocaleString()}
      </div>
      <p className="mt-3 text-lg sm:text-xl text-muted">
        light shows exported and counting
      </p>
      <p className="mt-1 text-xs text-muted/70">
        Live from Maestro users everywhere · updates every 30 seconds
      </p>
    </motion.div>
  );
}
