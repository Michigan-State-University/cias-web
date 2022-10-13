import styled from 'styled-components';

import { colors } from 'theme';

import { ActiveIndicatorType } from 'models/Character';

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

const commonIndicatorProps = (size) => ({
  display: 'inherit',
  backgroundColor: colors.blueHaze,
  width: 2 * size.width,
  height: 2 * size.height,
  opacity: 0.5,
});

const getIndicatorStyles = (indicatorType) => {
  switch (indicatorType) {
    case ActiveIndicatorType.CIRCLE:
      return {
        transform: 'scale(0.4)',
        left: '-50%',
        top: '-45%',
        borderRadius: '50%',
        animation: 'circle-indicator .6s linear 0.0001s infinite alternate',
      };
    case ActiveIndicatorType.RECTANGLE:
      return {
        transform: 'scale(0.54)',
        left: '-50%',
        top: '-50%',
        borderRadius: '8px',
        animation: 'rectangle-indicator .6s linear 0.0001s infinite alternate',
      };
    default:
      return {};
  }
};

export const CharacterActiveIndicator = styled.div`
  @keyframes circle-indicator {
    from {
      transform: scale(0.4);
    }
    to {
      transform: scale(0.55);
    }
  }

  @keyframes rectangle-indicator {
    from {
      transform: scale(0.54);
    }
    to {
      transform: scale(0.58);
    }
  }

  &:before {
    content: '';
    position: absolute;
    display: none;

    ${({ $active, $characterConfig: { size, activeIndicatorType } }) =>
      $active
        ? {
            ...commonIndicatorProps(size),
            ...getIndicatorStyles(activeIndicatorType),
          }
        : {}};
  }
`;
