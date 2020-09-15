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

const customStyles = ({ isMulti, bg }) => ({
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
    cursor: 'pointer',
  }),
  option: provided => ({
    ...provided,
    cursor: 'pointer',
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
