import React from 'react';
import Slider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { hexToRgb } from 'theme/utils';
import { themeColors, colors } from 'theme/colors';
import PropTypes from 'prop-types';
import { fontSizes } from 'theme';
import { ValueSliderStyled, ValueSliderWrapperStyled } from './styled';
import Text from '../Text';

const ValueSlider = React.forwardRef(({ value, ...props }, ref) => (
  <Handle ref={ref} {...props}>
    <ValueSliderWrapperStyled>
      <ValueSliderStyled>
        <Text fontSize={fontSizes.regular}>{value}</Text>
      </ValueSliderStyled>
    </ValueSliderWrapperStyled>
  </Handle>
));

ValueSlider.propTypes = {
  value: PropTypes.any,
};

const AppSlider = props => (
  <Slider
    min={props.min}
    max={props.max}
    railStyle={{ backgroundColor: `rgba(${hexToRgb(colors.bluewood)}, 0.2)` }}
    trackStyle={{ backgroundColor: themeColors.secondary }}
    handleStyle={{
      borderColor: themeColors.secondary,
      boxShadow: 'none',
      borderWidth: '3px',
    }}
    handle={handleParams =>
      props.showValue ? (
        <ValueSlider {...handleParams} dragging="false" />
      ) : (
        <Handle {...handleParams} dragging="false" />
      )
    }
    {...props}
  />
);

AppSlider.propTypes = {
  showValue: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AppSlider.defaultProps = {
  min: 0,
  max: 100,
};

export default AppSlider;
