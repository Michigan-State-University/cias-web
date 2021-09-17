import React, { memo, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  fetchSessionsRequest,
  makeSelectSessions,
} from 'global/reducers/copyModalReducer';
import { SessionDto } from 'models/Session/SessionDto';

import NoContent from 'components/NoContent';
import Box from 'components/Box';

import ViewWrapper from './ViewWrapper';
import SessionRow from './SessionRow';

import messages from '../messages';
import { VariableChooserContext, VIEWS } from '../constants';

interface Props {
  onClick: (sessionId: string) => void;
}

const SessionView = ({ onClick }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  // actions
  const fetchSessions = (interventionId: string) =>
    dispatch(fetchSessionsRequest(interventionId));

  // selectors
  const allSessions = useSelector(makeSelectSessions()) as SessionDto[];

  const {
    currentInterventionId,
    currentView,
    includeAllSessions,
    includeCurrentSession,
    initialSessionId,
    isMultiIntervention,
    setCurrentView,
    sessionTypesWhiteList,
  } = useContext(VariableChooserContext);

  useEffect(() => {
    fetchSessions(currentInterventionId);
  }, [currentInterventionId]);

  const sessions = useMemo(() => {
    const filteredSessions = allSessions?.filter(({ type }) =>
      sessionTypesWhiteList.includes(type),
    );
    if (includeAllSessions) return filteredSessions;

    const currentSession = allSessions?.find(
      ({ id }) => id === initialSessionId,
    ) as SessionDto;

    return filteredSessions?.filter(({ position }) =>
      includeCurrentSession
        ? position <= currentSession?.position
        : position < currentSession?.position,
    );
  }, [
    allSessions,
    includeAllSessions,
    includeCurrentSession,
    sessionTypesWhiteList,
  ]);

  const isInitialSession = (sessionId: string) =>
    sessionId === initialSessionId;

  const toInterventionView = () => {
    if (!isMultiIntervention) return;
    if (currentView === VIEWS.INTERVENTION) return;
    setCurrentView(VIEWS.INTERVENTION);
  };

  if (!sessions || !sessions.length)
    return (
      <ViewWrapper goBack={toInterventionView}>
        <Box padding={30}>
          {/* @ts-ignore */}
          <NoContent text={formatMessage(messages.noSessions)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper goBack={toInterventionView}>
      {sessions.map(({ id, name }, index) => (
        <SessionRow
          key={`${id}-select-session-${index}`}
          id={id}
          isInitialSession={isInitialSession(id)}
          isLast={index === sessions.length - 1}
          name={name}
          onClick={onClick}
        />
      ))}
    </ViewWrapper>
  );
};
export default memo(SessionView);
