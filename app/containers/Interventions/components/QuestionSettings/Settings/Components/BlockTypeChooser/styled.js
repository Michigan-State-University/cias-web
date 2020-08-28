import React from 'react';
import styled from 'styled-components';

import StyledCircle from 'components/Circle/StyledCircle';
import Box from 'components/Box';
import { colors } from 'theme';

export const DotCircle = props => <StyledCircle {...props} size="10px" />;

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
