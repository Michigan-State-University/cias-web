import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Container } from 'react-grid-system';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import { boxShadows, colors, elements, themeColors } from 'theme';
import {
  selectReportTemplate,
  addReportTemplateRequest,
} from 'global/reducers/reportTemplates';

import Loader from 'components/Loader';
import { UnderlinedLabel } from 'components/UnderlinedLabel';
import TextButton from 'components/Button/TextButton';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import Box from 'components/Box';

import { ReportTemplateBuilder } from 'models/ReportTemplate';
import { ReportTemplatesContext } from '../utils';
import messages from '../messages';

const ReportTemplatesList = ({
  intl: { formatMessage },
  addReportTemplate,
  selectTemplate,
}) => {
  const {
    reportTemplates,
    selectedReportId,
    sessionId,
    loaders: { fetchReportTemplatesLoading, addReportTemplateLoading },
    errors: { fetchReportTemplatesError },
    canEdit,
  } = useContext(ReportTemplatesContext);

  const handleAddReportTemplate = () => {
    const reportTemplate = new ReportTemplateBuilder().build();

    addReportTemplate(sessionId, reportTemplate);
  };

  const getContent = useCallback(() => {
    if (fetchReportTemplatesLoading) return <Loader type="inline" />;

    if (fetchReportTemplatesError)
      return <Col xs={10}>{formatMessage(messages.reportsError)}</Col>;

    return (
      <>
        <Col xs={10}>
          <Row align="center" style={{ paddingLeft: 25 }}>
            <ScrollFogBox
              overflow="scroll"
              horizontalFogVisible
              verticalFogVisible={false}
            >
              <Box display="flex" align="center" height={40}>
                {!reportTemplates.length && (
                  <Col xs={10}>{formatMessage(messages.reportsEmpty)}</Col>
                )}
                {reportTemplates.map((template, index) => (
                  <UnderlinedLabel
                    style={{ whiteSpace: 'nowrap' }}
                    key={`report-template-${index}`}
                    isActive={selectedReportId === template.id}
                    text={template.name}
                    onClick={() => selectTemplate(template.id)}
                  />
                ))}
              </Box>
            </ScrollFogBox>
          </Row>
        </Col>
        <Col xs={2}>
          <TextButton
            onClick={handleAddReportTemplate}
            whiteSpace="nowrap"
            fontWeight="bold"
            fontSize={14}
            loading={addReportTemplateLoading}
            buttonProps={{
              color: themeColors.secondary,
              fontWeight: 'bold',
              style: { marginBottom: 18 },
              disabled: !canEdit,
            }}
            spinnerProps={{ size: 30, width: 2 }}
          >
            <FormattedMessage {...messages.addReportButton} />
          </TextButton>
        </Col>
      </>
    );
  }, [
    reportTemplates,
    fetchReportTemplatesLoading,
    fetchReportTemplatesError,
    addReportTemplateLoading,
    selectedReportId,
    canEdit,
  ]);

  return (
    <Container style={{ padding: 0 }} fluid>
      <Row
        style={{
          backgroundColor: colors.white,
          height: elements.navbarHeight,
          boxShadow: boxShadows.selago,
          padding: 10,
          zIndex: 1,
          position: 'relative',
          margin: 0,
        }}
        justify="between"
        align="center"
      >
        {getContent()}
      </Row>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  addReportTemplate: addReportTemplateRequest,
  selectTemplate: selectReportTemplate,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

ReportTemplatesList.propTypes = {
  intl: PropTypes.shape(IntlShape),
  addReportTemplate: PropTypes.func,
  selectTemplate: PropTypes.func,
};

export default compose(
  withConnect,
  injectIntl,
)(ReportTemplatesList);
