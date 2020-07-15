import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import Box from 'components/Box';
import AppSlider from 'components/AppSlider';

const VisualAnalogueScaleQuestion = ({
  question,
  answerBody,
  selectAnswer,
}) => {
  const { payload: value } = answerBody[0] ? answerBody[0] : { payload: 0 };
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
  } = question;

  useEffect(() => {
    selectAnswer([
      {
        var: name,
        payload: value,
      },
    ]);
  }, []);

  return (
    <Column mt={10} mb={10}>
      <Box width="100%">
        <Row>
          <Box width="100%" mt={25}>
            <AppSlider
              showValue
              step={1}
              onChange={num => setAnswerValue(num)}
              value={answerValue}
              onAfterChange={() => {
                selectAnswer([
                  {
                    var: name,
                    payload: answerValue,
                  },
                ]);
              }}
            />
          </Box>
        </Row>
        <Row justify="between" filled padding="5px">
          <Box>{startValue}</Box>
          <Box>{endValue}</Box>
        </Row>
      </Box>
    </Column>
  );
};

VisualAnalogueScaleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
};

export default VisualAnalogueScaleQuestion;
