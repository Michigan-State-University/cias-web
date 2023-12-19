import styled from 'styled-components';
import Button from 'components/Button';
import { hexToRgb, themeColors } from 'theme';

export const ShareButton = styled(Button)`
  font-weight: bold;
  width: 180px;

  ${({ outlined, disabled }) =>
    outlined &&
    !disabled &&
    `
    background-color: transparent;
    border: ${themeColors.primary} solid 1px;
    color: ${themeColors.primary};
    &:hover {
    background-color: ${themeColors.primary};
    color: white;
    }
  `}
  ${({ disabled, bg }) =>
    !disabled &&
    `
    background-color: ${bg && `rgba(${hexToRgb(bg)}, 1)`};
  `}
  a {
    color: inherit;
    text-decoration: none;
  }
`;
