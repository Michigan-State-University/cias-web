import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from 'theme';

export const CrossLink = styled(Link)`
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${colors.linkWater};
  margin-right: 35px;
  cursor: pointer;
`;
