import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';
import MultipleQuestionLayout from '../layouts/MultipleQuestionLayout';

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
    <MultipleQuestionLayout
      data={data}
      questionId={id}
      check={check}
      selectedAnswersIndex={selectedAnswersIndex}
    />
  );
};

MultipleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
};

export default MultipleQuestion;
