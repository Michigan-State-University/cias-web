/**
 *
 * ParticipantDashboard
 *
 */

import React, { Fragment, memo } from 'react';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import AppContainer from 'components/Container';
import Row from 'components/Row';
import Column from 'components/Column';

import allReportsSagas from 'global/reducers/participantDashboard/sagas';
import { dashboardReducer } from 'global/reducers/participantDashboard';

import LatestReport from './components/LatestReport';
import PendingSessions from './components/PendingSessions';
import Interventions from './components/Interventions';
import { StyledRow } from './styled';

export function ParticipantDashboard() {
  useInjectReducer({
    key: 'dashboard',
    reducer: dashboardReducer,
  });
  useInjectSaga({ key: 'reportsSaga', saga: allReportsSagas });

  return (
    <>
      <AppContainer>
        <StyledRow width="100%" justify="evenly">
          <PendingSessions />
          <Column width={70} />
          <LatestReport />
        </StyledRow>
        <Row width="100%" justify="center">
          <Interventions />
        </Row>
      </AppContainer>
    </>
  );
}

export default compose(memo)(ParticipantDashboard);
