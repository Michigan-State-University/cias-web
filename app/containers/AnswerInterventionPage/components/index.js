import React from 'react';

import ErrorAlert from 'components/ErrorAlert';
import { singleQuestion } from 'models/Intervention/QuestionTypes';

import SingleQuestion from './SingleQuestion';

export const renderQuestionByType = (question, sharedProps) => {
  const { type } = question;
  switch (type) {
    case singleQuestion.id:
      return <SingleQuestion question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
