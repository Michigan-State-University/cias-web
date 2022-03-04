import PropTypes from 'prop-types';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  fetchQuestionGroupsRequest,
  makeSelectCopyModalLoaders,
  makeSelectQuestionGroups,
  makeSelectQuestions,
  makeSelectSessions,
} from 'global/reducers/copyModalReducer';
import {
  getBranchingVariables,
  getEditVariables,
  getPreviousQuestions,
} from 'models/Session/utils';
import objectToCamelCase from 'utils/objectToCamelCase';

import NoContent from 'components/NoContent';
import Box from 'components/Box';
import Spinner from 'components/Spinner';

import { themeColors } from 'theme';
import VariableRow from './VariableRow';
import ViewWrapper from './ViewWrapper';

import messages from '../messages';
import { VariableChooserContext, VIEWS } from '../constants';

const VariableView = ({ onClick }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  // actions
  const fetchQuestionGroups = sessionId =>
    dispatch(fetchQuestionGroupsRequest(sessionId));

  // selectors
  const allSessions = useSelector(makeSelectSessions());
  const allQuestions = useSelector(makeSelectQuestions());
  const questionGroups = useSelector(makeSelectQuestionGroups());
  const { questionGroups: questionGroupsLoading } = useSelector(
    makeSelectCopyModalLoaders(),
  );

  const {
    currentInterventionId,
    currentSessionId,
    currentView,
    includeAllVariables,
    includeCurrentQuestion,
    includeNonDigitVariables,
    initialSessionId,
    isMultiIntervention,
    isMultiSession,
    questionTypeWhitelist,
    selectedQuestion,
    setCurrentView,
  } = useContext(VariableChooserContext);

  useEffect(() => {
    fetchQuestionGroups(currentSessionId);
  }, [currentInterventionId]);

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

    if (includeAllVariables) return variableGetter(filteredQuestions, options);

    const previousQuestions = getPreviousQuestions(
      objectToCamelCase(selectedQuestion),
      filteredQuestions || [],
      questionGroups || [],
      includeCurrentQuestion,
    );

    return variableGetter(previousQuestions, options);
  }, [
    allQuestions,
    includeAllVariables,
    includeCurrentQuestion,
    includeNonDigitVariables,
    questionGroups,
    questionTypeWhitelist,
    selectedQuestion,
  ]);

  const toSessionView = () =>
    currentView !== VIEWS.SESSION && setCurrentView(VIEWS.SESSION);

  const handleOnClick = useCallback(
    variable => {
      const variableToAdd =
        currentSessionId === initialSessionId
          ? variable
          : `${
              allSessions.find(({ id }) => id === currentSessionId).variable
            }.${variable}`;

      onClick(variableToAdd);
    },
    [currentSessionId, initialSessionId, allSessions],
  );

  if (questionGroupsLoading) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (!variables || !variables.length)
    return (
      <ViewWrapper
        goBack={(isMultiSession || isMultiIntervention) && toSessionView}
      >
        <Box padding={30}>
          <NoContent text={formatMessage(messages.noVariables)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper
      goBack={(isMultiSession || isMultiIntervention) && toSessionView}
    >
      {variables.map(({ id, subtitle, variable }, index) => (
        <VariableRow
          key={`${id}-select-variable-${index}`}
          id={id}
          index={index}
          isLast={index === variables.length - 1}
          onClick={handleOnClick}
          subtitle={subtitle}
          variable={variable}
        />
      ))}
    </ViewWrapper>
  );
};

VariableView.propTypes = {
  onClick: PropTypes.func,
};

export default memo(VariableView);
