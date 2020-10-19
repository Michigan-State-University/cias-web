const POSITION_VALUES = {
  minXPosition: 0,
  minYPosition: 0,
  maxXPosition: 600,
  maxYPosition: 600,
};

export const CHARACTER_POSITIONS = {
  topRightCorner: {
    x: POSITION_VALUES.maxXPosition,
    y: POSITION_VALUES.minYPosition,
  },
  topLeftCorner: {
    x: POSITION_VALUES.minXPosition,
    y: POSITION_VALUES.minYPosition,
  },
  bottomRightCorner: {
    x: POSITION_VALUES.maxXPosition,
    y: POSITION_VALUES.maxYPosition,
  },
  bottomLeftCorner: {
    x: POSITION_VALUES.minXPosition,
    y: POSITION_VALUES.maxYPosition,
  },
};
