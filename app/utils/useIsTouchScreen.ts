import { useMemo } from 'react';

export const useIsTouchScreen = () =>
  useMemo(
    () =>
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0,
    [],
  );
