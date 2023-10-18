import React, { useState } from 'react';
import PropTypes from 'prop-types';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import { loadState } from 'utils/persist';
import { emailValidator } from 'utils/validators';

import ParticipantReportQuestionLayout, {
  NO_OPTION,
  YES_OPTION,
} from '../layouts/ParticipantReportQuestionLayout';
import messages from '../messages';
import { PARTICIPANT_REPORT_VALIDATION_ERROR } from '../constants';

const ParticipantReportQuestion = ({
  question,
  selectAnswer,
  formatMessage,
  showError,
  disabled,
}) => {
  const {
    body: {
      variable: { name },
    },
  } = question;

  const { user: { email: loggedInUserEmail } = {} } = loadState() ?? {};

  const [answer, setAnswer] = useState({ value: { email: loggedInUserEmail } });

  const saveAnswer = (value) =>
    selectAnswer([
      {
        var: name,
        value,
      },
    ]);

  const clearAnswer = () => {
    selectAnswer([]);
  };

  const onEmailValidation = (validationResult) => {
    if (!validationResult) {
      clearAnswer();
      setAnswer({ value: { receive_report: answer.value.receive_report } });
      showError(formatMessage(messages.emailValidationError), {
        toastId: PARTICIPANT_REPORT_VALIDATION_ERROR,
      });
    }
  };

  const onChange = (event) => {
    const { email, receive_report: option } = event;

    if (option === NO_OPTION) {
      saveAnswer(event);
    }
    if (option === YES_OPTION) {
      if (!isNullOrUndefined(email) && emailValidator(email)) saveAnswer(event);
      else clearAnswer();
    }

    setAnswer({ value: event });
  };

  return (
    <ParticipantReportQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answer}
      onValidation={onEmailValidation}
      showEmailInput={isNullOrUndefined(loggedInUserEmail)}
      userEmail={loggedInUserEmail}
      disabled={disabled}
    />
  );
};

ParticipantReportQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
  showError: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ParticipantReportQuestion;
