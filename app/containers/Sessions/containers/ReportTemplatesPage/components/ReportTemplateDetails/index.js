import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { injectIntl } from 'react-intl';

import {
  fetchSingleReportTemplateRequest,
  selectTemplateSection,
} from 'global/reducers/reportTemplates';

import Loader from 'components/Loader';
import { elements } from 'theme';
import ReportTemplatePreview from './ReportTemplatePreview';
import TemplateSectionSettings from './TemplateSectionSettings';
import ReportTemplateMainSettings from './ReportTemplateMainSettings';
import { ReportTemplatesContext } from '../../utils';

const ReportTemplateDetails = ({
  fetchSingleReportTemplate,
  selectTemplate,
}) => {
  const {
    sessionId,
    selectedReportId,
    singleReportTemplate,
    selectedTemplateSectionId,
    loaders: { fetchSingleReportTemplateLoading },
  } = useContext(ReportTemplatesContext);

  useEffect(() => {
    if (selectedReportId)
      fetchSingleReportTemplate(selectedReportId, sessionId);
  }, [selectedReportId]);

  useEffect(() => {
    if (singleReportTemplate) {
      const firstTemplateSection = singleReportTemplate.sections[0];

      selectTemplate(firstTemplateSection?.id);
    }
  }, [singleReportTemplate?.id]);

  if (fetchSingleReportTemplateLoading) return <Loader type="inline" />;

  if (!singleReportTemplate) return <></>;

  return (
    <Container
      style={{
        width: '100%',
        padding: 0,
      }}
      fluid
    >
      <Row justify="between" nogutter>
        <Col
          xs={selectedTemplateSectionId ? 7 : 12}
          style={{
            height: `calc(100vh - ${2 * elements.navbarHeight}px)`,
            overflow: 'auto',
          }}
        >
          <ReportTemplateMainSettings />
          <ReportTemplatePreview />
        </Col>
        {selectedTemplateSectionId && (
          <Col xs={5}>
            <TemplateSectionSettings />
          </Col>
        )}
      </Row>
    </Container>
  );
};

const mapDispatchToProps = {
  fetchSingleReportTemplate: fetchSingleReportTemplateRequest,
  selectTemplate: selectTemplateSection,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

ReportTemplateDetails.propTypes = {
  fetchSingleReportTemplate: PropTypes.func,
  selectTemplate: PropTypes.func,
};

export default compose(
  withConnect,
  injectIntl,
)(ReportTemplateDetails);
