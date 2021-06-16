import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import Column from 'components/Column';
import Row from 'components/Row';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';

const margin = 21;

const SingleQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
}) => (
  <Column>
    <Box>
      {data.map((questionAnswer, index) => {
        const { payload, value } = questionAnswer;
        const isChecked = selectedAnswerIndex === index;
        const ariaInputId = `answer-${index + 1}`;

        return (
          <Row key={`question-${questionId}-el-${index}`} mb={12}>
            <HoverableBox
              px={margin}
              py={14}
              width={`calc(100% + ${margin}px)`}
              clickable
              onClick={() => handleClick(value, index)}
            >
              <Row align="center" height="44">
                <Radio
                  id={ariaInputId}
                  data-cy={`single-question-${index}-checkbox`}
                  checked={isChecked}
                  mr={16}
                />

                <label htmlFor={ariaInputId}>
                  <Markup content={payload} />
                </label>
              </Row>
            </HoverableBox>
          </Row>
        );
      })}
    </Box>
  </Column>
);

SingleQuestionLayout.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func,
  selectedAnswerIndex: PropTypes.number,
  questionId: PropTypes.string,
};

export default SingleQuestionLayout;
