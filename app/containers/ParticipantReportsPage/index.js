/**
 *
 * ParticipantReportsPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import ReportsList from 'containers/Reports/containers/ReportsList';

import AppContainer from 'components/Container';

import H1 from 'components/H1';
import messages from './messages';

const ParticipantReportsPage = () => {
  const { formatMessage } = useIntl();

  return (
    <AppContainer>
      <Helmet>
        <title>{formatMessage(messages.pageHeader)}</title>
      </Helmet>

      <H1 mt={64}>{formatMessage(messages.pageHeader)}</H1>

      <ReportsList disableFilter />
    </AppContainer>
  );
};

export default ParticipantReportsPage;
