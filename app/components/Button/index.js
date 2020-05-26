import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './StyledButton';

const Button = props => <StyledButton {...props}>{props.title}</StyledButton>;

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export { Button };
