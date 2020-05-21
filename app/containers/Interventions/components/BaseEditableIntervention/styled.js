import React from 'react';
import { colors, themeColors } from 'theme';
import Circle from 'components/Circle';
import plusSign from 'assets/svg/plus-white.svg';
import Img from 'components/Img';

const PlusCircle = props => (
  <Circle {...props} child={<Img src={plusSign} />} />
);

PlusCircle.defaultProps = {
  size: '32px',
  bg: themeColors.secondary,
  color: colors.white,
};

export { PlusCircle };
