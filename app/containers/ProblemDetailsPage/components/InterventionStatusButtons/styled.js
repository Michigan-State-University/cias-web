import styled from 'styled-components';
import Button from 'components/Button';
import { themeColors } from 'theme';

export const ShareButton = styled(Button)`
  font-weight: bold;
  color: white;
  ${({ outlined }) =>
    outlined &&
    `
    background-color: transparent;
    border: ${themeColors.primary} solid 1px;
    color: ${themeColors.primary};
    &:hover {
    background-color: ${themeColors.primary};
    color: white;
    }
  `}
`;
