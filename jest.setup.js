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

Object.defineProperty(document, 'execCommand', { value: jest.fn() });

jest.mock('copy-to-clipboard', () => jest.fn());

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
