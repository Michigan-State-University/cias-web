import styled from 'styled-components';
import Box from 'components/Box';
import { colors } from 'theme';
import { StyledInput } from 'components/Input/StyledInput';

export const DashedBox = styled(Box)`
  height: 40px;
  border: 1px dashed ${colors.greyishBlue};
  color: ${colors.greyishBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
`;

export const CaseInput = styled(StyledInput)`
  width: 50px;
`;
