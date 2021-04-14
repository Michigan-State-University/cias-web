import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectReducer, injectSaga } from 'redux-injectors';

import {
  allCopyModalSagas,
  copyModalReducer,
  fetchQuestionGroupsRequest,
  makeSelectQuestionGroups,
  makeSelectCopyModalLoader,
  makeSelectQuestions,
  fetchSessionsRequest,
  makeSelectSessions,
} from 'global/reducers/copyModalReducer';

import { colors, boxShadows } from 'theme';

import { nameQuestion, QuestionTypes } from 'models/Session/QuestionTypes';
import Question from 'models/Session/Question';
import Session from 'models/Session/Session';
import {
  getBranchingVariables,
  getEditVariables,
  getPreviousQuestions,
} from 'models/Session/utils';

import useOutsideClick from 'utils/useOutsideClick';
import objectToCamelCase from 'utils/objectToCamelCase';

import arrowLeft from 'assets/svg/arrow-left.svg';

import NoContent from 'components/NoContent';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';
import Loader from 'components/Loader';

import { VariableRow } from './Components/VariableRow';
import { SessionRow } from './Components/SessionRow';

import messages from './messages';
import { VIEWS } from './constants';

const VariableChooser = ({
  children,
  disabled,
  fetchQuestionGroups,
  fetchSessions,
  includeAllSessions,
  includeAllVariables,
  includeCurrentQuestion,
  includeCurrentSession,
  includeNonDigitVariables,
  interventionId,
  isMultiSession,
  loading,
  onClick,
  placement,
  questionGroups,
  questions: allQuestions,
  questionTypeWhitelist,
  selectedQuestion = {},
  sessionId: initialSessionId,
  sessions: allSessions,
  topPosition,
}) => {
  const { formatMessage } = useIntl();

  const variableChooser = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => isOpen && setIsOpen(false);

  useOutsideClick(variableChooser, close, isOpen);

  const initialView = useMemo(() => {
    if (isMultiSession && !includeCurrentSession) return VIEWS.SESSION;

    return VIEWS.VARIABLE;
  }, [isMultiSession, includeCurrentSession]);

  const [currentView, setCurrentView] = useState(initialView);
  const toSessionView = () =>
    currentView !== VIEWS.SESSION && setCurrentView(VIEWS.SESSION);
  const toVariableView = () =>
    currentView !== VIEWS.VARIABLE && setCurrentView(VIEWS.VARIABLE);

  const isSessionView = currentView === VIEWS.SESSION;
  const isVariableView = currentView === VIEWS.VARIABLE;

  const [isLoading, setIsLoading] = useState(true);

  const [currentSessionId, setCurrentSessionId] = useState(initialSessionId);
  const resetCurrentSessionId = () =>
    currentSessionId !== initialSessionId &&
    setCurrentSessionId(initialSessionId);

  const isInitialSession = sessionId => sessionId === initialSessionId;

  const resetVariableChooser = () => {
    setIsLoading(true);
    resetCurrentSessionId();
    setCurrentView(initialView);
  };

  useLayoutEffect(() => {
    if (isOpen) resetVariableChooser();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (isVariableView) fetchQuestionGroups(currentSessionId);

      if (isSessionView) fetchSessions(interventionId);
    }
  }, [isOpen, currentView, currentSessionId]);

  useEffect(() => {
    if (loading !== isLoading) setIsLoading(loading);
  }, [loading]);

  const variables = useMemo(() => {
    const filteredQuestions = allQuestions.filter(({ type }) =>
      questionTypeWhitelist.includes(type),
    );

    const variableGetter = includeNonDigitVariables
      ? getEditVariables
      : getBranchingVariables;

    const options = {
      structure: 'flat',
      include: ['id', 'subtitle'],
    };

    const variableFilter = ({ variable }) =>
      variable !== nameQuestion.reservedVariable;

    if (includeAllVariables)
      return variableGetter(filteredQuestions, options).filter(variableFilter);

    const previousQuestions = getPreviousQuestions(
      objectToCamelCase(selectedQuestion),
      filteredQuestions,
      questionGroups,
      includeCurrentQuestion,
    );

    return variableGetter(previousQuestions, options).filter(variableFilter);
  }, [
    selectedQuestion,
    allQuestions,
    questionGroups,
    includeAllVariables,
    includeCurrentQuestion,
    includeNonDigitVariables,
    questionTypeWhitelist,
  ]);

  const sessions = useMemo(() => {
    if (includeAllSessions) return allSessions;

    const currentSession = allSessions?.find(
      ({ id }) => id === initialSessionId,
    );

    return allSessions?.filter(({ position }) =>
      includeCurrentSession
        ? position <= currentSession?.position
        : position < currentSession?.position,
    );
  }, [allSessions, includeAllSessions, includeCurrentSession]);

  const handleOnVariableClick = variable => {
    const variableToAdd = isInitialSession(currentSessionId)
      ? variable
      : `${
          allSessions.find(({ id }) => id === currentSessionId).variable
        }.${variable}`;

    onClick(variableToAdd);
    close();
  };

  const handleOnSessionClick = sessionId => {
    setCurrentSessionId(sessionId);
    toVariableView();
  };

  const displayVariables = useCallback(() => {
    if (variables && variables.length)
      return variables.map((variable, index) => (
        <VariableRow
          key={`${variable.id}-select-variable-${index}`}
          id={variable.id}
          index={index}
          isLast={index === variables.length - 1}
          onClick={handleOnVariableClick}
          subtitle={variable.subtitle}
          variable={variable.variable}
        />
      ));

    return (
      <Box padding={30}>
        <NoContent text={formatMessage(messages.noVariables)} />
      </Box>
    );
  }, [variables]);

  const displaySessions = useCallback(() => {
    if (sessions && sessions.length)
      return sessions.map((session, index) => (
        <SessionRow
          key={`${session.id}-select-session-${index}`}
          id={session.id}
          index={index}
          isInitialSession={isInitialSession(session.id)}
          isLast={index === sessions.length - 1}
          name={session.name}
          onClick={handleOnSessionClick}
        />
      ));

    return (
      <Box padding={30}>
        <NoContent text={formatMessage(messages.noSessions)} />
      </Box>
    );
  }, [sessions]);

  const displayContent = useCallback(() => {
    if (isLoading) return <Loader type="inline" />;

    const wrapper = content => <Column>{content}</Column>;

    if (isVariableView)
      return (
        <Column>
          {isMultiSession && (
            <Img
              width="min-content"
              src={arrowLeft}
              mb={10}
              onClick={toSessionView}
              clickable
            />
          )}
          {wrapper(displayVariables())}
        </Column>
      );

    if (isSessionView) return wrapper(displaySessions());
  }, [isLoading, currentView, displaySessions, displayVariables]);

  return (
    <Box position="relative">
      <Box onClick={toggle} disabled={disabled} clickable>
        {children}
      </Box>
      <Box
        ref={variableChooser}
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows.black}
        position="absolute"
        width="auto"
        top={topPosition}
        {...(isOpen ? { zIndex: 1, [placement]: '0px' } : { display: 'none' })}
      >
        <Row>
          <Box padding={8} filled>
            {displayContent()}
          </Box>
        </Row>
      </Box>
    </Box>
  );
};

