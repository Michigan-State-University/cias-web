import React from 'react';
import PropTypes from 'prop-types';
import { colors, themeColors } from 'theme';
import Circle from 'components/Circle';
import { fontSizes } from 'theme/fonts';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';

const NumberCircle = props => (
  <Circle
    {...props}
    size="45px"
    bg={themeColors.primary}
    fontSize={fontSizes.h1}
  />
);

NumberCircle.propTypes = {
  isSelected: PropTypes.bool,
};

const BackgroundBox = props => (
  <Box {...props} padding={30} height="auto" bg={colors.zirkon} />
);

const StyledHoverableBox = props => (
  <HoverableBox {...props} hoverColor={colors.linkWater} clickable={false} />
);

export { NumberCircle, BackgroundBox, StyledHoverableBox };
