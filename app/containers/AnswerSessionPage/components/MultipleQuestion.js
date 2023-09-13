import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MultipleQuestionLayout from '../layouts/MultipleQuestionLayout';

const MultipleQuestion = ({ question, answerBody, selectAnswer, isMobile }) => {
  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState([]);

  const {
    body: { data },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswersIndex(
      answerBody.length ? answerBody.map((answer) => answer.index) : [],
    );
  }, [id]);

  const check = (value, name, index) => {
    const selectedAnswer = {
      var: name,
      value,
      index,
    };
    if (selectedAnswersIndex.includes(index)) {
      setSelectedAnswersIndex(
        selectedAnswersIndex.filter((item) => item !== index),
      );
      selectAnswer(
        answerBody.filter((item) => item.var !== selectedAnswer.var),
      );
    } else {
      setSelectedAnswersIndex([...selectedAnswersIndex, index]);
      selectAnswer([...answerBody, selectedAnswer]);
    }
  };
  return (
    <MultipleQuestionLayout
      data={data}
      questionId={id}
      check={check}
      selectedAnswersIndex={selectedAnswersIndex}
      isMobile={isMobile}
    />
  );
};

MultipleQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default MultipleQuestion;
