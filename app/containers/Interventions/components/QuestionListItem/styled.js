import styled from 'styled-components';
import { colors, themeColors } from 'theme';
import Circle from 'components/Circle';
import { fontSizes } from 'theme/fonts';

const NumberCircle = styled(Circle)``;

NumberCircle.defaultProps = {
  size: '23px',
  bg: themeColors.primary,
  opacity: 0.3,
  color: colors.jungleGreen,
  fontSize: fontSizes.small,
};

export { NumberCircle };
