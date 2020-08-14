import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { themeColors } from 'theme';

export const StyledLink = styled(Link)`
  color: ${themeColors.secondary};
  text-decoration: none;
  display: flex;
  align-items: center;
`;
