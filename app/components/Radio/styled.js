import styled from 'styled-components';

import Icon from 'components/Icon';
import Box from 'components/Box';

import { LabelPosition } from './constants';

export const StyledRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

export const StyledIcon = styled(Icon)`
  ${StyledRadio}:disabled + label > & {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  ${StyledRadio}:disabled + & {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LabelContent = styled(Box)`
  ${({ $labelPosition, $labelOffset }) =>
    $labelPosition === LabelPosition.Left
      ? `margin-right: ${$labelOffset ?? 5}px`
      : `margin-left: ${$labelOffset ?? 5}px`};
`;
