import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import VisualAnalogueScaleQuestionLayout from '../layouts/VisualAnalogueScaleQuestionLayout';

const VisualAnalogueScaleQuestion = ({
  question,
  answerBody,
  selectAnswer,
}) => {
  const {
    body: {
      data: [
        {
          payload: {
            start_value: startValue,
            end_value: endValue,
            range_start: rangeStart,
            range_end: rangeEnd,
          },
        },
      ],
      variable: { name },
    },
    id,
    settings: { show_number: showNumber },
  } = question;

  const { value } = answerBody.length ? answerBody[0] : { value: rangeStart };
  const [answerValue, setAnswerValue] = useState(value);

  useEffect(() => {
    selectAnswer(
      [
        {
          var: name,
          value,
        },
      ],
      false,
    );
    setAnswerValue(value);
  }, [id]);

  const onChange = (num) => setAnswerValue(num);

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
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
    />
  );
};

VisualAnalogueScaleQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
};

export default VisualAnalogueScaleQuestion;
