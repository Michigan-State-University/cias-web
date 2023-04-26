import React from 'react';
import PropTypes from 'prop-types';

import PhoneQuestionLayout from '../layouts/PhoneQuestionLayout';

const PhoneQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
}) => {
  const {
    body: {
      variable: { name },
    },
    settings: { required },
    time_ranges: availableTimeRanges,
  } = question;

  const onChange = (value) => {
    selectAnswer([
      {
        var: name,
        value: value ?? {},
      },
    ]);
  };

  return (
    <PhoneQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody?.[0]}
      required={required}
      availableTimeRanges={availableTimeRanges}
    />
  );
};

PhoneQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
};

export default PhoneQuestion;
