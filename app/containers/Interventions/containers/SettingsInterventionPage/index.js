import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import { colors } from 'theme';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  getSessionRequest,
  sessionReducer,
  makeSelectSession,
  getSessionSaga,
} from 'global/reducers/session';

import SessionSettings from 'containers/Interventions/containers/SettingsInterventionPage/components/SessionSettings';
import messages from './messages';
import { StyledColumn } from './styled';

const SettingsInterventionPage = ({
  session: { name, settings: { narrator: narratorSettings } = {} },
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
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle, { name })}</title>
      </Helmet>
      <Box
        width="100%"
        height="100%"
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
            narratorSettings={narratorSettings}
            formatMessage={formatMessage}
          />
        </StyledColumn>
      </Box>
    </Fragment>
  );
};

SettingsInterventionPage.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    settings: PropTypes.shape({
      narrator: PropTypes.shape({
        voice: PropTypes.bool,
        narrator: PropTypes.bool,
      }),
      account_required: PropTypes.bool,
    }),
  }),
  match: PropTypes.object,
  getSession: PropTypes.func,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
});

const mapDispatchToProps = {
  getSession: getSessionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(SettingsInterventionPage);
