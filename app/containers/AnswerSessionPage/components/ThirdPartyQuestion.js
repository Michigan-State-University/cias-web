import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Session/Question';
import ThirdPartyQuestionLayout from '../layouts/ThirdPartyQuestionLayout';

const ThirdPartyQuestion = ({
  question,
  answerBody,
  selectAnswer,
  saveAnswer,
  questionIndex,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const {
    body: { data },
    settings: { proceed_button: proceedButton },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswerIndex(answerBody.length ? answerBody[0].index : null);
  }, [id]);

  const handleClick = (value, reportTemplateIds, index) => {
    selectAnswer([
      {
        value,
        report_template_ids: reportTemplateIds,
        index,
      },
    ]);
    setSelectedAnswerIndex(index);

    if (proceedButton) {
      saveAnswer(questionIndex + 1);
    }
  };

  return (
    <ThirdPartyQuestionLayout
      data={data}
      handleClick={handleClick}
      questionId={id}
      selectedAnswerIndex={selectedAnswerIndex}
    />
  );
};

ThirdPartyQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
  questionIndex: PropTypes.number,
  saveAnswer: PropTypes.func,
};

export default ThirdPartyQuestion;
