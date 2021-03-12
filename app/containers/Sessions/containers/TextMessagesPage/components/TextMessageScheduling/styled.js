import styled from 'styled-components';
import { borders, colors } from 'theme';

export const StyledInputWrapper = styled.div`
  margin: 0 10px 0 10px;
  background-color: ${colors.zirkon};
  border-radius: ${borders.borderRadius};
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${colors.linkWater};
  max-width: 110px;
  height: 50px;
`;
