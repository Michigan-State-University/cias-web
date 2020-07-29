import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
