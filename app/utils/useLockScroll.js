import { useEffect, useRef } from 'react';

const useBodyLockScroll = (shouldLock) => {
  const scrollPosition = useRef(0);
  const html = useRef(null);

  const enableScrollLock = () => {
    html.current = document.querySelector('html');
    scrollPosition.current = window.pageYOffset;
    if (html.current) {
      html.current.style.overflow = 'hidden';
      html.current.style.position = 'fixed';
      html.current.style.top = `-${scrollPosition}px`;
      html.current.style.width = '100%';
    }
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

export const useElementLockScroll = (shouldLock, elementId) => {
  const html = useRef(null);

  const enableScrollLock = () => {
    html.current = document.getElementById(elementId);
    if (html.current) {
      html.current.style.overflow = 'hidden';
    }
  };

  const disableScrollLock = () => {
    if (html.current) {
      html.current.style.removeProperty('overflow');
    }
  };

  useEffect(() => {
    if (shouldLock) enableScrollLock();
    return () => {
      disableScrollLock();
    };
  }, [shouldLock]);
};

export default useBodyLockScroll;
