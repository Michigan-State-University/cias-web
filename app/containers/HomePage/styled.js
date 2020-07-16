import styled from 'styled-components';
import { themeColors, colors } from 'theme';

export const HomePageContainer = styled.div``;

export const NewInterventionFloatButton = styled.div`
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

export const AddIcon = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: ${colors.white};
  display: inline-block;
  color: ${themeColors.secondary};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
