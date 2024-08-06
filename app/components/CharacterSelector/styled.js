import styled, { css } from 'styled-components';

import { borders, fontWeights, themeColors } from 'theme';

import Radio from 'components/Radio';

export const SelectCharacterRadio = styled(Radio)`
  width: 100%;
  padding: 16px;
  border: 1px solid ${themeColors.highlight};
  border-radius: ${borders.borderRadius};

  label {
    display: flex;
    justify-content: center;
  }

  ${({ checked }) =>
    checked &&
    css`
      border-color: ${themeColors.primary};

      label {
        font-weight: ${fontWeights.bold};
      }
    `}
`;
