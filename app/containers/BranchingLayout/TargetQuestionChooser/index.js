import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import maxBy from 'lodash/maxBy';

import Badge from 'components/Badge';
import Box from 'components/Box';
import Column from 'components/Column';
import H3 from 'components/H3';
import EllipsisText from 'components/Text/EllipsisText';
import Img from 'components/Img';
import Loader from 'components/Loader';

import Row from 'components/Row';
import Text from 'components/Text';
import arrowLeft from 'assets/svg/arrow-left.svg';
import navigationNext from 'assets/svg/navigation-next.svg';
import presentationProjector from 'assets/svg/presentation-projector.svg';
import presentationProjectorSelected from 'assets/svg/presentation-projector-selected.svg';
import { colors, borders, fontSizes, themeColors } from 'theme';
import { makeSelectSession } from 'global/reducers/session';
import {
  makeSelectInterventionLoader,
  makeSelectIntervention,
  makeSelectCurrentSessionIndex,
} from 'global/reducers/intervention';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionId,
  makeSelectFilteredQuestions,
} from 'global/reducers/questions';
import { makeSelectQuestionGroups } from 'global/reducers/questionGroups';

import messages from './messages';
import GroupCollapse from './GroupCollapse';

const TargetQuestionChooser = (props) => {
  const {
    intl: { formatMessage },
    onClick,
    session: { name, id: sessionId },
    questions,
    selectedQuestion = {},
    target,
    currentIndex,
    isVisible,
    intervention,
    interventionLoading,
    sessionBranching,
    sessionIndex,
    questionGroups,
  } = props;
  const { id, position, question_group_id: questionGroupId } = selectedQuestion;
  const currentGroup = questionGroups.find(
    ({ id: groupId }) => groupId === questionGroupId,
  );
  const isLastQuestionInGroup = useMemo(() => {
    const filteredQuestions = questions.filter(
      ({ question_group_id: groupId }) => groupId === questionGroupId,
    );

    return (
      position ===
      maxBy(filteredQuestions, ({ position: questionPos }) => questionPos)
        ?.position
    );
  }, [position, questionGroupId, questions, questionGroups]);

  /*
   * Code below filters groups to show groups which
   * occur only after current group. Current group is
   * also included unless it is the last question in a given group
   * */
  const filteredGroups = questionGroups.filter(
    ({ position: groupPosition, id: groupId }) =>
      groupPosition >= currentGroup.position &&
      !(isLastQuestionInGroup && groupId === questionGroupId),
  );

  const { sessions: sessionList } = intervention || {};

  const filteredSessionList = useMemo(
    () =>
      sessionList
        ? sessionList.filter((session) => session.position > sessionIndex + 1)
        : [],
    [sessionList, sessionIndex],
  );

  const [isSessionView, _setIsSessionView] = useState(false);
  const setIsSessionView = (value, event) => {
    if (event) event.stopPropagation();
    _setIsSessionView(value);
  };
  const canSelectSession = (sessionPosition) =>
    !sessionBranching ||
    (sessionList[sessionIndex] &&
      sessionPosition > sessionList[sessionIndex].position);
  const isLast = currentIndex === questions.length - 1;
  const isCurrentSession = (session) =>
    !sessionBranching && sessionId === session.id;

  useEffect(() => {
    if (isVisible) {
      setIsSessionView(target.type === 'Session');
    }
  }, [isVisible]);

  const chooseNextQuestion = () => {
    if (!isLast) {
      const nextIndex =
        questions.findIndex(
          ({ id: questionId }) => questionId === currentIndex,
        ) + 1;
      const { id: targetId, type } = questions[nextIndex];
      onClick({ type, id: targetId });
    }
  };

  const chooseSession = (session, event) => {
    if (canSelectSession(session.position)) {
      if (!sessionBranching && session.id === sessionId)
        setIsSessionView(false, event);
      else onClick({ type: 'Session', id: session.id });
    }
  };

  const renderQuestionChooser = (
    <Column data-testid={`${id}-select-target-question`}>
      <Row mb={20}>
        <Img
          data-testid={`${id}-select-target-question-interview-view-setter`}
          data-cy="select-target-question-session-view-setter"
          src={arrowLeft}
          mr={10}
          onClick={(event) => setIsSessionView(true, event)}
          clickable
        />
        <Img src={presentationProjector} mr={10} />
        <H3>{name}</H3>
      </Row>
      <Box maxHeight="300px" overflow="scroll">
        <Column>
          {filteredGroups.map((group, index) => (
            <GroupCollapse
              key={`${group.id}-select-group-${index}`}
              questionGroup={group}
              questionListItemProps={{
                onClick,
                selectedQuestion,
                target,
              }}
            />
          ))}
        </Column>
      </Box>
    </Column>
  );

  const renderSessionChooser = () => {
    if (interventionLoading)
      return (
        <Box
          width="100%"
          height="80px"
          data-testid={`${id}-select-target-session-spinner`}
        >
          <Loader type="inline" hidden={false} />
        </Box>
      );

    if (!filteredSessionList || !filteredSessionList.length)
      return <H3>{formatMessage(messages.sessionListEmpty)}</H3>;

    return (
      <Column data-testid={`${id}-select-target-session`}>
        <Row mb={20}>
          <H3>{formatMessage(messages.sessionListHeader)}</H3>
        </Row>
        <Box maxHeight="300px" overflow="scroll">
          <Column>
            {filteredSessionList &&
              filteredSessionList.map((session, index) => (
                <Row
                  data-testid={`${id}-select-target-session-el-${index}`}
                  data-cy={`choose-session-${index}`}
                  key={`${id}-select-target-session-${index}`}
                  mb={index !== filteredSessionList.length - 1 ? 15 : 5}
                  onClick={(event) => chooseSession(session, event)}
                  align="center"
                  clickable={canSelectSession(session.position)}
                >
                  <Img
                    src={
                      target && target.id === session.id
                        ? presentationProjectorSelected
                        : presentationProjector
                    }
                    mr={10}
                  />
                  <Box mr={10} maxWidth={isCurrentSession(session) ? 70 : 140}>
                    <EllipsisText
                      text={session.name}
                      fontWeight={
                        target && target.id === session.id ? 'bold' : ''
                      }
                      fontSize={13}
                      color={
                        canSelectSession(session.position)
                          ? colors.black
                          : colors.grey
                      }
                    />
                  </Box>
                  {isCurrentSession(session) && (
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
    <Box width={300}>
      {!sessionBranching && (
        <Box
          borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`}
          padded
        >
          <Row
            data-testid={`${id}-next-question-target`}
            onClick={chooseNextQuestion}
          >
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
      )}
      <Row>
        <Box padding={8} filled>
          {isSessionView ? renderSessionChooser() : renderQuestionChooser}
        </Box>
      </Row>
    </Box>
  );
};

TargetQuestionChooser.propTypes = {
  intl: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  session: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.object),
  selectedQuestion: PropTypes.object,
  target: PropTypes.shape({ id: PropTypes.string, type: PropTypes.string }),
  currentIndex: PropTypes.string,
  sessionIndex: PropTypes.number,
  isVisible: PropTypes.bool,
  intervention: PropTypes.object,
  interventionLoading: PropTypes.bool,
  sessionBranching: PropTypes.bool,
  questionGroups: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  questions: makeSelectFilteredQuestions(),
  selectedQuestion: makeSelectSelectedQuestion(),
  currentIndex: makeSelectSelectedQuestionId(),
  interventionLoading: makeSelectInterventionLoader('fetchInterventionLoading'),
  intervention: makeSelectIntervention(),
  sessionIndex: makeSelectCurrentSessionIndex(),
  questionGroups: makeSelectQuestionGroups(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(TargetQuestionChooser));
