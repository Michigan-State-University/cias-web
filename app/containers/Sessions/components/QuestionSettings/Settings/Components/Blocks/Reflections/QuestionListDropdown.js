import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Img from 'components/Img';
import Question from 'models/Session/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import { ArrowDropdownContext } from 'components/ArrowDropdown/utils';
import webpage from 'assets/svg/webpage-mouseover.svg';
import webpageSelected from 'assets/svg/webpage-mouseover-selected.svg';
import { boxShadows, colors } from 'theme';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { useDropdownPositionHelper } from 'utils/useDropdownPositionHelper';
import { useChildSizeCalculator } from 'utils/useChildSizeCalculator';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';
import {
  singleQuestion,
  multiQuestion,
  gridQuestion,
} from 'models/Session/QuestionTypes';

const possibleQuestions = [
  singleQuestion.id,
  multiQuestion.id,
  gridQuestion.id,
];

const QuestionListDropdown = ({
  onClick,
  questions,
  selectedQuestion: { id } = {},
  chosenQuestionId,
  isVisible,
}) => {
  const containerRef = useRef(null);
  const { ref: dropdownRef } = useContext(ArrowDropdownContext);
  const {
    ref,
    callbackRef,
    positionData: { top, bottom, maxHeight },
  } = useDropdownPositionHelper(dropdownRef, { bottomMargin: 30 });

  const { height } = useChildSizeCalculator(ref, containerRef);

  const canSelectQuestion = questionId => id !== questionId;

  const filteredQuestions = questions.filter(question =>
    possibleQuestions.includes(question.type),
  );

  return (
    isVisible && (
      <Row
        shadow={boxShadows.black}
        width="100%"
        bg={colors.white}
        position="absolute"
        top={top}
        bottom={bottom}
        maxHeight={maxHeight}
        ref={callbackRef}
        borderRadius={10}
        height={height}
      >
        <ScrollFogBox
          padding={8}
          width="100%"
          overflow="scroll"
          horizontalFogVisible={false}
          ref={containerRef}
          height={height}
          data-testid={`${id}-select-target-question`}
        >
          {filteredQuestions.map((question, index) => (
            <Row
              data-testid={`${id}-select-target-question-el`}
              key={`${id}-select-target-question-${index}`}
              mb={index !== filteredQuestions.length - 1 && 15}
              onClick={() =>
                canSelectQuestion(question.id) && onClick(question)
              }
              clickable={canSelectQuestion(question.id)}
            >
              <Img
                src={
                  chosenQuestionId === question.id ? webpageSelected : webpage
                }
                mr={10}
              />
              <Text
                textOverflow="ellipsis"
                whiteSpace="pre"
                overflow="hidden"
                color={!canSelectQuestion(question.id) ? colors.grey : ''}
                fontWeight={chosenQuestionId === question.id ? 'bold' : ''}
              >
                {htmlToPlainText(question.subtitle)}
              </Text>
            </Row>
          ))}
        </ScrollFogBox>
      </Row>
    )
  );
};

QuestionListDropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.shape(Question),
  chosenQuestionId: PropTypes.string,
  isVisible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionListDropdown);
