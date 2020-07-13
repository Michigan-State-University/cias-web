import React from 'react';

import ErrorAlert from 'components/ErrorAlert';
import {
  gridQuestion,
  multiQuestion,
  singleQuestion,
  textboxQuestion,
} from 'models/Intervention/QuestionTypes';
import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import GridQuestion from './GridQuestion';
import TextBoxQuestion from './TextBoxQuestion';

export const renderQuestionByType = (question, sharedProps) => {
  const { type } = question;
  switch (type) {
    case singleQuestion.id:
      return <SingleQuestion question={question} {...sharedProps} />;
    case multiQuestion.id:
      return <MultipleQuestion question={question} {...sharedProps} />;
    case gridQuestion.id:
      return <GridQuestion question={question} {...sharedProps} />;
    case textboxQuestion.id:
      return <TextBoxQuestion question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
