import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';
import FeedbackQuestionLayout from '../layouts/Feedback/FeedbackQuestionLayout';

const FeedbackQuestion = ({
  question,
  selectAnswer,
  feedbackScreenSettings: { showSpectrum },
  setFeedbackSettings,
}) => {
  const {
    body: {
      data: [
        {
          payload: {
            start_value: startValue,
            end_value: endValue,
            target_value: targetValue,
          },
        },
      ],
    },
    id,
  } = question;

  useEffect(() => {
    selectAnswer();
  }, [id]);

  return (
    <FeedbackQuestionLayout
      startValue={startValue}
      endValue={endValue}
      targetValue={targetValue}
      showSpectrum={showSpectrum}
      setFeedbackSettings={setFeedbackSettings}
    />
  );
};

FeedbackQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  feedbackScreenSettings: PropTypes.object,
  setFeedbackSettings: PropTypes.func,
};

export default FeedbackQuestion;
