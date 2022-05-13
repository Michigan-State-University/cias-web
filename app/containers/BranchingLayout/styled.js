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

export const Unit = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  display: flex;
  .invisible {
    visibility: hidden;
  }
  #unitsValue {
    white-space: pre;
  }
`;
