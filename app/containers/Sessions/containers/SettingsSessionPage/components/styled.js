import styled from 'styled-components';

import { StyledInput } from 'components/Input/StyledInput';
import { themeColors } from 'theme';

export const Input = styled(StyledInput)`
  border: none;
  background-color: ${themeColors.highlight};
  outline: none;
  height: 50px;
  max-width: none;
  &:focus {
    border: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HiddenInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  opacity: ${({ opacity }) => opacity};
  &:focus {
    border: none;
  }
`;
