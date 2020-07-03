import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Text from 'components/Text';
import H3 from 'components/H3';
import Img from 'components/Img';

import navigationNext from 'assets/svg/navigation-next.svg';
import presentationProjector from 'assets/svg/presentation-projector.svg';
import webpage from 'assets/svg/webpage-mouseover.svg';
import webpageSelected from 'assets/svg/webpage-mouseover-selected.svg';

import {
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from 'containers/Interventions/containers/EditInterventionPage/selectors';

import { colors, borders, fontSizes } from 'theme';
import Question from 'models/Intervention/Question';
import messages from './messages';

const TargetQuestionChooser = ({
  intl: { formatMessage },
  onClick,
  intervention: { name },
  questions,
  selectedQuestion: { id } = {},
  pattern,
  currentIndex,
}) => {
  const canSelectQuestion = questionId => id !== questionId;
  const isLast = currentIndex === questions.length - 1;

  const chooseQuestion = () => {
    if (!isLast) {
      const targetId = questions[currentIndex + 1].id;
      onClick(targetId);
    }
  };

  return (
    <Box>
      <Box
        borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${
          colors.linkWater
        }`}
        padded
      >
        <Row onClick={chooseQuestion}>
          <Img src={navigationNext} mr={5} />
          <Box clickable={!isLast}>
            <Text
              color={isLast ? colors.grey : ''}
              fontWeight="bold"
              fontSize={fontSizes.regular}
            >
              {formatMessage(messages.header)}
            </Text>
          </Box>
        </Row>
      </Box>
      <Row>
        <Box padding={8} filled>
          <Column>
            <Row mb={20}>
              <Img src={presentationProjector} mr={5} />
              <H3>{name}</H3>
            </Row>
            {questions.map((question, index) => (
              <Row
                data-testid={`${id}-select-target`}
                key={`${id}-select-target-${index}`}
                mb={index !== questions.length - 1 && 15}
                onClick={() =>
                  canSelectQuestion(question.id) && onClick(question.id)
                }
              >
                <Img
                  src={
                    pattern.target === question.id ? webpageSelected : webpage
                  }
                  mr={10}
                />
                <Box maxWidth={250} clickable={canSelectQuestion(question.id)}>
                  <Text
                    textOverflow="ellipsis"
                    whiteSpace="pre"
                    overflow="hidden"
                    color={!canSelectQuestion(question.id) ? colors.grey : ''}
                    fontWeight={pattern.target === question.id ? 'bold' : ''}
                  >
                    {question.title}
                  </Text>
                </Box>
              </Row>
            ))}
          </Column>
        </Box>
      </Row>
    </Box>
  );
};

TargetQuestionChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  intervention: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.shape(Question),
  pattern: PropTypes.shape({
    match: PropTypes.string,
    target: PropTypes.string,
  }),
  currentIndex: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
  currentIndex: makeSelectSelectedQuestionIndex(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(TargetQuestionChooser));
