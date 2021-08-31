import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { push } from 'connected-react-router';
import { ReactFlowProvider } from 'react-flow-renderer';

import {
  getSessionRequest,
  getSessionSaga,
  makeSelectSessionError,
  sessionReducer,
  makeSelectSessionLoader,
} from 'global/reducers/session';
import {
  fetchInterventionSaga,
  interventionReducer,
  makeSelectIntervention,
  makeSelectInterventionLoader,
  makeSelectInterventionError,
  fetchInterventionRequest,
} from 'global/reducers/intervention';
import {
  makeSelectQuestions,
  questionsReducer,
} from 'global/reducers/questions';
import {
  getQuestionGroupsRequest,
  getQuestionGroupsSaga,
  makeSelectGetQuestionGroupLoader,
  makeSelectGetQuestionGroupError,
  makeSelectQuestionGroups,
  questionGroupsReducer,
} from 'global/reducers/questionGroups';
import {
  makeSelectReportTemplatesList,
  reportTemplatesReducer,
  reportTemplatesSaga,
  makeSelectReportTemplatesErrors,
  makeSelectReportTemplatesLoaders,
  fetchReportTemplatesRequest,
} from 'global/reducers/reportTemplates';
import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';
import { ReportTemplate } from 'global/types/reportTemplate';

import useQuery from 'utils/useQuery';

import Loader from 'components/Loader';
import Column from 'components/Column';
import Row from 'components/Row';

import messages from './messages';
import { sortQuestionsByGroupAndPosition } from './utils';
import { defaultMaxZoom, defaultMinZoom, defaultZoom } from './constants';
import SessionMapHeader from './components/SessionMapHeader';
import SessionMap from './components/SessionMap';
import SessionMapFooter from './components/SessionMapFooter';
import { QuestionDetailsColumn } from './components/styled';
import SessionMapQuestionDetails from './components/QuestionDetails';

type RouteParams = {
  interventionId: string;
  sessionId: string;
};

const SessionMapPage = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga });
  const intervention = useSelector(makeSelectIntervention());
  const interventionLoading = useSelector(
    makeSelectInterventionLoader('fetchInterventionLoading'),
  );
  const interventionError = useSelector(
    makeSelectInterventionError('fetchInterventionError'),
  );

  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectSaga({ key: 'getSession', saga: getSessionSaga });
  const sessionLoading = useSelector(makeSelectSessionLoader('getSession'));
  const sessionError = useSelector(makeSelectSessionError('getSession'));

  // @ts-ignore
  useInjectReducer({ key: 'questionGroups', reducer: questionGroupsReducer });
  useInjectSaga({ key: 'questionGroupsSaga', saga: getQuestionGroupsSaga });
  const questionGroups = useSelector(
    makeSelectQuestionGroups(),
  ) as QuestionGroup[];
  const questionGroupsLoading = useSelector(makeSelectGetQuestionGroupLoader());
  const questionGroupsError = useSelector(makeSelectGetQuestionGroupError());

  useInjectReducer({ key: 'questions', reducer: questionsReducer });
  const questions = useSelector(makeSelectQuestions()) as Question[];

  // @ts-ignore
  useInjectReducer({ key: 'reportTemplates', reducer: reportTemplatesReducer });
  useInjectSaga({ key: 'reportTemplatesSaga', saga: reportTemplatesSaga });
  const reportTemplates = useSelector(
    makeSelectReportTemplatesList(),
  ) as ReportTemplate[];
  const { fetchReportTemplatesLoading: reportTemplatesLoading } = useSelector(
    makeSelectReportTemplatesLoaders(),
  );
  const { fetchReportTemplatesError: reportTemplatesError } = useSelector(
    makeSelectReportTemplatesErrors(),
  );

  const sortedQuestions = useMemo(
    () => sortQuestionsByGroupAndPosition(questionGroups, questions),
    [questions, questionGroups],
  );

  const { interventionId, sessionId } = useParams<RouteParams>();
  const userSessionId = useQuery('userSessionId');

  const [showDetailsId, setShowDetailsId] = useState('');

  const [showDetailsQuestion, showDetailsQuestionGroup] = useMemo(() => {
    const question = questions.find(({ id }) => id === showDetailsId);
    if (!question) return [undefined, undefined];
    const questionGroup = questionGroups.find(
      ({ id }) => id === question.question_group_id,
    );
    return [question, questionGroup];
  }, [showDetailsId, questions, questionGroups]);

  const [showWithBranchingOnly, setShowWithBranchingOnly] = useState(false);

  const [zoom, setZoom] = useState(defaultZoom);
  const [minZoom, setMinZoom] = useState(defaultMinZoom);
  const handleZoomIn = () => setZoom(Math.min(defaultMaxZoom, zoom + 0.25));
  const handleZoomOut = () => setZoom(Math.max(minZoom, zoom - 0.25));

  useEffect(() => {
    dispatch(
      getSessionRequest({
        sessionId,
        interventionId,
      }),
    );
    dispatch(getQuestionGroupsRequest(sessionId));
    dispatch(fetchReportTemplatesRequest(sessionId, interventionId));
    dispatch(fetchInterventionRequest(interventionId));
  }, []);

  useEffect(() => {
    if (sessionError || questionGroupsError || reportTemplatesError) {
      dispatch(push(`/interventions/${interventionId}`));
    }
  }, [sessionError, questionGroupsError, reportTemplatesError]);

  useEffect(() => {
    if (interventionError) dispatch(push(``));
  }, [interventionError]);

  const showDetails = Boolean(
    showDetailsId && showDetailsQuestion && showDetailsQuestionGroup,
  );

  const loading = Boolean(
    sessionLoading ||
      questionGroupsLoading ||
      reportTemplatesLoading ||
      interventionLoading,
  );

  return (
    <Row height="100%">
      <Column
        height="100%"
        pt={40}
        pb={20}
        px={20}
        xs={showDetails ? 6 : 12}
        md={showDetails ? 7 : 12}
        lg={showDetails ? 8 : 12}
      >
        <Helmet>
          <title>{formatMessage(messages.sessionMap)}</title>
        </Helmet>
        {loading && (
          // @ts-ignore
          <Loader />
        )}
        {!loading && (
          <>
            <SessionMapHeader
              showWithBranchingOnly={showWithBranchingOnly}
              onShowWithBranchingOnlyChange={setShowWithBranchingOnly}
            />
            <ReactFlowProvider>
              <SessionMap
                questions={sortedQuestions}
                showDetailsId={showDetailsId}
                onShowDetailsIdChange={setShowDetailsId}
                zoom={zoom}
                onZoomChange={setZoom}
                minZoom={minZoom}
                onMinZoomChange={setMinZoom}
              />
            </ReactFlowProvider>
            <SessionMapFooter
              afterPreview={Boolean(userSessionId)}
              zoomIn={handleZoomIn}
              zoomOut={handleZoomOut}
              zoomInDisabled={zoom === defaultMaxZoom}
              zoomOutDisabled={zoom === minZoom}
            />
          </>
        )}
      </Column>
      {showDetailsId && showDetailsQuestion && showDetailsQuestionGroup && (
        <QuestionDetailsColumn xs={6} md={5} lg={4}>
          <SessionMapQuestionDetails
            question={showDetailsQuestion}
            questionGroup={showDetailsQuestionGroup}
            reportTemplates={reportTemplates}
            sessions={intervention?.sessions || []}
            questions={questions}
          />
        </QuestionDetailsColumn>
      )}
    </Row>
  );
};

export default SessionMapPage;
