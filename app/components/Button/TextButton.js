import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Spinner from 'components/Spinner';
import { themeColors } from 'theme';

import StyledTextButton from './StyledTextButton';

const DEFAULT_WIDTH = 100;

const getWidth = (button) => {
  const { current } = button;
  if (current) return current.clientWidth;
  return DEFAULT_WIDTH;
};

const TextButton = ({
  className,
  children,
  loading,
  onClick,
  buttonProps,
  loaderProps,
  spinnerProps,
  disabled,
}) => {
  const button = useRef(null);
  if (loading)
    return (
      <Row
        className={className}
        width={getWidth(button)}
        height="100%"
        align="center"
        justify="center"
        {...loaderProps}
      >
        <Spinner color={themeColors.secondary} {...spinnerProps} />
      </Row>
    );
  return (
    <StyledTextButton
      disabled={disabled}
      ref={button}
      className={className}
      fontWeight="bold"
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </StyledTextButton>
  );
};

TextButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  buttonProps: PropTypes.object,
  loaderProps: PropTypes.object,
  spinnerProps: PropTypes.object,
  disabled: PropTypes.bool,
};

export default TextButton;
