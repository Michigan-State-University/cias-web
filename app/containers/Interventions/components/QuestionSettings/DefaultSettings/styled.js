import styled from 'styled-components';
import Box from 'components/Box';
import { colors } from 'theme';

export const DashedBox = styled(Box)`
  margin-top: 14px;
  height: 40px;
  border: 1px dashed ${colors.greyishBlue};
  color: ${colors.greyishBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
`;
