import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import { colors, themeColors } from 'theme';

import { DashedBox, StyledDashedButton } from './styled';

const DashedButton = ({
  children,
  loading,
  onClick,
  buttonProps,
  loaderProps,
  spinnerProps,
  disabled,
  transparent,
}) => {
  const button = useRef(null);
  if (loading)
    return (
      <DashedBox
        width="100%"
        height="100%"
        align="center"
        justify="center"
        {...loaderProps}
      >
        <Spinner
          color={disabled ? colors.grey : themeColors.secondary}
          {...spinnerProps}
        />
      </DashedBox>
    );
  return (
    <StyledDashedButton
      disabled={disabled}
      ref={button}
      fontWeight="bold"
      onClick={onClick}
      transparent={transparent}
      {...buttonProps}
    >
      {children}
    </StyledDashedButton>
  );
};

DashedButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  buttonProps: PropTypes.object,
  loaderProps: PropTypes.object,
  spinnerProps: PropTypes.object,
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default DashedButton;
