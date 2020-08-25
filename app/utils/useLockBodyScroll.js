import { useEffect, useRef } from 'react';

const useLockBodyScroll = shouldLock => {
  const scrollPosition = useRef(0);
  const html = useRef(null);

  const enableScrollLock = () => {
    html.current = document.querySelector('html');
    scrollPosition.current = window.pageYOffset;
    html.current.style.overflow = 'hidden';
    html.current.style.position = 'fixed';
    html.current.style.top = `-${scrollPosition}px`;
    html.current.style.width = '100%';
  };

  const disableScrollLock = () => {
    if (html.current) {
      html.current.style.removeProperty('overflow');
      html.current.style.removeProperty('position');
      html.current.style.removeProperty('top');
      html.current.style.removeProperty('width');
      window.scrollTo(0, scrollPosition.current);
    }
  };

  useEffect(() => {
    if (shouldLock) enableScrollLock();
    return () => {
      disableScrollLock();
    };
  }, [shouldLock]);
};

export default useLockBodyScroll;
