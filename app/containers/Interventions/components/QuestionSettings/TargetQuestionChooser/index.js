import React, { useState, useEffect } from 'react';
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
import presentationProjectorSelected from 'assets/svg/presentation-projector-selected.svg';
import webpage from 'assets/svg/webpage-mouseover.svg';
import webpageSelected from 'assets/svg/webpage-mouseover-selected.svg';
import arrowLeft from 'assets/svg/arrow-left.svg';

import {
  makeSelectIntervention,
  makeSelectQuestions,
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from 'containers/Interventions/containers/EditInterventionPage/selectors';

import { colors, borders, fontSizes } from 'theme';
import Question from 'models/Intervention/Question';
import Intervention from 'models/Intervention/Intervention';
import { getInterventionListRequest } from 'containers/Interventions/containers/EditInterventionPage/actions';

import messages from './messages';
import { makeSelectInterventionList } from './selectors';

const TargetQuestionChooser = ({
  intl: { formatMessage },
  onClick,
  intervention: { name },
  questions,
  selectedQuestion: { id } = {},
  pattern,
  currentIndex,
  isVisible,
  getInterventionList,
  interventionList,
}) => {
  const [isInterventionView, setIsInterventionView] = useState(false);

  const canSelectQuestion = questionId => id !== questionId;
  const isLast = currentIndex === questions.length - 1;

  const chooseNextQuestion = () => {
    if (!isLast) {
      const targetId = questions[currentIndex + 1].id;
      onClick(targetId);
    }
  };

  useEffect(() => {
    if (isVisible) setIsInterventionView(false);
  }, [isVisible]);

  useEffect(() => {
    if (isInterventionView) getInterventionList();
  }, [isInterventionView]);

  const renderQuestionChooser = (
    <Column>
      <Row mb={20}>
        <Img
          src={arrowLeft}
          mr={10}
          onClick={event => {
            event.stopPropagation();
            setIsInterventionView(true);
          }}
          clickable
        />
        <Img src={presentationProjector} mr={10} />
        <H3>{name}</H3>
      </Row>
      {questions.map((question, index) => (
        <Row
          data-testid={`${id}-select-target-question`}
          key={`${id}-select-target-question-${index}`}
          mb={index !== questions.length - 1 && 15}
          onClick={() => canSelectQuestion(question.id) && onClick(question.id)}
        >
          <Img
            src={pattern.target === question.id ? webpageSelected : webpage}
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
  );

  const renderInterventionChooser = (
    <Column>
      <Row mb={20}>
        <H3>{formatMessage(messages.interventionListHeader)}</H3>
      </Row>
      {interventionList.map((intervention, index) => (
        <Row
          data-testid={`${id}-select-target-intervention`}
          key={`${id}-select-target-intervention-${index}`}
          mb={index !== interventionList.length - 1 && 15}
          onClick={() =>
            console.log(`TODO: SELECTED INTERVENTION ID: ${intervention.id}`)
          }
        >
          <Img
            src={
              pattern.target === intervention.id
                ? presentationProjectorSelected
                : presentationProjector
            }
            mr={10}
          />
          <Box maxWidth={250} clickable>
            <Text
              textOverflow="ellipsis"
              whiteSpace="pre"
              overflow="hidden"
              fontWeight={pattern.target === intervention.id ? 'bold' : ''}
            >
              {intervention.name}
            </Text>
          </Box>
        </Row>
      ))}
    </Column>
  );

  return (
    <Box>
      <Box
        borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${
          colors.linkWater
        }`}
        padded
      >
        <Row onClick={chooseNextQuestion}>
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
          {isInterventionView
            ? renderInterventionChooser
            : renderQuestionChooser}
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
  isVisible: PropTypes.bool,
  getInterventionList: PropTypes.func,
  interventionList: PropTypes.arrayOf(PropTypes.shape(Intervention)),
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  interventionList: makeSelectInterventionList(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
  currentIndex: makeSelectSelectedQuestionIndex(),
});

const mapDispatchToProps = {
  getInterventionList: getInterventionListRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(TargetQuestionChooser));
