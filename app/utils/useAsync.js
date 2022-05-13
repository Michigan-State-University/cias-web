import { useEffect } from 'react';

const defaultOptions = { deps: [], conditions: [], cleanUpFunction: null };

/**
 * @param {function(): any} asyncFunction
 * @param {function(resultFromAsyncFunction: any): void} onSuccess
 * @param {{deps: [any], conditions: [any], cleanUpFunction: function(): void}} options
 */
export const useAsync = (asyncFunction, onSuccess, options) => {
  const { deps, conditions, cleanUpFunction } = {
    ...defaultOptions,
    ...options,
  };

  useEffect(() => {
    let isMounted = true;

    if (conditions.every((condition) => condition))
      asyncFunction().then((data) => isMounted && onSuccess(data));

    return () => {
      isMounted = false;

      if (cleanUpFunction) cleanUpFunction();
    };
  }, deps);
};
