import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EmptyAnchor = styled(Link)`
  text-decoration: none;
  width: ${(props) => props.width || 'auto'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const DisabledLink = styled.div`
  width: ${(props) => props.width || 'auto'};
  cursor: not-allowed;
`;
