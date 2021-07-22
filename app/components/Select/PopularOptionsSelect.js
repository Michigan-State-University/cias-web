/*
 * PopularOptionsSelect
 *
 * This component allows to define which options are the most popular and
 * display these in bold in a separate group above other options.
 *
 * Provide an array of values of popular options with popularOptionsValues
 * property.
 *
 * You can also customize 'Popular' and 'Other' group labels with
 * popularGroupLabel and otherGroupLabel properties passing a string value.
 */

import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import Select from '.';
import messages from './messages';

const PopularOptionsSelect = ({
  popularOptionsValues,
  popularGroupLabel,
  otherGroupLabel,
  selectProps,
  ...restProps
}) => {
  const { formatMessage } = useIntl();

  const emptyGroups = [
    {
      label: popularGroupLabel ?? formatMessage(messages.popular),
      options: [],
    },
    { label: otherGroupLabel ?? formatMessage(messages.other), options: [] },
  ];

  const groupedOptions = useMemo(
    () =>
      selectProps.options.reduce((groups, option) => {
        const groupIndex = +!popularOptionsValues.includes(option.value);
        groups[groupIndex].options.push({
          ...option,
          highlighted: !groupIndex,
        });
        return groups;
      }, emptyGroups),
    [selectProps.options, popularOptionsValues],
  );

  const formatOptionLabel = ({ value, label, highlighted }) =>
    highlighted && value !== selectProps.value?.value ? <b>{label}</b> : label;

  return (
    <Select
      selectProps={{
        ...selectProps,
        options: groupedOptions,
        getOptionLabel: formatOptionLabel,
      }}
      {...restProps}
    />
  );
};

PopularOptionsSelect.propTypes = {
  popularOptionsValues: PropTypes.array.isRequired,
  popularGroupLabel: PropTypes.string,
  otherGroupLabel: PropTypes.string,
  selectProps: PropTypes.object.isRequired,
};

export default PopularOptionsSelect;
