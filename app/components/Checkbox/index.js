/**
 *
 * Checkbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import checkbox from 'assets/svg/checkbox.svg';
import checkboxChecked from 'assets/svg/checkbox-checked.svg';

const Checkbox = ({ checked, ...restProps }) => {
  const icon = checked ? checkboxChecked : checkbox;
  return <Img {...restProps} src={icon} />;
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

export default Checkbox;
