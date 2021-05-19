import styled from 'styled-components';

import { colors, themeColors } from 'theme';
import { flex, layout, margin } from '../BaseComponentStyles';

export const TabsContainer = styled.div`
  ${flex};
  ${layout};
`;

export const ContentContainer = styled.div`
  margin: 25px 10px;
  ${margin};
`;

export const LabelContainer = styled.div`
  position: relative;
  bottom: -3px;
  margin: 0 10px;
  padding-bottom: 7px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${({ isActive }) =>
    isActive ? themeColors.secondary : colors.white};
  div {
    cursor: pointer;
  }
`;

export const LinkContainer = styled(LabelContainer)`
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
