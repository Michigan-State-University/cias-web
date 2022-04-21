/* eslint-disable global-require,react/prop-types,no-console */
import React from 'react';
import 'mutationobserver-shim';
import 'jest-styled-components';

jest.mock('./app/components/Icon', () => ({
  __esModule: true,
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

jest.mock('resize-observer-lite', () => ({
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

jest.mock('uuid', () => ({
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

class AudioMock {
  addEventListener = jest.fn();

  removeEventListener = jest.fn();

  play = jest.fn().mockImplementation(() => {
    if (this.onPlayHandler) this.onPlayHandler();

    return Promise.resolve();
  });

  pause = jest.fn();

  load = jest.fn();
}
Object.defineProperty(global, 'Audio', { value: () => new AudioMock() });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear = jest.fn().mockImplementation(() => {
    this.store = {};
  });

  getItem = jest.fn().mockImplementation((key) => this.store[key] || null);

  setItem = jest.fn().mockImplementation((key, value) => {
    this.store[key] = value;
  });

  removeItem = jest.fn().mockImplementation((key) => {
    delete this.store[key];
  });
}
Object.defineProperty(global, 'localStorage', {
  value: new LocalStorageMock(),
});

// mock react-player to be loaded synchronously during tests (React.lazy not supported)
jest.mock('react-player/lazy', () => require('react-player'));

// mock globally to make sure real request is not sent in any test
jest.mock('utils/useUrlMetadata', () => ({
  useUrlMetadata: jest.fn().mockImplementation(() => ({
    metadata: null,
    error: null,
    isFetching: false,
  })),
}));

// make all useEffect synchronous in tests, otherwise test bugs occur
jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);
