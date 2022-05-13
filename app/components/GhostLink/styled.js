import styled from 'styled-components';

export const EmptyAnchor = styled.a`
  text-decoration: none;
  width: ${(props) => props.width || 'auto'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
