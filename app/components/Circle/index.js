import React from 'react';
import PropTypes from 'prop-types';
import StyledCircle from './StyledCircle';

const Circle = (props) => <StyledCircle {...props}>{props.child}</StyledCircle>;

Circle.propTypes = {
  child: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
};

export default Circle;
