import styled from 'styled-components';

import Box from 'components/Box';
import TextButton from 'components/Button/TextButton';

import { boxShadows, colors } from 'theme';

export const StyledBox = styled(Box)`
  box-shadow: ${boxShadows.selago};
  background-color: ${colors.white};
`;

export const StyledTextButton = styled(TextButton)`
  margin-left: 20px;
`;
