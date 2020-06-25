import styled from 'styled-components';
import { colors, fontSizes } from 'theme';
import { margin, style } from '../BaseComponentStyles';

const Badge = styled.div.attrs(({ color }) => ({
  bg: color,
  opacity: 0.1,
}))`
  min-height: 24px;
  min-width: 25px;
  width: max-content;
  padding: 5px 10px;
  font-size: ${fontSizes.small};
  font-weight: 600;
  border-radius: 4px;
  ${style};
  ${margin};
`;

Badge.defaultProps = {
  color: colors.jungleGreen,
};

export default Badge;
