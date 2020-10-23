import styled from 'styled-components';
import { colors } from 'theme';

import { style, layout, padding } from '../BaseComponentStyles';
export const StyledCollapseContainer = styled.div`
  width: 100%;
`;

export const StyledCollapseLabel = styled.div`
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 100%;
  margin-right: 5px;
  ${style};
  ${layout}
  ${padding}
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 100%;
  margin-bottom: 10px;
`;

export const StyledCollapseContent = styled.div`
  .ReactCollapse--collapse {
    transition: height 480ms ease;
  }
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
