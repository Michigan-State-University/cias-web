import React from 'react';
import PropTypes from 'prop-types';

import { htmlToPlainText } from 'utils/htmlToPlainText';
import { getAnswerImageSize } from 'utils/getAnswerImageSize';

import Column from 'components/Column';
import Row from 'components/Row';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';
import AudioTextPreview from 'components/AudioTextPreview';

import AnswerContent from '../components/AnswerContent';

const margin = 21;

const SingleQuestionLayout = ({
  data,
  handleClick,
  questionId,
  selectedAnswerIndex,
  isMobile,
  disabled,
  dynamicElementsDirection,
  answerImages = [],
  answerImageSize = 'medium',
}) => (
  <Column dir={dynamicElementsDirection}>
    <Box>
      {data.map((questionAnswer, index) => {
        const {
          payload,
          value,
          hfh_value: hfhValue,
          id: answerId,
        } = questionAnswer;
        const isChecked = selectedAnswerIndex === index;
        const ariaInputId = `answer-${index + 1}`;
        const key = `question-${questionId}-el-${index}`;

        // Find the image for this answer
        const answerImage = answerImages.find(
          (img) => img.answer_id === answerId,
        );

        return (
          <Row key={key} marginBlockEnd={12} align="center">
            {!isMobile && (
              <AudioTextPreview
                text={htmlToPlainText(payload)}
                previewKey={key}
              />
            )}
            <HoverableBox
              paddingInline={margin}
              paddingBlock={14}
              filled
              clickable
              onClick={(event) => {
                event.preventDefault();
                handleClick(value, index, hfhValue);
              }}
              disabled={disabled}
              data-cy={`single-question-answer-${index}`}
            >
              <Radio
                id={ariaInputId}
                data-cy={`single-question-${index}-checkbox`}
                checked={isChecked}
              >
                <AnswerContent
                  answerImage={answerImage}
                  payload={payload}
                  index={index}
                  imageMaxWidth={getAnswerImageSize(answerImageSize)}
                />
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
  disabled: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
  answerImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
      answer_id: PropTypes.string.isRequired,
    }),
  ),
  answerImageSize: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default SingleQuestionLayout;
