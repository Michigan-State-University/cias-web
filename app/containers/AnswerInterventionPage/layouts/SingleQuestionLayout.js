import React from 'react';
import PropTypes from 'prop-types';

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

        return (
          <Row key={`question-${questionId}-el-${index}`} mb={12}>
            <HoverableBox
              px={margin}
              py={14}
              width={`calc(100% + ${margin}px)`}
              clickable
              onClick={() => handleClick(payload, value, index)}
            >
              <Row align="center" height="44">
                <Radio checked={isChecked} mr={16} />
                <div dangerouslySetInnerHTML={{ __html: payload }} />
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
