import styled from 'styled-components';
import Box from 'components/Box';
import { colors, themeColors } from 'theme';

export const DashedBox = styled(Box)`
  height: 40px;
  border: 1px dashed ${colors.greyishBlue};
  color: ${colors.greyishBlue};
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
            border: 'none',
          },
          cursor: 'pointer',
        }}
`;
