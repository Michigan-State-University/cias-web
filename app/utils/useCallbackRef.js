import React, { useCallback, useRef, useState } from 'react';

/**
 * @param {function(node: HTMLElement): null|object} callback
 * @param {any[]} deps
 * @returns {{ref: React.MutableRefObject,
 * callbackRef: function(React.MutableRefObject),
 * callbackResult: null|object}}
 */
export const useCallbackRef = (callback, deps = []) => {
  const ref = useRef(null);
  const [callbackResult, setCallbackResult] = useState(null);

  const callbackRef = useCallback(
    (node) => {
      ref.current = node;
      setCallbackResult(callback(node));
    },
    [...deps],
  );

  return { ref, callbackRef, callbackResult };
};
