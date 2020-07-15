import React from 'react';

import ErrorAlert from 'components/ErrorAlert';
import {
  gridQuestion,
  multiQuestion,
  numberQuestion,
  singleQuestion,
  visualAnalogueScaleQuestion,
  textboxQuestion,
} from 'models/Intervention/QuestionTypes';
import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import GridQuestion from './GridQuestion';
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';
import TextBoxQuestion from './TextBoxQuestion';
import NumberQuestion from './NumberQuestion';

export const renderQuestionByType = (question, sharedProps) => {
  const { type } = question;
  switch (type) {
    case singleQuestion.id:
      return <SingleQuestion question={question} {...sharedProps} />;
    case multiQuestion.id:
      return <MultipleQuestion question={question} {...sharedProps} />;
    case gridQuestion.id:
      return <GridQuestion question={question} {...sharedProps} />;
    case visualAnalogueScaleQuestion.id:
      return (
        <VisualAnalogueScaleQuestion question={question} {...sharedProps} />
      );
    case textboxQuestion.id:
      return <TextBoxQuestion question={question} {...sharedProps} />;
    case numberQuestion.id:
      return <NumberQuestion question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
