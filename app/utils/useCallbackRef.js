import { useCallback, useRef, useState } from 'react';

/**
 * @param {function(node: HTMLElement): null|object} callback
 * @returns {{ref: React.MutableRefObject,
 * callbackRef: function(React.MutableRefObject),
 * callbackResult: null|object}}
 */
export const useCallbackRef = callback => {
  const ref = useRef(null);
  const [callbackResult, setCallbackResult] = useState(null);

  const callbackRef = useCallback(node => {
    ref.current = node;
    setCallbackResult(callback(node));
  }, []);

  return { ref, callbackRef, callbackResult };
};
