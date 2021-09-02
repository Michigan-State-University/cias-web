import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import useGet from 'utils/useGet';
import Select from '.';

const ApiSelect = ({
  dataParser,
  optionsFormatter,
  selectProps,
  url,
  defaultValue,
  ...restProps
}) => {
  const state = useGet(url, dataParser);

  const options = useMemo(
    () => state.data?.map(optionsFormatter) ?? [],
    [state.data],
  );

  const setDefaultSelectValue = () => {
    if (options && options.length !== 0 && defaultValue) {
      const option = options.find(({ value }) => value === defaultValue);
      selectProps.onChange(option);
    }
  };

  useEffect(() => {
    setDefaultSelectValue();
  }, [options]);

  const mergedSelectProps = useMemo(
    () => ({
      ...selectProps,
      options,
      isLoading: state.isFetching,
    }),
    [selectProps, options, state.isFetching],
  );

  return <Select selectProps={mergedSelectProps} {...restProps} />;
};

ApiSelect.propTypes = {
  dataParser: PropTypes.func,
  optionsFormatter: PropTypes.func,
  selectProps: PropTypes.object,
  url: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default ApiSelect;
