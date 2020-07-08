import styled, { keyframes } from 'styled-components';

const INNER_CIRCLE_SCALE = 2 / 3;

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;

export const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  &:after {
    content: ' ';
    display: block;
    width: ${({ size }) => `${size * INNER_CIRCLE_SCALE}px`};
    height: ${({ size }) => `${size * INNER_CIRCLE_SCALE}px`};
    border-radius: 50%;
    border: 6px solid ${({ color }) => color};
    border-color: ${({ color }) => `${color} transparent ${color} transparent`};
    animation: ${animation} 1.2s linear infinite;
  }
`;
