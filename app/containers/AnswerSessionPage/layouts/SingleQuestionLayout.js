import React from 'react';
import PropTypes from 'prop-types';
import { Markup } from 'interweave';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import Column from 'components/Column';
import Row from 'components/Row';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';
import AudioTextPreview from 'components/AudioTextPreview';

import { MarkupContainer } from './styled';

const margin = 21;

const SingleQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
  isMobile,
}) => (
  <Column>
    <Box>
      {data.map((questionAnswer, index) => {
        const { payload, value } = questionAnswer;
        const isChecked = selectedAnswerIndex === index;
        const ariaInputId = `answer-${index + 1}`;
        const key = `question-${questionId}-el-${index}`;

        return (
          <Row key={key} mb={12} align="center">
            {!isMobile && (
              <AudioTextPreview
                text={htmlToPlainText(payload)}
                previewKey={key}
              />
            )}
            <HoverableBox
              px={margin}
              py={14}
              filled
              clickable
              onClick={() => handleClick(value, index)}
            >
              <Radio
                id={ariaInputId}
                data-cy={`single-question-${index}-checkbox`}
                checked={isChecked}
              >
                <MarkupContainer>
                  <Markup content={payload} noWrap />
                </MarkupContainer>
              </Radio>
            </HoverableBox>
            {isMobile && (
              <AudioTextPreview
                text={htmlToPlainText(payload)}
                previewKey={key}
              />
            )}
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
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool,
};

export default SingleQuestionLayout;
