import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import {
  allAudioPreviewSagas,
  AudioPreviewReducer,
  phoneticPreviewRequest,
  makeSelectAudioPreviewState,
  resetPhoneticPreview,
} from 'global/reducers/audioPreview';

import NameQuestionLayout from '../layouts/NameQuestionLayout';
import { makeSelectUserSession } from '../selectors';

const NameQuestion = ({
  phoneticPreview,
  question,
  answerBody,
  selectAnswer,
  formatMessage,
  previewState: { phoneticUrl, phoneticLoading },
  isAnimationOngoing,
  isDesktop,
  resetAudioPreview,
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
    resetAudioPreview();
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
      phoneticPreview(value.phoneticName, { user_session_id: id });
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
      phoneticUrl={phoneticUrl}
      phoneticLoading={phoneticLoading}
      isAnimationOngoing={isAnimationOngoing}
      isDesktop={isDesktop}
    />
  );
};

NameQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  phoneticPreview: PropTypes.func,
  answerBody: PropTypes.any,
  formatMessage: PropTypes.func,
  resetAudioPreview: PropTypes.func,
  previewState: PropTypes.object,
  userSession: PropTypes.object,
  isAnimationOngoing: PropTypes.bool,
  isDesktop: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  previewState: makeSelectAudioPreviewState(),
  userSession: makeSelectUserSession(),
});

const mapDispatchToProps = {
  phoneticPreview: phoneticPreviewRequest,
  resetAudioPreview: resetPhoneticPreview,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({ key: 'audioPreview', reducer: AudioPreviewReducer }),
  injectSaga({
    key: 'audioPreview',
    saga: allAudioPreviewSagas,
  }),
  withConnect,
)(NameQuestion);
