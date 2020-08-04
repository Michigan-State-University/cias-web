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
