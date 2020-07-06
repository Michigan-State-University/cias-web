import React from 'react';
import ErrorAlert from 'components/ErrorAlert';
import SingleQuestion from './SingleQuestion';

export const renderQuestionByType = (question, sharedProps) => {
  const {
    attributes: { type },
  } = question;
  switch (type) {
    case 'Question::Single':
      return <SingleQuestion question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
