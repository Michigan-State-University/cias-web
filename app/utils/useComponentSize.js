/* eslint-disable */
const React = require('react');
const { useState } = React;
const { useCallback } = React;
const { useLayoutEffect } = React;

/*
 * THIS IS A LIBRARY @rehooks/component-size
 * github: https://github.com/rehooks/component-size
 * imported locally to reduce dependency size (simple hook)
 */

const getSize = el => {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

const useComponentSize = ref => {
  const _useState = useState(getSize(ref ? ref.current : {}));
  const ComponentSize = _useState[0];
  const setComponentSize = _useState[1];

  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setComponentSize(getSize(ref.current));
      }
    },
    [ref],
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.unobserve(ref.current);
        resizeObserver = null;
      };
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);

  return ComponentSize;
};

export default useComponentSize;
