/**
 *
 * Radio
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import radio from 'assets/svg/radio-button.svg';
import radioChecked from 'assets/svg/radio-button-checked.svg';

const Radio = ({ checked, ...restProps }) => {
  const icon = checked ? radioChecked : radio;
  return <Img {...restProps} src={icon} clickable />;
};

Radio.propTypes = {
  checked: PropTypes.bool,
};

export default Radio;
