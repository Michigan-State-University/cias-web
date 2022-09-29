/**
 *
 * Select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import { themeColors } from 'theme';

import Box from 'components/Box';

import { DefaultOption, DropdownIndicator, Option } from './components';

const getBorderColor = (hasError, isFocused) => {
  if (hasError) return themeColors.warning;
  if (isFocused) return themeColors.primary;
  return themeColors.highlight;
};

const customStyles = ({
  isMulti,
  bg,
  isDisabled,
  height,
  placeholderOpacity,
  hasError,
  placeholderColorActive,
  placeholderColorDisabled,
  valueColorActive,
  valueColorDisabled,
}) => ({
  control: (provided, { isFocused }) => ({
    ...provided,
    borderWidth: '1px',
    borderRadius: '5px',
    borderColor: getBorderColor(hasError, isFocused),
    '&:hover': {
      borderColor: getBorderColor(hasError, isFocused),
    },
    boxShadow: '0',
    height: height || (isMulti ? 'auto' : '45px'),
    minHeight: '45px',
    width: '100%',
    background: `${bg || 'auto'}`,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    color:
      (isDisabled ? valueColorDisabled : valueColorActive) ?? provided.color,
  }),
  option: (provided) => ({
    ...provided,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  }),
  menuPortal: (provided) => ({ ...provided, zIndex: 999 }),
  placeholder: (provided) => ({
    ...provided,
    color:
      (isDisabled ? placeholderColorDisabled : placeholderColorActive) ??
      'hsl(0, 0%, 40%)',
    opacity: placeholderOpacity ?? '',
  }),
  singleValue: (provided) => ({
    ...provided,
    color:
      (isDisabled ? valueColorDisabled : valueColorActive) ?? provided.color,
  }),
  multiValue: (provided) => ({
    ...provided,
    color:
      (isDisabled ? valueColorDisabled : valueColorActive) ?? provided.color,
  }),
});

const customComponents = (isMulti) => ({
  IndicatorSeparator: () => null,
  DropdownIndicator: (props) => <DropdownIndicator {...props} />,
  LoadingIndicator: () => null,
  ...(isMulti
    ? {
        Option: (props) => <Option {...props} />,
      }
    : { Option: (props) => <DefaultOption {...props} /> }),
});

const Select = ({ selectProps, ...restProps }) => (
  <Box
    cursor={selectProps.isDisabled ? 'not-allowed' : 'pointer'}
    {...restProps}
  >
    <ReactSelect
      components={customComponents(selectProps.isMulti)}
      menuPortalTarget={document.body}
      styles={customStyles(selectProps)}
      menuPlacement="auto"
      {...selectProps}
    />
  </Box>
);

Select.propTypes = {
  selectProps: PropTypes.object,
  bg: PropTypes.string,
};

export default Select;
