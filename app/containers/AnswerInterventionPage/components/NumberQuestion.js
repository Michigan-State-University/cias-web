import React from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';

import NumberQuestionLayout from '../layouts/NumberQuestionLayout';
import messages from '../layouts/messages';
import { NUMBER_VALIDATION_ERROR } from '../constants';

const NumberQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
  showError,
}) => {
  const {
    body: {
      variable: { name },
    },
  } = question;

  const onChange = event => {
    selectAnswer([
      {
        var: name,
        value: parseInt(event, 10),
      },
    ]);
  };

  const onValidation = validationResult =>
    !validationResult &&
    showError(formatMessage(messages.numberValidationError), {
      id: NUMBER_VALIDATION_ERROR,
    });

  return (
    <NumberQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody[0]}
      onValidation={onValidation}
    />
  );
};

NumberQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
  showError: PropTypes.func,
};

export default NumberQuestion;
