import styled from 'styled-components';

import { layout, margin, text } from '../BaseComponentStyles';

export const AvatarStyled = styled.div`
  width: 30px;
  height: 30px;
  font-size: 15px;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  ${layout};
  ${margin};
  ${text};
`;
