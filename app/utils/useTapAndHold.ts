import { Touch, useCallback, useEffect, useRef, useState } from 'react';

export type GestureData = {
  timeoutId: NodeJS.Timeout;
  touches: Touch[];
};

export const useTapAndHold = (
  onGesture: () => void,
  fingers: number,
  timeoutMs: number,
  moveThresholdPx: number,
  handleGlobally?: boolean,
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

  // use callback ref (https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)
  // to react to ref changes in useEffect without using a reference object in
  // the dependency array
  const ref = useRef<HTMLElement | null>(null);
  const [refChange, setRefChange] = useState(true);
  const refSetter = useCallback((element: HTMLElement | null) => {
    ref.current = element;
    setRefChange((value) => !value);
  }, []);

  useEffect(() => {
    const target = handleGlobally ? document : ref.current;

    if (!target) return;

    target.addEventListener('touchstart', handleTouchStart as EventListener);
    target.addEventListener('touchend', stopGesture);
    target.addEventListener('touchmove', handleTouchMove as EventListener);

    return () => {
      target.removeEventListener(
        'touchstart',
        handleTouchStart as EventListener,
      );
      target.removeEventListener('touchend', stopGesture);
      target.removeEventListener('touchmove', handleTouchMove as EventListener);
    };
  }, [
    handleTouchStart,
    stopGesture,
    handleTouchMove,
    refChange,
    handleGlobally,
  ]);

  // TODO use when implementing https://htdevelopers.atlassian.net/browse/CIAS30-2307
  return { ref: refSetter };
};
