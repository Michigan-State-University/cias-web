import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const useResizeObserver = ({
  onResize,
  handleWidth = true,
  handleHeight = true,
  skipOnMount = false,
  targetRef,
}) => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const resizeObserver = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const { current } = targetRef;
    if (current) {
      resizeObserver.current = new ResizeObserver(entries => {
        const element = entries[0];
        const {
          contentRect: { width: elWidth, height: elHeight },
        } = element;
        if (handleWidth) setWidth(elWidth);
        if (handleHeight) setHeight(elHeight);
        if (typeof onResize === 'function') {
          if (firstRender && skipOnMount) {
            return;
          }
          onResize(elWidth, elHeight);
        }
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
      if (handleWidth) setWidth(clientWidth);
      if (handleHeight) setHeight(clientHeight);
    }
  }, []);

  return { height, width };
};

export default useResizeObserver;
