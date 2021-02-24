import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { injectReducer, injectSaga } from 'redux-injectors';

import {
  reportTemplatesReducer,
  reportTemplatesSaga,
  makeSelectReportTemplatesList,
  fetchReportTemplatesRequest,
  makeSelectReportTemplatesLoaders,
  makeSelectReportTemplatesErrors,
  makeSelectSelectedReportId,
  makeSelectSingleReportTemplate,
} from 'global/reducers/reportTemplates';

import {
  getSessionRequest,
  getSessionSaga,
  sessionReducer,
} from 'global/reducers/session';
import { ReportTemplate } from 'models/ReportTemplate';
import {
  makeSelectSelectedSectionTemplate,
  makeSelectSelectedSectionTemplateId,
} from 'global/reducers/reportTemplates/selectors';
import { TemplateSection } from 'models/ReportTemplate/TemplateSection';
import Box from 'components/Box';
import ReportTemplatesList from './components/ReportTemplatesList';
import { ReportTemplatesContext } from './utils';
import messages from './messages';
import ReportTemplateDetails from './components/ReportTemplateDetails';

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
}) => {
  useEffect(() => {
    getSession({
      interventionId,
      sessionId,
    });
    fetchReportTemplates(sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (loaders.shouldRefetch) fetchReportTemplates(sessionId);
  }, [loaders.shouldRefetch]);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Box>
        <ReportTemplatesContext.Provider
          value={{
            reportTemplates,
            singleReportTemplate,
            loaders,
            errors,
            selectedReportId,
            sessionId,
            selectedTemplateSectionId,
            selectedTemplateSection,
          }}
        >
          <ReportTemplatesList />
          <ReportTemplateDetails />
        </ReportTemplatesContext.Provider>
      </Box>
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
  intl: intlShape,
  selectedReportId: PropTypes.string,
  singleReportTemplate: PropTypes.shape(ReportTemplate),
  selectedTemplateSectionId: PropTypes.string,
  selectedTemplateSection: PropTypes.shape(TemplateSection),
};

const mapStateToProps = createStructuredSelector({
  reportTemplates: makeSelectReportTemplatesList(),
  loaders: makeSelectReportTemplatesLoaders(),
  errors: makeSelectReportTemplatesErrors(),
  selectedReportId: makeSelectSelectedReportId(),
  singleReportTemplate: makeSelectSingleReportTemplate(),
  selectedTemplateSectionId: makeSelectSelectedSectionTemplateId(),
  selectedTemplateSection: makeSelectSelectedSectionTemplate(),
});

const mapDispatchToProps = {
  fetchReportTemplates: fetchReportTemplatesRequest,
  getSession: getSessionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  injectReducer({ key: 'session', reducer: sessionReducer }),
  injectSaga({ key: 'getSession', saga: getSessionSaga }),
  injectReducer({ key: 'reportTemplates', reducer: reportTemplatesReducer }),
  injectSaga({ key: 'reportTemplatesSaga', saga: reportTemplatesSaga }),
)(ReportTemplatesPage);
