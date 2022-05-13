import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useGet from 'utils/useGet';
import Select from '.';

const ApiSelect = ({
  dataParser,
  optionsFormatter,
  selectProps,
  url,
  selectedValue,
  ...restProps
}) => {
  const state = useGet(url, dataParser);

  const options = useMemo(
    () => state.data?.map(optionsFormatter) ?? [],
    [state.data],
  );

  const value = useMemo(() => {
    if (selectProps.value) return selectProps.value;

    if (!options || options.length === 0) return null;
    return (
      options.find(({ value: option }) => option === selectedValue) || null
    );
  }, [options, selectedValue, selectProps.value]);

  const mergedSelectProps = useMemo(
    () => ({
      ...selectProps,
      options,
      isLoading: state.isFetching,
      value,
    }),
    [selectProps, options, state.isFetching, value],
  );

  return <Select selectProps={mergedSelectProps} {...restProps} />;
};

ApiSelect.propTypes = {
  dataParser: PropTypes.func,
  optionsFormatter: PropTypes.func,
  selectProps: PropTypes.object,
  url: PropTypes.string,
  selectedValue: PropTypes.any,
};

export default ApiSelect;
