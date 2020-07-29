import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';

import GridQuestionLayout from '../layouts/GridQuestionLayout';

const GridQuestion = ({
  question,
  answerBody,
  selectAnswer,
  questionIndex,
  saveAnswer,
}) => {
  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [updated, setUpdated] = useState(false);

  const {
    id,
    body,
    settings: { proceed_button: proceedButton },
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
    if (updated && Object.keys(selectedAnswersIndex).length === rows.length) {
      selectAnswer(Object.values(selectedAnswers));
      if (!proceedButton) {
        saveAnswer(questionIndex + 1);
      }
    }
  }, [selectedAnswersIndex, updated]);

  const check = (payload, value, name, rowIndex, columnIndex) => {
    const selectedAnswer = {
      var: name,
      payload,
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
    />
  );
};

GridQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  questionIndex: PropTypes.number,
  saveAnswer: PropTypes.func,
};

export default GridQuestion;
