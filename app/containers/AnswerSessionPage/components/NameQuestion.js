import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { phoneticPreviewRequest } from '../actions';
import { makeSelectPhoneticUrl, makeSelectPhoneticLoading } from '../selectors';

import NameQuestionLayout from '../layouts/NameQuestionLayout';

const NameQuestion = ({
  phoneticPreview,
  question,
  answerBody,
  selectAnswer,
  formatMessage,
  phoneticUrl,
  phoneticLoading,
  isAnimationOngoing,
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

  const onChange = event => {
    const value = { ...event };
    const { phoneticName, name } = event;
    if (phoneticName === undefined && name !== undefined) {
      value.phoneticName = name;
    }
    if (value.phoneticName) {
      phoneticPreview(value.phoneticName);
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
      answerBody={answerBody[0]}
      phoneticUrl={phoneticUrl}
      phoneticLoading={phoneticLoading}
      isAnimationOngoing={isAnimationOngoing}
    />
  );
};

NameQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  phoneticPreview: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
  phoneticUrl: PropTypes.any,
  phoneticLoading: PropTypes.bool,
  isAnimationOngoing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  phoneticUrl: makeSelectPhoneticUrl(),
  phoneticLoading: makeSelectPhoneticLoading(),
});

const mapDispatchToProps = {
  phoneticPreview: phoneticPreviewRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameQuestion);
