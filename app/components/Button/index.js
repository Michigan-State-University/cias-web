import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const Button = props => <Wrapper {...props}>{props.title}</Wrapper>;

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export { Button };
