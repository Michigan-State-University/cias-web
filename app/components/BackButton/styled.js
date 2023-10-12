import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BACK_BUTTON_GAP } from './constants';

export const StyledLink = styled(Link)`
  width: max-content;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${BACK_BUTTON_GAP};
`;
