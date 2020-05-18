import styled from 'styled-components';
import { colors, borders, paddings } from 'theme';

const Card = styled.div`
  width: min-content;
  height: min-content;
  padding: ${paddings.regular};
  background-color: ${colors.white};
  border-radius: ${borders.borderRadius};
`;

export { Card };
