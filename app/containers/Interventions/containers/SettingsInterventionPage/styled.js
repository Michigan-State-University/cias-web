import styled from 'styled-components';

import Column from 'components/Column';
import { StyledInput } from 'components/Input/StyledInput';
import { themeColors, colors, boxShadows } from 'theme';

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

export const StyledColumn = styled(Column)`
  width: 400px;
  padding: 25px 20px;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: ${boxShadows[2]};
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
