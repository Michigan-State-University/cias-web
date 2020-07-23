import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import HoverableBox from 'components/Box/HoverableBox';
import checkbox from 'assets/svg/checkbox.svg';
import checkboxChecked from 'assets/svg/checkbox-checked.svg';
import Question from 'models/Intervention/Question';

const margin = 21;

const MultipleQuestion = ({ question, answerBody, selectAnswer }) => {
  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState([]);

  const {
    body: { data },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswersIndex(
      answerBody.length ? answerBody.map(answer => answer.index) : [],
    );
  }, [id]);

  const check = (payload, value, name, index) => {
    const selectedAnswer = {
      var: name,
      payload,
      value,
      index,
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
                <div dangerouslySetInnerHTML={{ __html: payload }} />
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
