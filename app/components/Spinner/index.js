/**
 *
 * Spinner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'theme';

import { StyledSpinner } from './styled';

const Spinner = props => <StyledSpinner {...props} />;

StyledSpinner.propTypes = {
  color: PropTypes.string,
};

StyledSpinner.defaultProps = {
  color: colors.white,
};

export default Spinner;
