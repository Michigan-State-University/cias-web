import React from 'react';
import PropTypes from 'prop-types';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import CurrencyQuestionLayout from '../layouts/CurrencyQuestionLayout';

const CurrencyQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
  disabled,
}) => {
  const {
    body: {
      variable: { name },
    },
  } = question;

  const onChange = (value) => {
    if (isNullOrUndefined(value)) return;

    selectAnswer([
      {
        var: name,
        value,
      },
    ]);
  };

  return (
    <CurrencyQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody?.[0]}
      disabled={disabled}
    />
  );
};

CurrencyQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CurrencyQuestion;
