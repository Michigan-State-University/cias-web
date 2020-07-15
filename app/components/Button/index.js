import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import { StyledButton } from './StyledButton';

const Button = ({ loading, title, children, ...props }) => (
  <StyledButton disabled={loading} {...props}>
    {!loading && (title || children)}
    {loading && <Spinner />}
  </StyledButton>
);

Button.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  inverted: PropTypes.bool,
  children: PropTypes.node,
};

export { Button };
