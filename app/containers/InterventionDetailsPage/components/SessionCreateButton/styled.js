import styled from 'styled-components';

import { themeColors } from 'theme';

import Box from 'components/Box';

export const NewInterventionContainer = styled(Box)`
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: ${themeColors.highlight};
  color: ${themeColors.secondary};
  justify-content: center;
  align-items: center;
`;
