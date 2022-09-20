import styled from 'styled-components';

import { colors, ZIndex } from 'theme';
import { style, layout } from 'components/BaseComponentStyles';

export const FillScreenLoader = styled.div.attrs({
  bg: colors.white,
  bgOpacity: 0.5,
})`
  position: fixed;
  display: flex;
  z-index: ${ZIndex.LOADER};
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
