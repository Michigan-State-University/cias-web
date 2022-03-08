import styled from 'styled-components';
import { colors } from 'theme';

import { style, layout, padding, text } from '../BaseComponentStyles';
export const StyledCollapseContainer = styled.div`
  width: 100%;

  ${style};
`;

export const StyledCollapseLabel = styled.div.attrs({
  defaultColor: 'white',
})`
  border-radius: 5px;
  ${text}
  cursor: pointer;
  width: 100%;
  .animated-img {
    transition: transform 0.3s, height 4s;
    transform: ${({ isOpened }) =>
      isOpened ? 'rotate0deg);' : 'rotate(180deg)'};
  }
  ${style};
  ${layout};
  ${padding};
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 100%;
`;

export const StyledCollapseContent = styled.div`
  .ReactCollapse--collapse {
    ${({ disableAnimation }) =>
      !disableAnimation && `transition: height 480ms ease;`}
  }
  ${style};
  ${layout};
  ${padding};
`;

export const ImageWrapper = styled.div`
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${colors.linkWater};
  cursor: pointer;
`;
