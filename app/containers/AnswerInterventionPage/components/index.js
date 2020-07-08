import React from 'react';

import ErrorAlert from 'components/ErrorAlert';

import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import {
  multiQuestion,
  singleQuestion,
} from '../../../models/Intervention/QuestionTypes';

export const renderQuestionByType = (question, sharedProps) => {
  const { type } = question;
  switch (type) {
    case singleQuestion.id:
      return <SingleQuestion question={question} {...sharedProps} />;
    case multiQuestion.id:
      return <MultipleQuestion question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
