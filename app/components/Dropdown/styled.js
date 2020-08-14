import styled from 'styled-components';

import Row from 'components/Row';
import Comment from 'components/Comment';

export const ImageContainer = styled.div`
  display: flex;
  padding: 8px;
`;

export const StyledComment = styled(Comment)`
  &::after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

export const StyledRow = styled(Row)`
  &:hover {
    ${StyledComment} {
      font-weight: bold;
    }
  }
`;
