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
import { Props as SelectProps } from 'react-select';

import Select from '.';
import messages from './messages';
import { SelectOption, GroupedOption, Group } from './types';

type Props<OptionType extends SelectOption<string>> = {
  popularOptionsValues: string[];
  popularGroupLabel?: string;
  otherGroupLabel?: string;
  selectProps: SelectProps<OptionType>;
};

const PopularOptionsSelect = <OptionType extends SelectOption<string>>({
  popularOptionsValues,
  popularGroupLabel,
  otherGroupLabel,
  selectProps,
  ...restProps
}: Props<OptionType> & Record<string, unknown>): JSX.Element => {
  const { formatMessage } = useIntl();

  const emptyGroups: Group<OptionType>[] = [
    {
      label: popularGroupLabel ?? formatMessage(messages.popular),
      options: [],
    },
    { label: otherGroupLabel ?? formatMessage(messages.other), options: [] },
  ];

  const groupedOptions = useMemo(
    () =>
      selectProps.options?.reduce((groups, option) => {
        const groupIndex = +!popularOptionsValues.includes(option.value);
        groups[groupIndex].options.push({
          ...(option as OptionType),
          highlighted: !groupIndex,
        });
        return groups;
      }, emptyGroups) ?? emptyGroups,
    [selectProps.options, popularOptionsValues],
  );

  const formatOptionLabel = ({
    value,
    label,
    highlighted,
  }: GroupedOption<OptionType>) => {
    const selectValue = selectProps.value as OptionType;
    return highlighted && value !== selectValue?.value ? <b>{label}</b> : label;
  };

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

export default PopularOptionsSelect;
