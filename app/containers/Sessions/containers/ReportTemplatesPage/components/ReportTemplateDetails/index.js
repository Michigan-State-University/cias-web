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

  if (!singleReportTemplate) return null;

  return (
    <Container
      style={{
        width: '100%',
        padding: 0,
        flex: 1,
        minHeight: 0,
      }}
      fluid
    >
      <Row justify="between" nogutter style={{ height: '100%' }}>
        <Col
          xs={selectedTemplateSectionId ? 7 : 12}
          style={{
            height: '100%',
            overflow: 'auto',
            paddingBottom: 40,
          }}
        >
          <ReportTemplateMainSettings />
          <ReportTemplatePreview />
        </Col>
        {selectedTemplateSectionId && (
          <Col xs={5} style={{ height: '100%', overflow: 'auto' }}>
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

const withConnect = connect(null, mapDispatchToProps);

ReportTemplateDetails.propTypes = {
  fetchSingleReportTemplate: PropTypes.func,
  selectTemplate: PropTypes.func,
};

export default compose(withConnect, injectIntl)(ReportTemplateDetails);
