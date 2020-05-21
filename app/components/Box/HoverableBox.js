import styled from 'styled-components';
import Box from '.';
import { colors } from '../../theme/colors';
import { borders } from '../../theme/general';

const HoverableBox = styled(Box)``;

HoverableBox.defaultProps = {
  clickable: true,
  hoverColor: colors.zirkon,
  borderRadius: borders.borderRadius,
};

export default HoverableBox;
