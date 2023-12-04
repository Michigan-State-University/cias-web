import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import FeedbackQuestionLayout from '../layouts/Feedback/FeedbackQuestionLayout';

const FeedbackQuestion = ({
  question,
  selectAnswer,
  feedbackScreenSettings: { showSpectrum },
  setFeedbackSettings,
  dynamicElementsDirection,
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
      targetValue={targetValue ?? { target: 0 }}
      showSpectrum={showSpectrum}
      setFeedbackSettings={setFeedbackSettings}
      dynamicElementsDirection={dynamicElementsDirection}
    />
  );
};

FeedbackQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  feedbackScreenSettings: PropTypes.object,
  setFeedbackSettings: PropTypes.func,
  dynamicElementsDirection: PropTypes.string,
};

export default FeedbackQuestion;
