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
import Badge from 'components/Badge';
import Loader from 'components/Loader';

import navigationNext from 'assets/svg/navigation-next.svg';
import presentationProjector from 'assets/svg/presentation-projector.svg';
import presentationProjectorSelected from 'assets/svg/presentation-projector-selected.svg';
import webpage from 'assets/svg/webpage-mouseover.svg';
import webpageSelected from 'assets/svg/webpage-mouseover-selected.svg';
import arrowLeft from 'assets/svg/arrow-left.svg';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { makeSelectIntervention } from 'global/reducers/intervention';
import {
  fetchInterventionsRequest,
  makeSelectInterventionsLoader,
  makeSelectInterventions,
  interventionListReducer,
  fetchInterventionsSaga,
} from 'global/reducers/interventionList';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { colors, borders, fontSizes, themeColors } from 'theme';
import Question from 'models/Intervention/Question';
import Intervention from 'models/Intervention/Intervention';

import messages from './messages';

const TargetQuestionChooser = ({
  intl: { formatMessage },
  onClick,
  intervention: { name, id: interventionId },
  questions,
  selectedQuestion: { id } = {},
  pattern: { target },
  currentIndex,
  isVisible,
  getInterventionList,
  interventionList,
  interventionListLoading,
}) => {
  useInjectReducer({
    key: 'interventionList',
    reducer: interventionListReducer,
  });
  useInjectSaga({ key: 'getInterventions', saga: fetchInterventionsSaga });
  const [isInterventionView, _setIsInterventionView] = useState(false);
  const setIsInterventionView = (value, event) => {
    if (event) event.stopPropagation();
    _setIsInterventionView(value);
  };

  const canSelectQuestion = questionId => id !== questionId;
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    if (isVisible) {
      setIsInterventionView(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isInterventionView) getInterventionList();
  }, [isInterventionView]);

  const chooseNextQuestion = () => {
    if (!isLast) {
      const targetId = questions[currentIndex + 1].id;
      onClick(targetId);
    }
  };

  const chooseIntervention = (targetInterventionId, event) => {
    if (targetInterventionId === interventionId)
      setIsInterventionView(false, event);
    else onClick({ type: 'Intervention', id: targetInterventionId });
  };

  const renderQuestionChooser = (
    <Column data-testid={`${id}-select-target-question`}>
      <Row mb={20}>
        <Img
          data-testid={`${id}-select-target-question-interview-view-setter`}
          src={arrowLeft}
          mr={10}
          onClick={event => setIsInterventionView(true, event)}
          clickable
        />
        <Img src={presentationProjector} mr={10} />
        <H3>{name}</H3>
      </Row>
      <Box maxHeight="300px" overflow="scroll">
        <Column>
          {questions.map((question, index) => (
            <Row
              data-testid={`${id}-select-target-question-el`}
              key={`${id}-select-target-question-${index}`}
              mb={index !== questions.length - 1 && 15}
              onClick={() =>
                canSelectQuestion(question.id) &&
                onClick({ type: 'Question', id: question.id })
              }
              clickable={canSelectQuestion(question.id)}
            >
              <Img
                src={target.id === question.id ? webpageSelected : webpage}
                mr={10}
              />
              <Box maxWidth={250}>
                <Text
                  textOverflow="ellipsis"
                  whiteSpace="pre"
                  overflow="hidden"
                  color={!canSelectQuestion(question.id) ? colors.grey : ''}
                  fontWeight={target.id === question.id ? 'bold' : ''}
                >
                  {htmlToPlainText(question.title)}
                </Text>
              </Box>
            </Row>
          ))}
        </Column>
      </Box>
    </Column>
  );

  const renderInterventionChooser = () => {
    if (interventionListLoading)
      return (
        <Box
          width="100%"
          height="80px"
          data-testid={`${id}-select-target-intervention-spinner`}
        >
          <Loader type="inline" hidden={false} />
        </Box>
      );

    return (
      <Column data-testid={`${id}-select-target-intervention`}>
        <Row mb={20}>
          <H3>{formatMessage(messages.interventionListHeader)}</H3>
        </Row>
        <Box maxHeight="300px" overflow="scroll">
          <Column>
            {interventionList &&
              interventionList.map((intervention, index) => (
                <Row
                  data-testid={`${id}-select-target-intervention-el`}
                  key={`${id}-select-target-intervention-${index}`}
                  mb={index !== interventionList.length - 1 ? 15 : 5}
                  onClick={event => chooseIntervention(intervention.id, event)}
                  align="center"
                  clickable
                >
                  <Img
                    src={
                      target.id === intervention.id
                        ? presentationProjectorSelected
                        : presentationProjector
                    }
                    mr={10}
                  />
                  <Box maxWidth={250} mr={10}>
                    <Text
                      textOverflow="ellipsis"
                      whiteSpace="pre"
                      overflow="hidden"
                      fontWeight={target.id === intervention.id ? 'bold' : ''}
                    >
                      {intervention.name}
                    </Text>
                  </Box>
                  {interventionId === intervention.id && (
                    <Badge bg={themeColors.secondary} color={colors.white}>
                      {formatMessage(messages.selectedInterventionBadge)}
                    </Badge>
                  )}
                </Row>
              ))}
          </Column>
        </Box>
      </Column>
    );
  };

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
            ? renderInterventionChooser()
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
    target: PropTypes.shape({ id: PropTypes.string, type: PropTypes.string }),
  }),
  currentIndex: PropTypes.number,
  isVisible: PropTypes.bool,
  getInterventionList: PropTypes.func,
  interventionList: PropTypes.arrayOf(PropTypes.shape(Intervention)),
  interventionListLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  interventionList: makeSelectInterventions(),
  questions: makeSelectQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
  currentIndex: makeSelectSelectedQuestionIndex(),
  interventionListLoading: makeSelectInterventionsLoader(),
});

const mapDispatchToProps = {
  getInterventionList: fetchInterventionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(TargetQuestionChooser));
