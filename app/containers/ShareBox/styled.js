import styled from 'styled-components';

import { colors } from 'theme';

import TextButton from 'components/Button/TextButton';

export const StyledTextButton = styled(TextButton)`
  margin-left: 20px;
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
