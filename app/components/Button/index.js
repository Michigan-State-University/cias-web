import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import { StyledButton } from './StyledButton';

const Button = ({ loading, ...props }) => (
  <StyledButton disabled={loading} {...props}>
    {!loading && props.title}
    {loading && <Spinner />}
  </StyledButton>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export { Button };
