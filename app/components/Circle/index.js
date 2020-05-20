import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const Circle = props => <Wrapper {...props}>{props.child}</Wrapper>;

Circle.propTypes = {
  child: PropTypes.number.isRequired,
};

export default Circle;
