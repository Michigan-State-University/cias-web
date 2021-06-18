/**
 *
 * ParticipantDashboard
 *
 */

import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import allReportsSagas from 'global/reducers/generatedReports/sagas';
import { generatedReportsReducer } from 'global/reducers/generatedReports';

import GeneratedReportsPage from 'containers/Sessions/containers/GeneratedReportsPage';
import ReportsList from 'containers/Reports/containers/ReportsList';

import AppContainer from 'components/Container';

import H1 from 'components/H1';
import messages from './messages';

const ParticipantDashboard = () => {
  useInjectReducer({
    key: 'generatedReports',
    reducer: generatedReportsReducer,
  });
  useInjectSaga({ key: 'reportsSaga', saga: allReportsSagas });

  const { formatMessage } = useIntl();

  return (
    <AppContainer>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>

      <H1 mt={30}>{formatMessage(messages.pageHeader)}</H1>

      <ReportsList disableFilter />
    </AppContainer>
  );
};

GeneratedReportsPage.propTypes = {
  disableFilter: PropTypes.bool,
  match: PropTypes.object,
};

export default memo(ParticipantDashboard);
