import { Touch, useCallback, useEffect, useState } from 'react';

export type GestureData = {
  timeoutId: NodeJS.Timeout;
  touches: Touch[];
};

export const useTapAndHold = (
  onGesture: () => void,
  fingers: number,
  timeoutMs: number,
  moveThresholdPx: number,
) => {
  const [gestureData, setGestureData] = useState<GestureData>();

  const stopGesture = useCallback(() => {
    if (gestureData) {
      clearTimeout(gestureData.timeoutId);
      setGestureData(undefined);
    }
  }, [gestureData]);

  const handleTouchStart = useCallback(
    ({ touches }: TouchEvent) => {
      if (touches.length !== fingers) {
        stopGesture();
        return;
      }

      const timeoutId = setTimeout(() => {
        onGesture();
      }, timeoutMs);

      setGestureData({
        timeoutId,
        touches: Array.from(touches),
      });
    },
    [gestureData, stopGesture, onGesture],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length !== fingers) return;
      if (!gestureData) return;

      const movedTouches = Array.from(event.touches);

      const anyTouchMovedMoreThanThreshold = movedTouches.some((movedTouch) => {
        const startTouch = gestureData.touches.find(
          ({ identifier }) => identifier === movedTouch.identifier,
        );
        if (!startTouch) return true;

        const distance = Math.sqrt(
          (startTouch.screenX - movedTouch.screenX) ** 2 +
            (startTouch.screenY - movedTouch.screenY) ** 2,
        );
        return distance > moveThresholdPx;
      });

      if (anyTouchMovedMoreThanThreshold) {
        stopGesture();
      }
    },
    [gestureData, stopGesture],
  );

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart as EventListener);
    document.addEventListener('touchend', stopGesture);
    document.addEventListener('touchmove', handleTouchMove as EventListener);

    return () => {
      document.removeEventListener(
        'touchstart',
        handleTouchStart as EventListener,
      );
      document.removeEventListener('touchend', stopGesture);
      document.removeEventListener(
        'touchmove',
        handleTouchMove as EventListener,
      );
    };
  }, [handleTouchStart, stopGesture, handleTouchMove]);
};
