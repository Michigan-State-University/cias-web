import { QuestionTypes } from 'models/Question';

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

const offsetFromBottom = 50;

export const characterInitialPosition = {
  x: CHARACTER_POSITIONS.bottomRightCorner.x,
  y: CHARACTER_POSITIONS.bottomRightCorner.y - offsetFromBottom,
};

export const CHARACTER_FIXED_POSITION = CHARACTER_POSITIONS.topLeftCorner;

export const CHARACTER_FIXED_POSITION_QUESTIONS = [
  QuestionTypes.TLFB_CONFIG,
  QuestionTypes.TLFB_EVENTS,
  QuestionTypes.TLFB_QUESTION,
];
