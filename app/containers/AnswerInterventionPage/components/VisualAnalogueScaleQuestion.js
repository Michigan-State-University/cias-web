import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';
import VisualAnalogueScaleQuestionLayout from '../layouts/VisualAnalogueScaleQuestionLayout';

const VisualAnalogueScaleQuestion = ({
  question,
  answerBody,
  selectAnswer,
}) => {
  const { payload: value } = answerBody.length ? answerBody[0] : { payload: 0 };
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
  } = question;

  useEffect(() => {
    selectAnswer([
      {
        var: name,
        payload: value,
      },
    ]);
    setAnswerValue(value);
  }, [id]);

  const onChange = num => setAnswerValue(num);

  const onAfterChange = () => {
    selectAnswer([
      {
        var: name,
        payload: answerValue,
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
    />
  );
};

VisualAnalogueScaleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
};

export default VisualAnalogueScaleQuestion;
