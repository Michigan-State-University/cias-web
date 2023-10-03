import React from 'react';
import PropTypes from 'prop-types';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import DateQuestionLayout from '../layouts/DateQuestionLayout';

const DateQuestion = ({
  question,
  answerBody,
  selectAnswer,
  selectingAnswersDisabled,
}) => {
  const {
    body: {
      variable: { name },
    },
  } = question;

  const onChange = (event) => {
    if (isNullOrUndefined(event)) return;
    const date = new Date(event);
    selectAnswer([
      {
        var: name,
        value: date.toDateString(),
      },
    ]);
  };

  return (
    <DateQuestionLayout
      onChange={onChange}
      answerBody={answerBody?.[0]}
      disabled={selectingAnswersDisabled}
    />
  );
};

DateQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  selectingAnswersDisabled: PropTypes.bool,
};

export default DateQuestion;
