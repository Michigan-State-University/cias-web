import styled from 'styled-components';

import Row from 'components/Row';
import { borders, colors } from 'theme';

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  position: absolute;
  margin-top: 25px;
  width: 100px;
  background-color: ${colors.white};
  border: ${borders.borderWidth} ${borders.borderStyle} ${colors.greyishBlue};
  border-bottom: none;
`;

export const ImageContainer = styled.div`
  display: flex;
  padding: 8px;
  margin-left: 8px;
`;

export const StyledRow = styled(Row)`
  &:hover {
    font-weight: bold;
  }
`;
