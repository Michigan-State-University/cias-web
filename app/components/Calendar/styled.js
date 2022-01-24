import styled from 'styled-components';

export const Container = styled.div`
  height: 600px;

  ${({ mobile }) =>
    mobile &&
    `
      height: auto;
    `}
`;
