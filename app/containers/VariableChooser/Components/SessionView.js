import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  fetchSessionsRequest,
  makeSelectSessions,
} from 'global/reducers/copyModalReducer';

import NoContent from 'components/NoContent';
import Box from 'components/Box';

import ViewWrapper from './ViewWrapper';
import SessionRow from './SessionRow';

import messages from '../messages';
import { VariableChooserContext, VIEWS } from '../constants';

const SessionView = ({ onClick }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  // actions
  const fetchSessions = (interventionId) =>
    dispatch(fetchSessionsRequest(interventionId));

  // selectors
  const allSessions = useSelector(makeSelectSessions());

  const {
    currentInterventionId,
    currentView,
    includeAllSessions,
    includeCurrentSession,
    initialSessionId,
    isMultiIntervention,
    setCurrentView,
  } = useContext(VariableChooserContext);

  useEffect(() => {
    fetchSessions(currentInterventionId);
  }, [currentInterventionId]);

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

  const isInitialSession = (sessionId) => sessionId === initialSessionId;

  const toInterventionView = () =>
    currentView !== VIEWS.INTERVENTION && setCurrentView(VIEWS.INTERVENTION);

  if (!sessions || !sessions.length)
    return (
      <ViewWrapper goBack={isMultiIntervention && toInterventionView}>
        <Box padding={30}>
          <NoContent text={formatMessage(messages.noSessions)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper goBack={isMultiIntervention && toInterventionView}>
      {sessions.map(({ id, name }, index) => (
        <SessionRow
          key={`${id}-select-session-${index}`}
          id={id}
          index={index}
          isInitialSession={isInitialSession(id)}
          isLast={index === sessions.length - 1}
          name={name}
          onClick={onClick}
        />
      ))}
    </ViewWrapper>
  );
};

SessionView.propTypes = {
  onClick: PropTypes.func,
};

export default memo(SessionView);
