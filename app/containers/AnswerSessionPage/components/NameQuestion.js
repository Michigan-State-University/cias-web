import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { QuestionDTO } from 'models/Question';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import NameQuestionLayout from '../layouts/NameQuestionLayout';
import { makeSelectUserSession } from '../selectors';

const NameQuestion = ({
  question,
  answerBody,
  selectAnswer,
  formatMessage,
  isAnimationOngoing,
  isDesktop,
  userSession: { id },
}) => {
  const {
    body: {
      variable: { name: variableName },
    },
    settings: { required },
  } = question;

  /*
   * Initial set of answer value
   * Without it, it crashes when Question is not `required`
   */
  useEffect(() => {
    if (!required)
      selectAnswer([
        {
          var: variableName,
          value: {
            name: '',
          },
        },
      ]);
  }, []);

  const onChange = (event) => {
    const value = { ...event };
    const { phoneticName, name } = event;
    if (phoneticName === undefined && name !== undefined) {
      value.phoneticName = name;
    }
    selectAnswer([
      {
        var: variableName,
        value,
      },
    ]);
  };

  return (
    <NameQuestionLayout
      formatMessage={formatMessage}
      onChange={onChange}
      answerBody={answerBody?.[0]}
      phoneticPreviewParams={{ user_session_id: id }}
      isAnimationOngoing={isAnimationOngoing}
      isDesktop={isDesktop}
    />
  );
};

NameQuestion.propTypes = {
  question: PropTypes.shape(QuestionDTO).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
  userSession: PropTypes.object,
  isAnimationOngoing: PropTypes.bool,
  isDesktop: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  userSession: makeSelectUserSession(),
});

export default connect(mapStateToProps)(NameQuestion);
