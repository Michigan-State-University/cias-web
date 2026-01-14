import React from 'react';
import PropTypes from 'prop-types';

import { htmlToPlainText } from 'utils/htmlToPlainText';
import { getAnswerImageSize } from 'utils/getAnswerImageSize';

import Column from 'components/Column';
import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import HoverableBox from 'components/Box/HoverableBox';
import AudioTextPreview from 'components/AudioTextPreview';

import AnswerContent from '../components/AnswerContent';

const margin = 21;

const MultipleQuestionLayout = ({
  data,
  questionId,
  check,
  selectedAnswersIndex,
  noneOfAboveAnswerIndex,
  noneOfAboveAnswerImage,
  isMobile,
  disabled,
  dynamicElementsDirection,
  answerImages = [],
  answerImageSize = 'medium',
}) => (
  <Column dir={dynamicElementsDirection}>
    {data
      .filter((item, index) => index !== noneOfAboveAnswerIndex)
      .map((questionAnswer, index) => {
        const {
          payload,
          variable: { name, value },
          id: answerId,
        } = questionAnswer;
        const isChecked = selectedAnswersIndex.includes(index);
        const ariaInputId = `answer-${index + 1}`;
        const key = `question-${questionId}-el-${index}`;

        const answerImage = answerImages.find(
          (img) => img.answer_id === answerId,
        );

        return (
          <Row key={key} marginBlockEnd={10}>
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
              disabled={disabled}
            >
              <Checkbox
                id={ariaInputId}
                checked={isChecked}
                onChange={() => check(value, name, index)}
                disabled={disabled}
              >
                <AnswerContent
                  answerImage={answerImage}
                  payload={payload}
                  index={index}
                  imageMaxWidth={getAnswerImageSize(answerImageSize)}
                />
              </Checkbox>
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
    {noneOfAboveAnswerIndex !== -1 && (
      <Row
        key={`question-${questionId}-el-${noneOfAboveAnswerIndex}`}
        marginBlockEnd={10}
      >
        {!isMobile && (
          <AudioTextPreview
            text={htmlToPlainText(data[noneOfAboveAnswerIndex].payload)}
            previewKey={`question-${questionId}-el-${noneOfAboveAnswerIndex}`}
          />
        )}
        <HoverableBox
          paddingInline={margin}
          paddingBlock={14}
          filled
          clickable
          disabled={disabled}
        >
          <Checkbox
            id={`answer-${noneOfAboveAnswerIndex + 1}`}
            checked={selectedAnswersIndex.includes(noneOfAboveAnswerIndex)}
            onChange={() =>
              check(
                data[noneOfAboveAnswerIndex].variable.value,
                data[noneOfAboveAnswerIndex].variable.name,
                noneOfAboveAnswerIndex,
              )
            }
            disabled={disabled}
          >
            <AnswerContent
              answerImage={noneOfAboveAnswerImage}
              payload={data[noneOfAboveAnswerIndex].payload}
              index={noneOfAboveAnswerIndex}
              imageMaxWidth={getAnswerImageSize(answerImageSize)}
            />
          </Checkbox>
        </HoverableBox>
        {isMobile && (
          <AudioTextPreview
            text={htmlToPlainText(data[noneOfAboveAnswerIndex].payload)}
            previewKey={`question-${questionId}-el-${noneOfAboveAnswerIndex}`}
          />
        )}
      </Row>
    )}
  </Column>
);

MultipleQuestionLayout.propTypes = {
  data: PropTypes.array,
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  check: PropTypes.func,
  selectedAnswersIndex: PropTypes.array,
  noneOfAboveAnswerIndex: PropTypes.number,
  noneOfAboveAnswerImage: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    answer_id: PropTypes.string.isRequired,
  }),
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

export default MultipleQuestionLayout;
