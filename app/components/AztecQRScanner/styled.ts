// @ts-ignore
import styled from 'styled-components';
import Webcam from 'react-webcam';

import { colors } from 'theme';

export const StyledWebcam = styled(Webcam)`
  width: 100%;
  max-width: 640px;
  height: auto;
  border: 2px solid ${colors.linkWater};
  border-radius: 8px;
`;
