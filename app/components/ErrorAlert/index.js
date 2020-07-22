/**
 *
 * ErrorAlert
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from './styled';

function ErrorAlert({ errorText }) {
  return (
    <StyledAlert>
      {errorText
        .toString()
        .split('\n')
        .map((item, i) => (
          <p key={i}>{item}</p>
        ))}
    </StyledAlert>
  );
}

ErrorAlert.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export default memo(ErrorAlert);
