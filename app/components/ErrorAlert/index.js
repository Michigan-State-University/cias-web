/**
 *
 * ErrorAlert
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from './styled';

function ErrorAlert({ errorText }) {
  return <StyledAlert>{errorText}</StyledAlert>;
}

ErrorAlert.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export default memo(ErrorAlert);
