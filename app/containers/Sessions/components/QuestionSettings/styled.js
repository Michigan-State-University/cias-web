import styled from 'styled-components';
import Box from 'components/Box';
import { colors, themeColors, ZIndex } from 'theme';

export const SettingsBar = styled(Box)`
  overflow-x: auto;
  transition: right 0.4s ease;
  position: relative;
  ${({ isVisible }) => (isVisible ? 'right: 0px;' : 'right: -400px;')};
`;

export const Container = styled(Box)`
  display: flex;
  position: relative;
  background-color: ${colors.white};
  transition: width 0.4s ease;
  box-shadow: -20px 0 20px rgba(0, 0, 0, 0.08);
  z-index: ${ZIndex.QUESTION_SETTINGS_CONTAINER};
  ${({ isVisible }) => (isVisible ? 'width: 400px' : 'width: 0')};
`;

export const OpenButton = styled.button`
  background-color: ${themeColors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: 5px;
  border-width: 0;
  width: 30px;
  height: 30px;
  position: fixed;
  top: 85px;
  right: 22px;

  &:hover {
    cursor: pointer;
  }
`;
