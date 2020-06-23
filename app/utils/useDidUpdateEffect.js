import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (callback, dependencies) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, dependencies);
};

export default useDidUpdateEffect;
