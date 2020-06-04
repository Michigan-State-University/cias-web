import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { themeColors, colors } from '../../theme/colors';
import { hexToRgb } from '../../theme/utils';

const AppSlider = props => (
  <Slider
    {...props}
    min={0}
    max={100}
    railStyle={{ backgroundColor: `rgba(${hexToRgb(colors.bluewood)}, 0.2)` }}
    trackStyle={{ backgroundColor: themeColors.secondary }}
    handleStyle={{ borderColor: themeColors.secondary, boxShadow: 'none' }}
  />
);

export default AppSlider;
