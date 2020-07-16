import 'mutationobserver-shim';

Object.defineProperty(document, 'getSelection', {
  value: () => {},
  writable: true,
});
