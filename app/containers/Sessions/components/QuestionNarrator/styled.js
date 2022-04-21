import styled from 'styled-components';
import { colors } from 'theme';

export const NarratorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1500;
  ${(props) =>
    props.canBeDragged
      ? `height: 100%;
          width: 100%;`
      : `height: 0%;
          width: 0%`}

  > div {
    width: ${({ width }) => `${width}px`};
    cursor: ${(props) => (props.canBeDragged ? 'grab' : 'default')};
  }
  image {
    pointer-events: none;
  }
`;

export const lottieStyles = {
  margin: 'none',
};

export const CharacterActiveIndicator = styled.div`
  @keyframes indicator {
    from {
      transform: scale(0.4);
    }
    to {
      transform: scale(0.55);
    }
  }

  &:before {
    content: '';
    position: absolute;
    display: none;

    ${({ $active }) =>
      $active
        ? {
            display: 'inherit',
            backgroundColor: colors.blueHaze,
            width: 200,
            height: 200,
            left: '-50%',
            top: '-45%',
            opacity: 0.5,
            borderRadius: '50%',
            animation: 'indicator .6s linear 0s infinite alternate',
          }
        : {}};
  }
`;
