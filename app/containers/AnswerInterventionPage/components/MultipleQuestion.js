import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import HoverableBox from 'components/Box/HoverableBox';
import checkbox from 'assets/svg/checkbox.svg';
import checkboxChecked from 'assets/svg/checkbox-checked.svg';

const margin = 21;

const MultipleQuestion = ({ question, answerBody, selectAnswer }) => {
  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState([]);

  const check = (payload, value, name, index) => {
    const selectedAnswer = {
      variable: name,
      payload,
      value,
    };
    if (selectedAnswersIndex.includes(index)) {
      setSelectedAnswersIndex(
        selectedAnswersIndex.filter(item => item !== index),
      );
      selectAnswer(
        answerBody.filter(item => item.value !== selectedAnswer.value),
      );
    } else {
      setSelectedAnswersIndex([...selectedAnswersIndex, index]);
      selectAnswer([...answerBody, selectedAnswer]);
    }
  };

  const {
    body: { data },
  } = question;
  return (
    <Column mt={10} mb={10}>
      {data.map((questionAnswer, index) => {
        const {
          payload,
          variable: { name, value },
        } = questionAnswer;
        return (
          <Row key={`question-${question.id}-el-${index}`}>
            <HoverableBox
              px={margin}
              py={14}
              mx={margin}
              width={`calc(100% + ${margin}px)`}
              clickable
              onClick={() => check(payload, value, name, index)}
            >
              <Row align="center">
                <Img
                  src={
                    selectedAnswersIndex.includes(index)
                      ? checkboxChecked
                      : checkbox
                  }
                  mr={16}
                />
                {payload}
              </Row>
            </HoverableBox>
          </Row>
        );
      })}
    </Column>
  );
};

MultipleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
};

export default MultipleQuestion;
