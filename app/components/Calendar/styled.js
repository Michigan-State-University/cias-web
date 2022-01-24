import styled from 'styled-components';

export const Container = styled.div`
  height: 660px;

  ${({ mobile }) =>
    mobile &&
    `
      height: auto;
    `}
`;
