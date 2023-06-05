import isEqual from 'lodash/isEqual';
import { useEffect, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';

const useDeepObjectMemo = <T>(obj: T) => {
  const ref = useRef<T>();
  ref.current = obj;

  useEffect(() => {
    if (!isEqual(obj, ref.current)) {
      ref.current = cloneDeep(obj);
    }
  }, [obj]);

  return ref.current;
};

export default useDeepObjectMemo;
