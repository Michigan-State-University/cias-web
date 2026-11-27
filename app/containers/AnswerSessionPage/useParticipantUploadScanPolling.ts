import { useEffect, useRef, useState } from 'react';

export const FIRST_POLL_DELAY = 3_000;
export const FAST_POLL_INTERVAL = 5_000;
export const FAST_POLL_PHASE = 30_000;
export const STEADY_POLL_INTERVAL = 15_000;

export const SLOW_SCAN_THRESHOLD = 120_000;
export const SLOW_POLL_INTERVAL = 30_000;

export const pollDelayForElapsed = (elapsed: number): number => {
  if (elapsed === 0) return FIRST_POLL_DELAY;
  if (elapsed < FAST_POLL_PHASE) return FAST_POLL_INTERVAL;
  if (elapsed < SLOW_SCAN_THRESHOLD) return STEADY_POLL_INTERVAL;
  return SLOW_POLL_INTERVAL;
};

export const useParticipantUploadScanPolling = (
  hasPendingUpload: boolean,
  refresh: () => void,
) => {
  const [scanTakingLong, setScanTakingLong] = useState(false);

  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;

  useEffect(() => {
    if (!hasPendingUpload) {
      setScanTakingLong(false);
      return undefined;
    }

    const startedAt = Date.now();
    let timeoutId: ReturnType<typeof setTimeout>;

    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') refreshRef.current();
    };

    const scheduleNext = () => {
      const elapsed = Date.now() - startedAt;
      setScanTakingLong(elapsed >= SLOW_SCAN_THRESHOLD);

      timeoutId = setTimeout(() => {
        refreshIfVisible();
        scheduleNext();
      }, pollDelayForElapsed(elapsed));
    };

    scheduleNext();
    document.addEventListener('visibilitychange', refreshIfVisible);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', refreshIfVisible);
    };
  }, [hasPendingUpload]);

  return scanTakingLong;
};
