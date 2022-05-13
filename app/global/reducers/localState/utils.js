import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  reflectionType,
} from 'models/Narrator/BlockTypes';

export const getPreviewData = (data) => {
  switch (data.type) {
    case speechType:
    case reflectionType:
      return data;

    case headAnimationType:
    case bodyAnimationType:
    default:
      return { type: 'BodyAnimation', animation: data.animation };
  }
};
