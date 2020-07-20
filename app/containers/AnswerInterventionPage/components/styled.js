import styled from 'styled-components';

export const animationDuration = 1480;

export const NarratorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  > div {
    transition: all ${animationDuration}ms cubic-bezier(0.65, 0.05, 0.36, 1);
  }
`;
