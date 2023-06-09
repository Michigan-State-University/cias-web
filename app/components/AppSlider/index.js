import React from 'react';
import Slider, { Handle } from 'rc-slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';

import { ternary } from 'utils/ternary';
import { hexToRgb } from 'theme/utils';
import { themeColors, colors } from 'theme/colors';
import { fontSizes } from 'theme';

import { ValueSliderStyled, ValueSliderWrapperStyled } from './styled';
import Text from '../Text';

const ValueSlider = React.forwardRef(({ value, ...props }, ref) => (
  <Handle ref={ref} value={value} {...props}>
    <ValueSliderWrapperStyled>
      <ValueSliderStyled>
        <Text fontSize={fontSizes.regular} color={colors.white}>
          {value}
        </Text>
      </ValueSliderStyled>
    </ValueSliderWrapperStyled>
  </Handle>
));

ValueSlider.propTypes = {
  value: PropTypes.any,
};

const renderHandle = (
  { customHandle: CustomHandle, showValue },
  handleParams,
) => {
  if (CustomHandle) return <CustomHandle {...handleParams} dragging="false" />;

  return ternary(
    showValue,
    <ValueSlider {...handleParams} dragging="false" />,
    <Handle {...handleParams} dragging="false" />,
  );
};

const AppSlider =
  // eslint-disable-next-line react/no-multi-comp
  React.forwardRef((props, ref) => (
    <Slider
      ref={ref}
      railStyle={{ backgroundColor: `rgba(${hexToRgb(colors.bluewood)}, 0.2)` }}
      trackStyle={{ backgroundColor: themeColors.secondary }}
      handleStyle={{
        borderColor: themeColors.secondary,
        boxShadow: 'none',
        borderWidth: '3px',
      }}
      handle={
        props.hideHandle
          ? () => {}
          : (handleParams) => renderHandle(props, handleParams)
      }
      {...props}
    />
  ));

AppSlider.propTypes = {
  showValue: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customHandle: PropTypes.object,
  hideHandle: PropTypes.bool,
};

AppSlider.defaultProps = {
  min: 0,
  max: 100,
  hideHandle: false,
};

export default AppSlider;
