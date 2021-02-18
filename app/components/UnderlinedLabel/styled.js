import styled from 'styled-components';

import { colors, themeColors } from 'theme';

export const LabelContainer = styled.div`
  width: max-content;
  height: max-content;
  position: relative;
  bottom: -3px;
  margin: 0 10px;
  padding-bottom: 7px;
  border-bottom-width: 2px;
  border-bottom-color: ${themeColors.secondary};
  border-bottom-style: ${({ isActive }) => (isActive ? 'solid' : 'none')};
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? themeColors.text : colors.grey} !important;
  text-decoration: none;
  &:hover {
    color: ${themeColors.text};
  }
`;
