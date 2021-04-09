/**
 *
 * ParticipantDashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import allReportsSagas from 'global/reducers/generatedReports/sagas';
import { generatedReportsReducer } from 'global/reducers/generatedReports';
import { Helmet } from 'react-helmet';
import messages from 'containers/Sessions/containers/GeneratedReportsPage/messages';
import ReportsList from 'containers/Reports/containers/ReportsList';
import { injectIntl, IntlShape } from 'react-intl';
import AppContainer from 'components/Container';

export function ParticipantDashboard({ intl: { formatMessage } }) {
  useInjectReducer({
    key: 'generatedReports',
    reducer: generatedReportsReducer,
  });
  useInjectSaga({ key: 'reportsSaga', saga: allReportsSagas });

  return (
    <AppContainer>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <ReportsList disableFilter />
    </AppContainer>
  );
}
ParticipantDashboard.propTypes = {
  intl: PropTypes.shape(IntlShape),
};

export default compose(
  injectIntl,
  memo,
)(ParticipantDashboard);
