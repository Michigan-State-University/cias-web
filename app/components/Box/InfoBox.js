import styled from 'styled-components';
import { colors, borders } from 'theme';

import Box from '.';

const InfoBox = styled(Box)`
  background-color: ${colors.zirkon};
  border: ${borders.borderWidth} ${borders.borderStyle} ${colors.lavender};
  border-radius: ${borders.borderRadius};
  padding: 10px;
`;

export default InfoBox;
