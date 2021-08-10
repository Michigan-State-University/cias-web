import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { push } from 'connected-react-router';

import {
  getSessionRequest,
  getSessionSaga,
  makeSelectSession,
  makeSelectSessionError,
  sessionReducer,
  makeSelectSessionLoader,
} from 'global/reducers/session';
import {
  fetchInterventionSaga,
  interventionReducer,
} from 'global/reducers/intervention';

import { Container } from 'components/ReactGridSystem';
import H2 from 'components/H2';
import Loader from 'components/Loader';

import messages from './messages';

type RouteParams = {
  interventionId: string;
  sessionId: string;
};

const mainContainerStyle = {
  height: '100%',
  maxWidth: '100%',
  marginLeft: 5,
  marginRight: 5,
  paddingTop: 30,
  paddingBottom: 15,
};

const SessionMapPage = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });

  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectSaga({ key: 'getSession', saga: getSessionSaga });
  const loading = useSelector(makeSelectSessionLoader('getSession'));
  const error = useSelector(makeSelectSessionError('getSession'));
  const { id } = useSelector(makeSelectSession());

  const { interventionId, sessionId } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(
      getSessionRequest({
        sessionId,
        interventionId,
      }),
    );
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(push(`/interventions/${interventionId}`));
    }
  }, [error]);

  return (
    <Container style={mainContainerStyle}>
      <Helmet>
        <title>{formatMessage(messages.sessionMap)}</title>
      </Helmet>
      {
        // @ts-ignore
        loading ? <Loader /> : <H2>{id}</H2>
      }
    </Container>
  );
};

export default SessionMapPage;
