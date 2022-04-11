import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, IntlShape } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { colors } from 'theme';

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

const SettingsInterventionPage = ({
  session: {
    name,
    variable,
    settings: { narrator: narratorSettings } = {},
    googleTtsVoice,
  },
  match: { params },
  getSession,
  intl: { formatMessage },
}) => {
  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectSaga({ key: 'getSession', saga: getSessionSaga });

  useEffect(() => {
    getSession({
      interventionId: params.interventionId,
      sessionId: params.sessionId,
    });
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
          />
        </StyledColumn>
      </Box>
    </>
  );
};

SettingsInterventionPage.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    variable: PropTypes.string,
    settings: PropTypes.shape({
      narrator: PropTypes.shape({
        voice: PropTypes.bool,
        narrator: PropTypes.bool,
      }),
      account_required: PropTypes.bool,
    }),
    googleTtsVoice: PropTypes.object,
  }),
  match: PropTypes.object,
  getSession: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
});

const mapDispatchToProps = {
  getSession: getSessionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect)(SettingsInterventionPage);
