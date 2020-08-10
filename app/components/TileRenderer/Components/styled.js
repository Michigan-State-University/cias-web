import styled from 'styled-components';
import { themeColors, colors, boxShadows } from 'theme';

export const NewItemFloatButton = styled.div`
  position: fixed;
  right: 115px;
  cursor: pointer;
  bottom: 20px;
  background: ${themeColors.secondary};
  color: white;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewElementContainer = styled.div`
  padding: 15px;
  height: 150px;
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  background: ${themeColors.secondary};
  color: ${colors.white};
  justify-content: center;
  align-items: center;
`;
