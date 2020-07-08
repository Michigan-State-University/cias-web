import styled from 'styled-components';

import { colors } from 'theme';
import { style, layout } from 'components/BaseComponentStyles';

export const FillScreenLoader = styled.div.attrs({
  bg: colors.white,
  opacity: 0.5,
})`
  position: absolute;
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  ${style};
  ${layout};
`;

export const InlineLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${style};
  ${layout};
`;
