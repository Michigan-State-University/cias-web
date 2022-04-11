import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = ({ onResize, skipOnMount = false, targetRef }) => {
  const [size, setSize] = useState({ width: null, height: null });
  const resizeObserver = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const { current } = targetRef;

    if (current) {
      resizeObserver.current = new ResizeObserver((entries) => {
        requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }

          const element = entries[0];
          const {
            contentRect: { width, height },
          } = element;

          setSize({ width, height });
          if (typeof onResize === 'function') {
            if (firstRender && skipOnMount) return;

            onResize(width, height);
          }
        });
      });

      resizeObserver.current.observe(current);
    }
    return () => {
      if (resizeObserver.current) resizeObserver.current.unobserve(current);
    };
  }, []);

  useLayoutEffect(() => {
    const { current } = targetRef;

    if (current) {
      const { clientHeight, clientWidth } = current;

      setSize({ width: clientWidth, height: clientHeight });
    }
  }, []);

  return size;
};

export default useResizeObserver;
