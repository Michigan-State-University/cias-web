import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import useGet from 'utils/useGet';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import ErrorAlert from 'components/ErrorAlert';

import Select from '.';
import messages from './messages';

const ApiSelect = ({
  dataParser,
  optionsFormatter,
  selectProps,
  url,
  selectedValue,
  onSelectedValueChange,
  defaultFetchErrorMessage,
  ...restProps
}) => {
  const { data, isFetching, error } = useGet(url, dataParser);

  const options = useMemo(() => data?.map(optionsFormatter) ?? [], [data]);

  const value = useMemo(() => {
    if (selectProps.value) return selectProps.value;

    if (!options || options.length === 0) return null;

    if (selectProps.isMulti) {
      return selectedValue.map((singleValue) =>
        options.find(({ value: optionValue }) => optionValue === singleValue),
      );
    }

    return (
      options.find(({ value: optionValue }) => optionValue === selectedValue) ||
      null
    );
  }, [options, selectedValue, selectProps.value, selectProps.isMulti]);

  const onChange = useCallback(
    (newValue, ...props) => {
      if (selectProps.onChange) return selectProps.onChange(newValue, ...props);

      if (selectProps.isMulti) {
        return onSelectedValueChange(
          newValue.map(({ value: singleValue }) => singleValue),
        );
      }

      return onSelectedValueChange(newValue.value);
    },
    [selectProps.onChange, selectProps.isMulti, onSelectedValueChange],
  );

  const mergedSelectProps = useMemo(
    () => ({
      ...selectProps,
      options,
      isLoading: isFetching,
      value,
      onChange,
    }),
    [selectProps, options, isFetching, value, onChange],
  );

  if (error)
    return (
      <ErrorAlert
        errorText={formatApiErrorMessage(
          error,
          defaultFetchErrorMessage ?? messages.error,
        )}
      />
    );

  return <Select selectProps={mergedSelectProps} {...restProps} />;
};

ApiSelect.propTypes = {
  dataParser: PropTypes.func,
  optionsFormatter: PropTypes.func,
  selectProps: PropTypes.object,
  url: PropTypes.string,
  selectedValue: PropTypes.any,
  onSelectedValueChange: PropTypes.any,
  defaultFetchErrorMessage: PropTypes.any,
};

export default ApiSelect;
