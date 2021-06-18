/**
 *
 * Select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import { themeColors } from 'theme';

import ReactSelect from 'react-select';
import { DropdownIndicator, Option } from './components';

const customStyles = ({ isMulti, bg, isDisabled }) => ({
  control: provided => ({
    ...provided,
    borderWidth: '1px',
    borderRadius: '5px',
    borderColor: `${themeColors.highlight}`,
    boxShadow: '0',
    height: isMulti ? 'auto' : '45px',
    minHeight: '45px',
    width: '100%',
    background: `${bg || 'auto'}`,
    '&:hover': {
      borderColor: `${themeColors.highlight}`,
    },
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  }),
  option: provided => ({
    ...provided,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  }),
  menuPortal: provided => ({ ...provided, zIndex: 999 }),
  placeholder: provided => ({
    ...provided,
    color: 'hsl(0, 0%, 40%)',
  }),
});

const customComponents = isMulti => ({
  IndicatorSeparator: () => null,
  DropdownIndicator: props => <DropdownIndicator {...props} />,
  LoadingIndicator: () => null,
  ...(isMulti
    ? {
        Option: props => <Option {...props} />,
      }
    : {}),
});

const Select = ({ selectProps, ...restProps }) => (
  <Box {...restProps}>
    <ReactSelect
      components={customComponents(selectProps.isMulti)}
      menuPortalTarget={document.body}
      styles={customStyles(selectProps)}
      {...selectProps}
    />
  </Box>
);

Select.propTypes = {
  selectProps: PropTypes.object,
  bg: PropTypes.string,
};

export default Select;
