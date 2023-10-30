import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import VisualAnalogueScaleQuestionLayout from '../layouts/VisualAnalogueScaleQuestionLayout';

const VisualAnalogueScaleQuestion = ({
  question,
  answerBody,
  selectAnswer,
  disabled,
  dynamicElementsDirection,
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

  const onChange = (num) => !disabled && setAnswerValue(num);

  const onAfterChange = () => {
    if (disabled) return;
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
      dynamicElementsDirection={dynamicElementsDirection}
    />
  );
};

VisualAnalogueScaleQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  disabled: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
};

export default VisualAnalogueScaleQuestion;
