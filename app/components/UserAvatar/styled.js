import styled from 'styled-components';
import { colors } from 'theme';

import { layout, margin, text } from '../BaseComponentStyles';

export const AvatarStyled = styled.div`
  width: 30px;
  height: 30px;
  font-size: 15px;
  border-radius: 50%;
  background-color: ${colors.surfieGreen};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  ${layout};
  ${margin};
  ${text};
`;
