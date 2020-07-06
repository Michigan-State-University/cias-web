/**
 *
 * Select
 *
 */

import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import { themeColors } from 'theme';

import { DropdownIndicator } from './components';

const customStyles = {
  control: provided => ({
    ...provided,
    borderWidth: '1px',
    borderRadius: '5px',
    borderColor: `${themeColors.highlight}`,
    boxShadow: '0',
    height: '45px',
    width: '100%',
    '&:hover': {
      borderColor: `${themeColors.highlight}`,
    },
    cursor: 'pointer',
  }),
  option: provided => ({
    ...provided,
    cursor: 'pointer',
  }),
};

const customComponents = {
  IndicatorSeparator: () => null,
  DropdownIndicator: props => <DropdownIndicator {...props} />,
};

const Select = ({ selectProps, ...restProps }) => (
  <Box {...restProps}>
    <ReactSelect
      components={customComponents}
      styles={customStyles}
      {...selectProps}
    />
  </Box>
);

Select.propTypes = {
  selectProps: PropTypes.object,
};

export default Select;
