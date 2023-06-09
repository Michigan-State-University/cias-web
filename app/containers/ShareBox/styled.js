import styled from 'styled-components';

import { colors } from 'theme';

import Row from 'components/Row';
import TextButton from 'components/Button/TextButton';

export const StyledTextButton = styled(TextButton)`
  display: none;
  margin-left: 20px;
`;

export const HoverableRow = styled(Row)`
  &:hover {
    ${StyledTextButton} {
      display: block;
    }
  }
`;

export const SessionIndex = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.jungleGreen};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  min-width: 30px;
`;
