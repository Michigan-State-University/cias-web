import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';

import radio from 'assets/svg/radio-button.svg';
import radioChecked from 'assets/svg/radio-button-checked.svg';

import Question from 'models/Intervention/Question';

const margin = 21;

const SingleQuestion = ({ question, selectAnswer }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const {
    body: {
      data,
      variable: { name },
    },
  } = question;
  return (
    <Column mt={10} mb={10}>
      {data.map((questionAnswer, index) => {
        const { payload, value } = questionAnswer;
        return (
          <Row key={`question-${question.id}-el-${index}`}>
            <HoverableBox
              px={margin}
              py={14}
              mx={-margin}
              width={`calc(100% + ${margin}px)`}
              clickable
              onClick={() => {
                selectAnswer([
                  {
                    variable: name,
                    payload,
                    value,
                  },
                ]);
                setSelectedAnswerIndex(index);
              }}
            >
              <Row align="center">
                <Img
                  src={selectedAnswerIndex === index ? radioChecked : radio}
                  mr={16}
                />
                <Box dangerouslySetInnerHTML={{ __html: payload }} />
              </Row>
            </HoverableBox>
          </Row>
        );
      })}
    </Column>
  );
};

SingleQuestion.propTypes = {
  question: PropTypes.shape(Question).isRequired,
  selectAnswer: PropTypes.func,
};

export default SingleQuestion;
