import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';
import SingleQuestionLayout from '../layouts/SingleQuestionLayout';

const SingleQuestion = ({
  question,
  answerBody,
  selectAnswer,
  saveAnswer,
  questionIndex,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const {
    body: {
      data,
      variable: { name },
    },
    settings: { proceed_button: proceedButton },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswerIndex(answerBody.length ? answerBody[0].index : null);
  }, [id]);

  const handleClick = (value, index) => {
    selectAnswer([
      {
        var: name,
        value,
        index,
      },
    ]);
    setSelectedAnswerIndex(index);

    if (!proceedButton) {
      saveAnswer(questionIndex + 1);
    }
  };

  return (
    <SingleQuestionLayout
      data={data}
      handleClick={handleClick}
      questionId={id}
      selectedAnswerIndex={selectedAnswerIndex}
    />
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
  questionIndex: PropTypes.string,
  saveAnswer: PropTypes.func,
};

export default SingleQuestion;
