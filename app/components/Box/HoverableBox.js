import styled from 'styled-components';
import { colors, borders } from 'theme';

import Box from '.';

const HoverableBox = styled(Box)``;

HoverableBox.defaultProps = {
  clickable: true,
  hoverColor: colors.linkWater,
  borderRadius: borders.borderRadius,
};

export default HoverableBox;
