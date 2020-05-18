import React from 'react';
import PropTypes from 'prop-types';
import * as S from './Button';

const Button = props => <S.Button {...props}>{props.title}</S.Button>;

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

export { Button };
