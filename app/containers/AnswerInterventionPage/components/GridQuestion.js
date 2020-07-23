import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import Box from 'components/Box';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';
import Column from 'components/Column';
import Img from 'components/Img';
import radioChecked from 'assets/svg/radio-button-checked.svg';
import radio from 'assets/svg/radio-button.svg';

const GridQuestion = ({ question, answerBody, selectAnswer }) => {
  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (Object.keys(selectedAnswersIndex).length === rows.length) {
      selectAnswer(Object.values(selectedAnswers));
    }
  }, [selectedAnswers]);

  const { id, body } = question;
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
  };
  return (
    <Row align="center" justify="center" width="100%">
      <Box px={10} overflow="scroll">
        <Table>
          <THead>
            <StripedTR>
              <TH scope="col" />
              {columns.map((column, columnIndex) => (
                <TH
                  scope="col"
                  key={`question-${question.id}-col-th-${columnIndex}`}
                >
                  <Column>{column.payload}</Column>
                </TH>
              ))}
            </StripedTR>
          </THead>
          <TBody>
            {rows.map((row, rowIndex) => (
              <StripedTR key={`question-${question.id}-row-th-${rowIndex}`}>
                <TH scope="row">
                  <Column>{row.payload}</Column>
                </TH>
                {columns.map((column, columnIndex) => (
                  <TD
                    key={`question-${
                      question.id
                    }-row-cell-${rowIndex}-${columnIndex}`}
                  >
                    <Row
                      align="center"
                      justify="center"
                      onClick={() => {
                        const {
                          payload,
                          variable: { value },
                        } = column;
                        check(
                          payload,
                          value,
                          row.variable.name,
                          rowIndex,
                          columnIndex,
                        );
                      }}
                    >
                      <Img
                        src={
                          selectedAnswersIndex[rowIndex] === columnIndex
                            ? radioChecked
                            : radio
                        }
                      />
                    </Row>
                  </TD>
                ))}
              </StripedTR>
            ))}
          </TBody>
        </Table>
      </Box>
    </Row>
  );
};

GridQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
};

export default GridQuestion;
