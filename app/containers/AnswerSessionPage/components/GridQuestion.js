import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GridQuestionLayout from '../layouts/GridQuestionLayout';

const GridQuestion = ({
  question,
  answerBody,
  selectAnswer,
  saveAnswer,
  disabled,
}) => {
  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [updated, setUpdated] = useState(false);

  const {
    id,
    body,
    settings: { proceed_button: proceedButton, required },
  } = question;

  const {
    payload: { rows, columns },
  } = body.data[0];

  useEffect(() => {
    if (answerBody.length) {
      let answerIndex = {};
      let answers = {};
      answerBody.forEach((answer, index) => {
        answerIndex = { ...answerIndex, ...answer.index };
        answers = { ...answers, [index]: { ...answer } };
      });
      setSelectedAnswersIndex(answerIndex);
      setSelectedAnswers(answers);
    } else {
      setSelectedAnswersIndex({});
      setSelectedAnswers({});
    }
  }, [id]);

  useEffect(() => {
    if (updated) {
      if (Object.keys(selectedAnswersIndex).length === rows.length) {
        selectAnswer(Object.values(selectedAnswers));
        if (!proceedButton) {
          saveAnswer();
        }
      } else if (!required) {
        selectAnswer(Object.values(selectedAnswers));
      }
    }
  }, [selectedAnswersIndex, updated]);

  const check = (value, name, rowIndex, columnIndex) => {
    const selectedAnswer = {
      var: name,
      value,
      index: {
        [rowIndex]: columnIndex,
      },
    };

    setSelectedAnswersIndex({
      ...selectedAnswersIndex,
      [rowIndex]: columnIndex,
    });

    setSelectedAnswers({
      ...selectedAnswers,
      [rowIndex]: selectedAnswer,
    });

    setUpdated(true);
  };
  return (
    <GridQuestionLayout
      rows={rows}
      columns={columns}
      check={check}
      questionId={id}
      selectedAnswersIndex={selectedAnswersIndex}
      disabled={disabled}
    />
  );
};

GridQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  saveAnswer: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GridQuestion;
