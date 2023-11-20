import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ThirdPartyQuestionLayout from '../layouts/ThirdPartyQuestionLayout';

const ThirdPartyQuestion = ({
  question,
  answerBody,
  selectAnswer,
  isMobile,
  disabled,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const {
    body: {
      data,
      variable: { name },
    },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswerIndex(answerBody.length ? answerBody[0].index : null);
  }, [id]);

  const handleClick = (value, reportTemplateIds, numericValue, index) => {
    selectAnswer([
      {
        var: name,
        value,
        report_template_ids: reportTemplateIds,
        numeric_value: numericValue,
        index,
      },
    ]);
    setSelectedAnswerIndex(index);
  };

  return (
    <ThirdPartyQuestionLayout
      data={data}
      handleClick={handleClick}
      questionId={id}
      selectedAnswerIndex={selectedAnswerIndex}
      isMobile={isMobile}
      disabled={disabled}
    />
  );
};

ThirdPartyQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  answerBody: PropTypes.any,
  selectAnswer: PropTypes.func,
  isMobile: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ThirdPartyQuestion;
