import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { loadState } from 'utils/persist';

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
}) => {
  const {
    body: {
      variable: { name },
    },
  } = question;

  const { user: { email: loggedInUserEmail } = {} } = loadState() ?? {};

  const [answer, setAnswer] = useState({ value: { email: loggedInUserEmail } });

  const onEmailValidation = validationResult =>
    !validationResult &&
    showError(formatMessage(messages.emailValidationError), {
      toastId: PARTICIPANT_REPORT_VALIDATION_ERROR,
    });

  const saveAnswer = value =>
    selectAnswer([
      {
        var: name,
        value,
      },
    ]);

  const onChange = event => {
    const { email, receive_report: option } = event;

    if (option === NO_OPTION) {
      saveAnswer(event);
      setAnswer({ value: event });
    }
    if (option === YES_OPTION) {
      if (!isNullOrUndefined(email) && email !== '') saveAnswer(event);
      else saveAnswer(undefined);
      setAnswer({ value: event });
    }
  };

  return (
    <ParticipantReportQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answer}
      onValidation={onEmailValidation}
      showEmailInput={isNullOrUndefined(loggedInUserEmail)}
      userEmail={loggedInUserEmail}
    />
  );
};

ParticipantReportQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  formatMessage: PropTypes.func,
  showError: PropTypes.func,
};

export default ParticipantReportQuestion;
