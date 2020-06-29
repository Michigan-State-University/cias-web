import styled, { keyframes } from 'styled-components';

const animation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
}`;

export const StyledSpinner = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  &:after {
    content: ' ';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${animation} 1.2s linear infinite;
  }
`;
