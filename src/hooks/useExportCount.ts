import { useEffect, useState } from 'react';

/** Where the Maestro counter Worker lives (see workers/maestro-counter). */
const COUNT_URL = 'https://api.molargiksoftware.com/maestro/count';
const POLL_MS = 30_000;

/**
 * Near-real-time count of light shows exported from Maestro, polled from the
 * Cloudflare Worker every 30 seconds. `null` until the first successful
 * fetch; after that it keeps the last-known number if a poll fails and never
 * goes backwards.
 */
export function useExportCount(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      try {
        const res = await fetch(COUNT_URL, { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { count?: number };
        if (!cancelled && typeof data.count === 'number' && data.count >= 0) {
          setCount((prev) => (prev === null || data.count! > prev ? data.count! : prev));
        }
      } catch {
        // Offline or Worker unreachable: keep whatever we last showed.
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return count;
}
