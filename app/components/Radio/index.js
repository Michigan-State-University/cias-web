/**
 *
 * Radio
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';

import radio from 'assets/svg/radio-button.svg';
import radioChecked from 'assets/svg/radio-button-checked.svg';

import Icon from 'components/Icon';

const Radio = ({ checked, ...restProps }) => {
  const icon = checked ? radioChecked : radio;
  return (
    <Icon
      {...restProps}
      fill={themeColors.secondary}
      role="radio"
      aria-checked={checked}
      src={icon}
      $clickable
    />
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
};

export default Radio;
