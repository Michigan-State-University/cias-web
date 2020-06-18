import styled from 'styled-components';
import { borders } from 'theme';
import { style } from '../BaseComponentStyles';

export const AccordionContainer = styled.div``;

export const StyledCollapseContainer = styled.div``;

export const StyledCollapseLabel = styled.div`
  height: 40px;
  border-radius: ${borders.borderRadius};
  padding: 12px;
  color: white;
  cursor: pointer;
  ${style};
`;

export const StyledCollapseContent = styled.div`
  transition: height 0.4s ease, opacity 0.8s ease;
  ${({ isOpened }) =>
    isOpened ? { height: 300, opacity: 1 } : { height: 0, opacity: 0 }};
`;
