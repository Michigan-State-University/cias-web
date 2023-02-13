import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SingleQuestionLayout from '../layouts/SingleQuestionLayout';

const SingleQuestion = ({
  question,
  answerBody,
  selectAnswer,
  saveAnswer,
  isMobile,
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
      saveAnswer();
    }
  };

  return (
    <SingleQuestionLayout
      data={data}
      handleClick={handleClick}
      questionId={id}
      selectedAnswerIndex={selectedAnswerIndex}
      isMobile={isMobile}
    />
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
  saveAnswer: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default SingleQuestion;