VariableChooser.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fetchQuestionGroups: PropTypes.func,
  fetchSessions: PropTypes.func,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      position: PropTypes.number,
    }),
  ),
  includeAllSessions: PropTypes.bool,
  includeAllVariables: PropTypes.bool,
  includeCurrentQuestion: PropTypes.bool,
  includeCurrentSession: PropTypes.bool,
  includeNonDigitVariables: PropTypes.bool,
  interventionId: PropTypes.string,
  isMultiSession: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  placement: PropTypes.oneOf(['left', 'right']),
  questionGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      position: PropTypes.number,
    }),
  ),
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  questionTypeWhitelist: PropTypes.arrayOf(PropTypes.string),
  selectedQuestion: PropTypes.shape(Question),
  sessionId: PropTypes.string,
  sessions: PropTypes.arrayOf(PropTypes.shape(Session)),
  topPosition: PropTypes.string,
};

VariableChooser.defaultProps = {
  includeCurrentQuestion: true,
  includeCurrentSession: true,
  questionTypeWhitelist: QuestionTypes.map(({ id }) => id),
  placement: 'right',
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectCopyModalLoader(),
  questionGroups: makeSelectQuestionGroups(),
  questions: makeSelectQuestions(),
  sessions: makeSelectSessions(),
});

const mapDispatchToProps = {
  fetchQuestionGroups: fetchQuestionGroupsRequest,
  fetchSessions: fetchSessionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const reduxInjectors = [
  injectReducer({ key: 'copyModal', reducer: copyModalReducer }),
  injectSaga({ key: 'copyModal', saga: allCopyModalSagas }),
];

export default compose(
  withConnect,
  ...reduxInjectors,
)(VariableChooser);
