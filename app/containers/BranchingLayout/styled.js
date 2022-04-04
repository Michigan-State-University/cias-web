import styled from 'styled-components';
import Box from 'components/Box';
import { colors, themeColors } from 'theme';

export const DashedBox = styled(Box)`
  height: 40px;
  background-color: ${colors.white};
  border: 1px dashed ${colors.greyishBlue};
  color: ${themeColors.secondary};
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
            backgroundColor: colors.linkWater,
          },
          cursor: 'pointer',
        }}
`;
