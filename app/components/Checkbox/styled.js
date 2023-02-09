import styled from 'styled-components';

import Icon from 'components/Icon';

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const StyledIcon = styled(Icon)`
  margin-right: 5px;
  border-radius: 5px;

  ${StyledCheckbox}:disabled + label > & {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  ${StyledCheckbox}:disabled + & {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
