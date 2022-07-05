import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, fontWeights, themeColors } from 'theme';
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
  div {
    cursor: pointer;
    ${({ emphasizeActiveLink, isActive }) => `
      color: ${
        emphasizeActiveLink && isActive ? themeColors.secondary : colors.text
      } !important};
      font-weight: ${
        emphasizeActiveLink && isActive ? fontWeights.bold : fontWeights.regular
      } !important;
    `}
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

export const TabUnderline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${themeColors.secondary};
`;
