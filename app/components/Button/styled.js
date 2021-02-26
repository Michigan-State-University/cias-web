import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { margin, layout, padding, flex } from 'components/BaseComponentStyles';
import { colors, themeColors } from 'theme';
import Box from 'components/Box';

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
  color: ${colors.greyishBlue};
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  transition: 0.2s;
  ${({ disabled }) =>
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
        }}
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
