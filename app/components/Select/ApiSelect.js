import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import useGet from 'utils/useGet';
import Select from '.';

const ApiSelect = ({
  dataParser,
  optionsFormatter,
  selectProps,
  url,
  ...restProps
}) => {
  const state = useGet(url, dataParser);

  const options = useMemo(() => state.data?.map(optionsFormatter) ?? [], [
    state.data,
  ]);

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
};

export default ApiSelect;
