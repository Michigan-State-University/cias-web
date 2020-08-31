import styled from 'styled-components';

export const NarratorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1500;
  ${props =>
    props.canBeDragged
      ? `height: 100%;
          width: 100%;`
      : `height: 0%;
          width: 0%`}

  > div {
    width: ${({ width }) => `${width}px`};
    cursor: ${props => (props.canBeDragged ? 'grab' : 'default')};
  }
  image {
    pointer-events: none;
  }
`;

export const lottieStyles = {
  margin: 'none',
};
