import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const Circle = props => <Wrapper {...props}>{props.text}</Wrapper>;

Circle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Circle;
