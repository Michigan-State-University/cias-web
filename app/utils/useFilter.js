import { useState, useEffect } from 'react';
import get from 'lodash/get';

import useDebounce from 'utils/useDebounce';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';

const DEFUALT_VALUE = '';
const DEFAULT_DELAY = 500; // in ms

const defaultConfiguration = {
  initialValue: DEFUALT_VALUE,
  initialDelay: DEFAULT_DELAY,
};

/**
 * @param {array} array Array of objects to filter
 * @param {string} key Key by which to filter
 * @param {object} configuration Configuration object
 * @returns {array} Returns array of three values: [filteredList, value which was used to filter, function that updates filter value]
 */
const useFilter = (array, key, configuration) => {
  const { initialValue, initialDelay } = {
    ...defaultConfiguration,
    ...configuration,
  };
  const [value, setValue] = useState(initialValue);
  const [list, setList] = useState(array);
  const debouncedValue = useDebounce(value, initialDelay);

  useEffect(() => {
    if (!list) return;

    if (debouncedValue === initialValue) {
      setList(array);
      return;
    }

    const filteredList = list.filter(
      element =>
        get(element, key, '')
          .toLowerCase()
          .indexOf(debouncedValue.toLowerCase()) !== -1,
    );
    setList(filteredList);
  }, [debouncedValue]);

  useDidUpdateEffect(() => {
    if (array) setList(array);
  }, [array]);

  return [list, value, setValue];
};

export default useFilter;
