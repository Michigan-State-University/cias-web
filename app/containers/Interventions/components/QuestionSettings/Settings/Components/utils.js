import React from 'react';

import { colors } from 'theme';
import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  blockTypeToColorMap,
  readQuestionBlockType,
  reflectionType,
  pauseType,
  feedbackBlockType,
  reflectionFormulaType,
} from 'models/Narrator/BlockTypes';

import AnimationBlock from './Blocks/AnimationBlock';
import ReflectionBlock from './Blocks/Reflections/ReflectionBlock';
import SpeechBlock from './Blocks/SpeechBlock';
import PauseBlock from './Blocks/PauseBlock';
import FeedbackBlock from './Blocks/FeedbackBlock';
import ReflectionFormulaBlock from './Blocks/Reflections/ReflectionFormulaBlock';

export const getBlockColor = (type, { animation, voice }) => {
  switch (type) {
    case bodyAnimationType:
      return animation ? blockTypeToColorMap[type] : colors.grey;
    case speechType:
    case reflectionType:
    case reflectionFormulaType:
      return voice ? blockTypeToColorMap[type] : colors.grey;
    case readQuestionBlockType:
      return voice ? blockTypeToColorMap[type] : colors.grey;
    case headAnimationType:
      return animation ? blockTypeToColorMap[type] : colors.grey;
    case pauseType:
      return animation || voice ? blockTypeToColorMap[type] : colors.grey;
    case feedbackBlockType:
      return blockTypeToColorMap[type];
    default:
      return null;
  }
};

export const renderBlock = (block, index, id, formatMessage) => {
  const sharedProps = {
    formatMessage,
    block,
    id,
    blockIndex: index,
  };
  switch (block.type) {
    case bodyAnimationType:
    case headAnimationType:
      return <AnimationBlock {...sharedProps} />;
    case speechType:
    case readQuestionBlockType:
      return <SpeechBlock {...sharedProps} />;
    case reflectionType:
      return <ReflectionBlock {...sharedProps} />;
    case reflectionFormulaType:
      return <ReflectionFormulaBlock {...sharedProps} />;
    case pauseType:
      return <PauseBlock {...sharedProps} />;
    case feedbackBlockType:
      return <FeedbackBlock {...sharedProps} />;
    default:
      return null;
  }
};
