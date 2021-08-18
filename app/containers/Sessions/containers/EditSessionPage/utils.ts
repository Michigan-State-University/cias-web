import { createContext, useEffect } from 'react';

import { elements } from 'theme';

type ContextType = {
  sessionId: string | null;
  interventionId: string | null;
};

export const useLockEditSessionPageScroll = (): void => {
  useEffect(() => {
    const mainContainer = document.querySelector('#main-app-container');
    const body = document.querySelector('body');
    if (!mainContainer || !body) return;
    // @ts-ignore
    mainContainer.style.height = `calc(100vh - ${elements.navbarHeight}px)`;
    body.style.removeProperty('overflow');
    return () => {
      // @ts-ignore
      mainContainer.style.height = `calc(100% - ${elements.navbarHeight}px)`;
      body.style.overflow = 'auto';
    };
  }, []);
};

export const EditSessionPageContext = createContext({
  sessionId: null,
  interventionId: null,
} as ContextType);
