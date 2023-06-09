import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, IntlShape } from 'react-intl';

import { injectReducer, injectSaga } from 'redux-injectors';

import { TemplateSection } from 'models/ReportTemplate/TemplateSection';

import {
  reportTemplatesReducer,
  reportTemplatesSaga,
  makeSelectReportTemplatesList,
  fetchReportTemplatesRequest,
  makeSelectReportTemplatesLoaders,
  makeSelectReportTemplatesErrors,
  makeSelectSelectedReportId,
  makeSelectSingleReportTemplate,
  makeSelectSelectedSectionTemplate,
  makeSelectSelectedSectionTemplateId,
  selectReportTemplate,
} from 'global/reducers/reportTemplates';
import {
  fetchInterventionSaga,
  interventionReducer,
  makeSelectEditingPossible,
} from 'global/reducers/intervention';
import {
  getSessionRequest,
  getSessionSaga,
  sessionReducer,
} from 'global/reducers/session';

import Column from 'components/Column';

import ReportTemplatesList from './components/ReportTemplatesList';
import ReportTemplateDetails from './components/ReportTemplateDetails';

import { ReportTemplatesContext } from './utils';
import messages from './messages';

const ReportTemplatesPage = ({
  reportTemplates,
  selectedReportId,
  singleReportTemplate,
  selectedTemplateSectionId,
  selectedTemplateSection,
  loaders,
  errors,
  match: {
    params: { sessionId, interventionId },
  },
  fetchReportTemplates,
  getSession,
  intl: { formatMessage },
  selectTemplate,
  editingPossible,
}) => {
  useEffect(() => {
    getSession({
      interventionId,
      sessionId,
    });
    fetchReportTemplates(sessionId);

    return () => selectTemplate(null);
  }, [sessionId]);

  useEffect(() => {
    if (loaders.shouldRefetch) fetchReportTemplates(sessionId);
  }, [loaders.shouldRefetch]);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Column overflow="hidden" height="100%">
        <ReportTemplatesContext.Provider
          value={{
            reportTemplates,
            singleReportTemplate,
            loaders,
            errors,
            selectedReportId,
            sessionId,
            interventionId,
            selectedTemplateSectionId,
            selectedTemplateSection,
            canEdit: editingPossible,
          }}
        >
          <ReportTemplatesList />
          <ReportTemplateDetails />
        </ReportTemplatesContext.Provider>
      </Column>
    </>
  );
};

ReportTemplatesPage.propTypes = {
  reportTemplates: PropTypes.arrayOf(PropTypes.object),
  loaders: PropTypes.object,
  errors: PropTypes.object,
  match: PropTypes.object,
  fetchReportTemplates: PropTypes.func,
  getSession: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
  selectedReportId: PropTypes.string,
  singleReportTemplate: PropTypes.object,
  selectedTemplateSectionId: PropTypes.string,
  selectedTemplateSection: PropTypes.shape(TemplateSection),
  selectTemplate: PropTypes.func,
  editingPossible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  reportTemplates: makeSelectReportTemplatesList(),
  loaders: makeSelectReportTemplatesLoaders(),
  errors: makeSelectReportTemplatesErrors(),
  selectedReportId: makeSelectSelectedReportId(),
  singleReportTemplate: makeSelectSingleReportTemplate(),
  selectedTemplateSectionId: makeSelectSelectedSectionTemplateId(),
  selectedTemplateSection: makeSelectSelectedSectionTemplate(),
  editingPossible: makeSelectEditingPossible(),
});

const mapDispatchToProps = {
  fetchReportTemplates: fetchReportTemplatesRequest,
  getSession: getSessionRequest,
  selectTemplate: selectReportTemplate,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
  injectReducer({ key: 'session', reducer: sessionReducer }),
  injectSaga({ key: 'getSession', saga: getSessionSaga }),
  injectReducer({ key: 'reportTemplates', reducer: reportTemplatesReducer }),
  injectSaga({ key: 'reportTemplatesSaga', saga: reportTemplatesSaga }),
)(ReportTemplatesPage);
