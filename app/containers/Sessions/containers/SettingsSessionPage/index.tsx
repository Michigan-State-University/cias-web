import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useParams } from 'react-router-dom';

import { colors } from 'theme';

import { Session } from 'models/Session';

import {
  getSessionRequest,
  sessionReducer,
  makeSelectSession,
  getSessionSaga,
} from 'global/reducers/session';

import Box from 'components/Box';

import SessionSettings from './components/SessionSettings';
import messages from './messages';
import { StyledColumn } from './styled';

const SettingsInterventionPage = () => {
  const dispatch = useDispatch();
  const session = useSelector<unknown, Session>(makeSelectSession());
  const { formatMessage } = useIntl();
  const params = useParams<{ interventionId: string; sessionId: string }>();

  const {
    name,
    variable,
    settings: { narrator: narratorSettings } = {},
    googleTtsVoice,
    currentNarrator,
    multipleFill,
    autofinishEnabled,
    autofinishDelay,
  } = session;
  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectSaga({ key: 'getSession', saga: getSessionSaga });

  useEffect(() => {
    dispatch(
      getSessionRequest({
        interventionId: params.interventionId,
        sessionId: params.sessionId,
      }),
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle, { name })}</title>
      </Helmet>
      <Box
        width="100%"
        display="flex"
        justify="center"
        align="center"
        pt={40}
        pb={100}
        bg={colors.zirkon}
      >
        <StyledColumn height="100%">
          <SessionSettings
            name={name}
            variable={variable ?? ''}
            narratorSettings={narratorSettings}
            formatMessage={formatMessage}
            googleTtsVoice={googleTtsVoice}
            currentNarrator={currentNarrator}
            multipleFill={multipleFill}
            autofinishEnabled={autofinishEnabled}
            autofinishDelay={autofinishDelay}
          />
        </StyledColumn>
      </Box>
    </>
  );
};

export default SettingsInterventionPage;
