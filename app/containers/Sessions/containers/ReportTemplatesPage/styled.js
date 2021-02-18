import styled from 'styled-components';

import { colors, themeColors, paddings } from 'theme';

export const Tab = styled.div`
  position: relative;
  bottom: -3px;
  margin: 0 10px;
  padding-bottom: 7px;
  border-bottom-width: 2px;
  border-bottom-color: ${themeColors.secondary};
  border-bottom-style: ${({ isActive }) => (isActive ? 'solid' : 'none')};
  div {
    cursor: pointer;
  }

  a {
    color: ${({ isActive }) =>
      isActive ? themeColors.text : colors.grey} !important;
    text-decoration: none;
  }
  a:visited,
  a:hover {
    color: ${themeColors.text};
  }
`;

export const Spacer = styled.div`
  height: 1px;
  width: calc(100% + ${paddings.regular} * 2);
  margin-left: -${paddings.regular};
  background-color: ${colors.linkWater};
`;
