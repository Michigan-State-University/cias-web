import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { injectIntl, IntlShape } from 'react-intl';

import {
  addTemplateSectionRequest,
  updateReportTemplateRequest,
} from 'global/reducers/reportTemplates';

import { TemplateSectionBuilder } from 'models/ReportTemplate';

import DashedButton from 'components/Button/DashedButton';

import Img from 'components/Img';
import { StyledInput } from 'components/Input/StyledInput';
import TemplateSectionItem from './TemplateSectionItem';
import { CardBox } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const ReportTemplatePreview = ({
  intl: { formatMessage },
  addSection,
  updateReportTemplate,
}) => {
  const {
    selectedReportId,
    sessionId,
    singleReportTemplate,
    loaders: { updateReportTemplateLoading },
    canEdit,
  } = useContext(ReportTemplatesContext);

  useEffect(() => {
    if (!updateReportTemplateLoading) setIsAddingSection(false);
  }, [updateReportTemplateLoading]);

  const [isAddingSection, setIsAddingSection] = useState();

  const handleAddSection = () => {
    setIsAddingSection(true);
    addSection(new TemplateSectionBuilder().build(), selectedReportId);
  };

  const onSummaryChange = summary => {
    if (summary !== singleReportTemplate.summary)
      updateReportTemplate(sessionId, { ...singleReportTemplate, summary });
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      <Row justify="between" align="center">
        <Col>
          <CardBox style={{ padding: '50px 40px' }}>
            <Container style={{ padding: 0 }} fluid>
              {singleReportTemplate.logoUrl && (
                <Row style={{ marginBottom: 30 }}>
                  <Col>
                    <Img
                      src={singleReportTemplate.logoUrl}
                      maxWidth={200}
                      height="auto"
                    />
                  </Col>
                </Row>
              )}
              <Row style={{ marginBottom: 30 }}>
                <Col>
                  <StyledInput
                    type="singleline"
                    width="100%"
                    placeholder={formatMessage(
                      messages.reportHeaderPlaceholder,
                    )}
                    value={singleReportTemplate.summary ?? ''}
                    onBlur={onSummaryChange}
                    disabled={!canEdit}
                    fontSize={32}
                    maxWidth="none"
                    fontWeight="bold"
                    pl="0px"
                  />
                </Col>
              </Row>
              {singleReportTemplate.sections.map(section => (
                <Row
                  key={`template-section-${section.id}`}
                  style={{ padding: 0 }}
                >
                  <Col style={{ padding: 0 }}>
                    <TemplateSectionItem templateSection={section} />
                  </Col>
                </Row>
              ))}
              <Row>
                <Col>
                  <DashedButton
                    loading={isAddingSection}
                    onClick={handleAddSection}
                    disabled={!canEdit}
                  >
                    {formatMessage(messages.addSectionButton)}
                  </DashedButton>
                </Col>
              </Row>
            </Container>
          </CardBox>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = {
  addSection: addTemplateSectionRequest,
  updateReportTemplate: updateReportTemplateRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

ReportTemplatePreview.propTypes = {
  intl: PropTypes.shape(IntlShape),
  addSection: PropTypes.func,
  updateReportTemplate: PropTypes.func,
};

export default compose(
  withConnect,
  injectIntl,
)(ReportTemplatePreview);
