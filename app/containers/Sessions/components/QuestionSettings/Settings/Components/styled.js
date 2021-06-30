import styled from 'styled-components';

import { themeColors } from 'theme';

import { StyledInput } from 'components/Input/StyledInput';

export const CaseInput = styled(StyledInput)`
  width: 50px;
`;

export const Input = styled(StyledInput)`
  border: none;
  background-color: ${themeColors.highlight};
  outline: none;
  max-width: none;
  &:focus {
    border: none;
  }
`;
