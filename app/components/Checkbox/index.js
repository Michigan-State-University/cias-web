/**
 *
 * Checkbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';

import checkbox from 'assets/svg/checkbox.svg';
import checkboxChecked from 'assets/svg/checkbox-checked.svg';

import Icon from 'components/Icon';

const Checkbox = ({ checked, stroke, ...restProps }) => {
  const icon = checked ? checkboxChecked : checkbox;

  return (
    <Icon
      {...restProps}
      role="checkbox"
      aria-checked={checked}
      fill={themeColors.secondary}
      stroke={stroke || themeColors.secondary}
      src={icon}
      $clickable
    />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  stroke: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Checkbox;
