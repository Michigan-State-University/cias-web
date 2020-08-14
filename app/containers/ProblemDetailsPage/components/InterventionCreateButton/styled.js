import styled from 'styled-components';
import { themeColors } from 'theme';

export const NewInterventionContainer = styled.div`
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  background: ${themeColors.highlight};
  color: ${themeColors.secondary};
  justify-content: center;
  align-items: center;
`;
