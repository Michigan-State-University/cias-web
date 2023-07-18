/**
 *
 * Spinner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'theme';

import { StyledSpinner } from './styled';

const Spinner = (props) => <StyledSpinner {...props} />;

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.string,
};

Spinner.defaultProps = {
  color: colors.white,
  size: 30,
  width: 6,
};

export default Spinner;
