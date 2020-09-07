import styled from 'styled-components';
import { text } from '../BaseComponentStyles';

export const StyledEllipsisText = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${text};
`;
