import styled from 'styled-components';

import Column from 'components/Column';
import { colors, boxShadows } from 'theme';

export const StyledColumn = styled(Column)`
  width: 400px;
  padding: 25px 20px;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: ${boxShadows[2]};
`;
