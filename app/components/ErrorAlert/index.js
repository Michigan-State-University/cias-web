/**
 *
 * ErrorAlert
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from './styled';

const ErrorAlert = ({ errorText }) => {
  const isString = typeof errorText === 'string';
  const toDisplay = isString
    ? errorText.split('\n').map((item, i) => <p key={i}>{item}</p>)
    : errorText.toString();
  return <StyledAlert>{toDisplay}</StyledAlert>;
};

ErrorAlert.propTypes = {
  errorText: PropTypes.node.isRequired,
};

export default memo(ErrorAlert);
