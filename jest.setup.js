import React from 'react';
import 'mutationobserver-shim';

jest.mock('./app/components/Icon', () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

Object.defineProperty(document, 'getSelection', {
  value: () => {},
  writable: true,
});

Object.defineProperty(window, 'ResizeObserver', {
  value: class ResizeObserver {
    observe() {}

    unobserve() {}
  },
  writable: true,
});

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

jest.mock('react-tooltip/node_modules/uuid', () => ({
  v4: () => '00000000-0000-0000-0000-000000000000',
}));
