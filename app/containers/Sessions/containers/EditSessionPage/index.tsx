import React, { useEffect } from 'react';
import { injectSaga, injectReducer } from 'redux-injectors';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useIntl } from 'react-intl';

import Loader from 'components/Loader';

import { localStateReducer } from 'global/reducers/localState';
import {
  getSessionRequest,
  sessionReducer,
  getSessionSaga,
  makeSelectSessionLoader,
  makeSelectSession,
} from 'global/reducers/session';
import {
  interventionReducer,
  fetchInterventionSaga,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';
import {
  fetchInterventionsSaga,
  interventionsReducer,
  fetchInterventionsRequest,
} from 'global/reducers/interventions';

import { canEdit } from 'models/Status/statusPermissions';

import {
  fetchReportTemplatesRequest,
  reportTemplatesReducer,
  reportTemplatesSaga,
} from 'global/reducers/reportTemplates';
import {
  CatSessionDto,
  ClassicSessionDto,
  SessionTypes,
} from 'models/Session/SessionDto';
import { RouteComponentProps } from 'react-router-dom';
import editInterventionPageSaga from './saga';

import messages from './messages';
import { EditSessionPageContext } from './utils';
import EditClassicSession from './EditClassicSession';

interface MatchParams {
  interventionId: string;
  sessionId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  getSession: ({
    sessionId,
    interventionId,
  }: {
    sessionId: string;
    interventionId: string;
  }) => void;
  getSessionLoader: boolean;
  fetchInterventions: () => void;
  fetchReportTemplates: (sessionId: string) => void;
  interventionStatus: string;
  session: ClassicSessionDto | CatSessionDto;
}

const EditSessionPage = ({
  getSession,
  match: { params },
  interventionStatus,
  getSessionLoader,
  session,
  fetchInterventions,
  fetchReportTemplates,
}: Props): JSX.Element => {
  const { name: sessionName, type } = session;
  const { formatMessage } = useIntl();
  const editingPossible = canEdit(interventionStatus);

  useEffect(() => {
    const { interventionId, sessionId: paramSessionId } = params;
    getSession({
      sessionId: paramSessionId,
      interventionId,
    });
    fetchInterventions();
    fetchReportTemplates(paramSessionId);
  }, []);

  const loading = getSessionLoader;

  // @ts-ignore
  if (loading) return <Loader size={100} />;

  return (
    <EditSessionPageContext.Provider
      value={{
        sessionId: params.sessionId,
        interventionId: params.interventionId,
      }}
    >
      <Helmet>
        <title>
          {formatMessage(messages.pageTitle, { name: sessionName })}
        </title>
      </Helmet>
      {type === SessionTypes.CLASSIC_SESSION && (
        <EditClassicSession
          editingPossible={editingPossible}
          interventionStatus={interventionStatus}
          session={session as ClassicSessionDto}
        />
      )}
    </EditSessionPageContext.Provider>
  );
};

const mapStateToProps = createStructuredSelector({
  getSessionLoader: makeSelectSessionLoader('getSession'),
  interventionStatus: makeSelectInterventionStatus(),
  session: makeSelectSession(),
});

const mapDispatchToProps = {
  getSession: getSessionRequest,
  fetchInterventions: fetchInterventionsRequest,
  fetchReportTemplates: fetchReportTemplatesRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'editInterventionPage',
  saga: editInterventionPageSaga,
});

export default compose(
  injectReducer({ key: 'session', reducer: sessionReducer }),
  // @ts-ignore
  injectReducer({ key: 'localState', reducer: localStateReducer }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectReducer({ key: 'interventions', reducer: interventionsReducer }),
  // @ts-ignore
  injectReducer({ key: 'reportTemplates', reducer: reportTemplatesReducer }),
  injectSaga({ key: 'getSession', saga: getSessionSaga }),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
  injectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga }),
  injectSaga({ key: 'reportTemplatesSaga', saga: reportTemplatesSaga }),
  withConnect,
  withSaga,
)(EditSessionPage);
