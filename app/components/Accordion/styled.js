import styled from 'styled-components';

import Row from 'components/Row';

import { style } from '../BaseComponentStyles';

export const AccordionContainer = styled.div``;

export const StyledCollapseContainer = styled.div`
  margin-bottom: 7px;
`;

export const StyledCollapseLabel = styled.div`
  height: 40px;
  border-radius: 5px;
  padding: 12px;
  color: white;
  cursor: pointer;
  width: 100%;
  margin-right: 5px;
  ${style};
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
    transition: height 490ms ease;
  }
`;

export const HoverableContainer = styled(Row)`
  img[alt='bin'] {
    display: none;
  }
  &:hover {
    img[alt='bin'] {
      ${({ isDeletable }) => isDeletable && 'display: block;'}
    }
  }
`;
