import styled from 'styled-components';
import { borders } from 'theme';
import { style } from '../BaseComponentStyles';

export const AccordionContainer = styled.div``;

export const StyledCollapseContainer = styled.div`
  margin-bottom: 7px;
`;

export const StyledCollapseLabel = styled.div`
  height: 40px;
  border-radius: ${borders.borderRadius};
  padding: 12px;
  color: white;
  cursor: pointer;
  ${style};
`;

export const StyledCollapseContent = styled.div`
  transition: all 390ms ease;
  display: flex;
  ${({ isOpened }) =>
    isOpened
      ? { height: 300, opacity: 1, marginTop: 15 }
      : { height: 0, opacity: 0, marginTop: 0 }};
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  margin-top: -12px;
`;
