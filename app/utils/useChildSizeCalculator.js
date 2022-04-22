import { useEffect, useState } from 'react';

import sumBy from 'lodash/sumBy';

const initialSize = { width: 0, height: 0 };

/**
 *
 * @param {React.MutableRefObject} containerRef
 * @param {React.MutableRefObject} referenceRef
 * @returns {{width: number, height: number}}
 */
export const useChildSizeCalculator = (containerRef, referenceRef) => {
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    if (containerRef.current && referenceRef.current) {
      const referenceRefs = Array.from(containerRef.current.children).filter(
        (ref) => ref !== referenceRef.current,
      );

      setSize({
        height:
          containerRef.current.offsetHeight -
          sumBy(referenceRefs, 'offsetHeight'),
        width:
          containerRef.current.offsetWidth -
          sumBy(referenceRefs, 'offsetWidth'),
      });
    } else setSize(initialSize);
  }, [containerRef.current]);

  return size;
};
