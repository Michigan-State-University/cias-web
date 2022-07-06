import { CSSProperties } from 'react';

import keys from 'lodash/keys';
import toPairs from 'lodash/toPairsIn';
import kebabCase from 'lodash/kebabCase';

export const applyStyle = (
  element: HTMLElement,
  style: Partial<CSSProperties>,
) => {
  const initialStyle = { ...element.style } as Partial<CSSProperties>;

  setStyleProperties(element.style, style);

  return () => {
    keys(style).forEach((key) => {
      element.style.removeProperty(kebabCase(key));
    });

    setStyleProperties(element.style, initialStyle);
  };
};

const setStyleProperties = (
  elementStyle: CSSStyleDeclaration,
  style: Partial<CSSProperties>,
) => {
  toPairs(style).forEach(([key, value]) => {
    elementStyle.setProperty(kebabCase(key), value as string);
  });
};
