import styled from 'styled-components';
import { layout, margin, style, positioning } from '../BaseComponentStyles';

const Img = styled.img`
  width: auto;
  height: auto;
  ${layout};
  ${margin};
  ${style};
  ${positioning};
`;

export default Img;
