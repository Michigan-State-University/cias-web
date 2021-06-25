import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Select from '.';

const defaultState = {
  data: null,
  error: null,
  isFetching: true,
};

const ApiSelect = ({
  dataParser,
  optionsFormatter,
  selectProps,
  url,
  ...restProps
}) => {
  const [state, setState] = useState(defaultState);

  const fetchData = async () => {
    try {
      setState(defaultState);

      const { data } = await axios.get(url);

      const formattedData = dataParser ? dataParser(data) : data;
      setState({ data: formattedData, error: null, isFetching: false });
    } catch (error) {
      setState({ data: null, error, isFetching: false });
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

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
