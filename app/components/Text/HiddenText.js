import styled from 'styled-components';

import Text from './Text';

const HiddenText = styled(Text)`
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export default HiddenText;
