import { useEffect } from 'react';

import { elements } from 'theme';

export const useLockEditSessionPageScroll = () => {
  useEffect(() => {
    const mainContainer = document.querySelector('#main-app-container');
    const body = document.querySelector('body');
    mainContainer.style.height = `calc(100vh - ${elements.navbarHeight}px)`;
    body.style.removeProperty('overflow');
    return () => {
      mainContainer.style.height = `calc(100% - ${elements.navbarHeight}px)`;
      body.style.overflow = 'auto';
    };
  }, []);
};
