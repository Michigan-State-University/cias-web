import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, fontWeights, themeColors } from 'theme';
import { flex, layout, margin, style, text } from '../BaseComponentStyles';

export const TabsContainer = styled.div`
  ${flex};
  ${layout};
  ${margin};
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
  div {
    ${style};
    ${text};
    cursor: pointer;
    ${({ emphasizeActiveLink, isActive }) =>
      emphasizeActiveLink && isActive
        ? `
      color: ${themeColors.text} !important;
      font-weight: ${fontWeights.bold} !important;
    `
        : `
      font-weight: ${fontWeights.regular} !important;
    `}
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

export const TabUnderline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${themeColors.secondary};
`;
