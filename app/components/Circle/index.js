import React from 'react';
import PropTypes from 'prop-types';

import StyledCircle from './StyledCircle';

const Circle = (props) => <StyledCircle {...props}>{props.child}</StyledCircle>;

Circle.propTypes = {
  id: PropTypes.string,
  child: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  bg: PropTypes.any,
  bgOpacity: PropTypes.number,
  color: PropTypes.any,
  size: PropTypes.any,
  doNotShrink: PropTypes.bool,
  fontWeight: PropTypes.any,
  fontSize: PropTypes.any,
  ml: PropTypes.any,
  cursor: PropTypes.any,
  onClick: PropTypes.any,
};

export default Circle;
