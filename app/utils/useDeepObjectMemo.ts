import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';

const useDeepObjectMemo = <T>(obj: T) => {
  const [objState, setObjectState] = useState(obj);

  useEffect(() => {
    if (!isEqual(obj, objState)) {
      setObjectState(obj);
    }
  }, [obj]);

  return objState;
};

export default useDeepObjectMemo;
