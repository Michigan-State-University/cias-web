import styled from 'styled-components';
import { borders, colors } from 'theme';

export const StyledInputWrapper = styled.div`
  margin: 0px 10px 0px 10px;
  background-color: ${colors.zirkon};
  border-radius: ${borders.borderRadius};
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${colors.linkWater};
  width: 130px;
  height: 50px;
`;
