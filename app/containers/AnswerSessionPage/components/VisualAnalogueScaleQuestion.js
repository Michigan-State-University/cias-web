import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import VisualAnalogueScaleQuestionLayout from '../layouts/VisualAnalogueScaleQuestionLayout';

const VisualAnalogueScaleQuestion = ({
  question,
  answerBody,
  selectAnswer,
}) => {
  const { value } = answerBody.length ? answerBody[0] : { value: 0 };
  const [answerValue, setAnswerValue] = useState(value);
  const {
    body: {
      data: [
        {
          payload: { start_value: startValue, end_value: endValue },
        },
      ],
      variable: { name },
    },
    id,
    settings: { show_number: showNumber },
  } = question;

  useEffect(() => {
    selectAnswer([
      {
        var: name,
        value,
      },
    ]);
    setAnswerValue(value);
  }, [id]);

  const onChange = num => setAnswerValue(num);

  const onAfterChange = () => {
    selectAnswer([
      {
        var: name,
        value: answerValue,
      },
    ]);
  };

  return (
    <VisualAnalogueScaleQuestionLayout
      onChange={onChange}
      onAfterChange={onAfterChange}
      startValue={startValue}
      endValue={endValue}
      answerValue={answerValue}
      showNumber={!isNullOrUndefined(showNumber) && showNumber}
    />
  );
};

VisualAnalogueScaleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
};

export default VisualAnalogueScaleQuestion;
