import styled from 'styled-components';
import { themeColors, colors, boxShadows } from 'theme';

export const NewElementContainer = styled.div`
  padding: 15px;
  height: 150px;
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  background: ${themeColors.secondary};
  color: ${colors.white};
  justify-content: center;
  align-items: center;
`;
