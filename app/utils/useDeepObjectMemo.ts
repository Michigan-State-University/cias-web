import { useRef } from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

const useDeepObjectMemo = <T>(obj: T) => {
  const ref = useRef<T>(cloneDeep(obj));

  if (!isEqual(obj, ref.current)) {
    ref.current = cloneDeep(obj);
  }

  return ref.current;
};

export default useDeepObjectMemo;
