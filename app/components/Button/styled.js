import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { margin, layout, padding, flex } from 'components/BaseComponentStyles';
import Box from 'components/Box';

import { colors, themeColors } from 'theme';
import Color from 'color';

import TextButton from './TextButton';

const getTransparentStyles = (disabled) =>
  disabled
    ? {
        '&:hover': {
          cursor: 'not-allowed',
        },
        opacity: 0.7,
      }
    : {
        '&:hover': {
          backgroundColor: colors.linkWater,
        },
        cursor: 'pointer',
      };

const getStandardStyles = (disabled) =>
  disabled
    ? {
        '&:hover': {
          backgroundColor: colors.grey,
          color: colors.white,
        },
      }
    : {
        '&:hover': {
          backgroundColor: themeColors.primary,
          color: colors.white,
          border: '1px dashed transparent',
        },
        cursor: 'pointer',
      };

export const StyledLink = styled(Link)`
  outline: none;
  border: none;
  background: transparent;
  font-weight: bold;
  font-size: 13px;
  line-height: 17px;
  color: ${themeColors.secondary};
  cursor: pointer;
  text-decoration: none;
`;

export const LinkContainer = styled.div`
  ${margin};
  ${padding};
  ${flex};
  ${layout};
`;

export const StyledDashedButton = styled.button`
  height: 40px;
  width: 100%;
  border: 1px dashed ${colors.greyishBlue};
  color: ${({ transparent }) =>
    transparent ? themeColors.secondary : colors.greyishBlue};
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  transition: 0.2s;
  ${({ disabled, transparent }) =>
    transparent ? getTransparentStyles(disabled) : getStandardStyles(disabled)}
`;

export const DashedBox = styled(Box)`
  height: 40px;
  border: 1px dashed ${colors.greyishBlue};
  color: ${colors.greyishBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  cursor: not-allowed;
`;

export const HoverTextButton = styled(TextButton)`
  ${({ showHoverEffect }) =>
    showHoverEffect &&
    `
    background-color: transparent;
    padding: 4px;
    border-radius: 8px;
  
    &:hover {
      background-color: ${Color(themeColors.primary).alpha(0.2).rgb().string()};
      
        svg {
          *[fill^='#'] {
              fill: ${themeColors.primary};
          }
        }
                
    }`}
`;
