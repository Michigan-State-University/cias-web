import React from 'react';
import PropTypes from 'prop-types';

import arrowDownSelect from 'assets/svg/arrow-down-select.svg';
import Img from 'components/Img';

const ToggleArrow = ({ facingUp, ...props }) => {
  const transform = facingUp ? 'rotate(180deg);' : '';
  const transition = 'transform 0.2s;';
  return (
    <Img
      src={arrowDownSelect}
      alt="arrow"
      transform={transform}
      transition={transition}
      {...props}
    />
  );
};

ToggleArrow.propTypes = {
  facingUp: PropTypes.bool.isRequired,
};

export default ToggleArrow;
