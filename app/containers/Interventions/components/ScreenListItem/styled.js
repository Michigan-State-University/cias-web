import styled from 'styled-components';
import { colors, themeColors } from 'theme';
import Circle from 'components/Circle';

const ScreenListCircle = styled(Circle)``;

ScreenListCircle.defaultProps = {
  size: '23px',
  bg: themeColors.primary,
  opacity: 0.3,
  color: colors.white,
};

export { ScreenListCircle };
