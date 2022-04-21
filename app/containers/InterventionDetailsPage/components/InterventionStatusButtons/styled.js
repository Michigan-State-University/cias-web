import styled from 'styled-components';
import Button from 'components/Button';
import { hexToRgb, themeColors } from 'theme';

export const ShareButton = styled(Button)`
  font-weight: bold;
  width: 180px;
  margin: 5px;
  background-color: ${(props) => props.bg && `rgba(${hexToRgb(props.bg)}, 1)`};
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

  a {
    color: inherit;
    text-decoration: none;
  }
`;
