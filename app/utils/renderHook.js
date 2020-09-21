import React from 'react';
import { render } from 'react-testing-library';

/**
 * @param  {function(): any} wrappedHook A hook wrapped in anonymous function `() => useHook(...args)`
 * @returns  {{data: object, component: RenderResult}} A hook result and rendered component
 */
export const renderHook = wrappedHook => {
  const data = {};

  const TestComponent = () => {
    Object.assign(data, wrappedHook());
    return null;
  };

  const component = render(<TestComponent />);
  return { data, component };
};
