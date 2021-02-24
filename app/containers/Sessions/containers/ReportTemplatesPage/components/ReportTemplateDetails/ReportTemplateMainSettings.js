import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { colors, themeColors } from 'theme';
import {
  deleteReportTemplateLogoRequest,
  deleteReportTemplateRequest,
  selectReportTemplate,
  updateReportTemplateRequest,
  ReportFor,
  generateTestReportRequest,
} from 'global/reducers/reportTemplates';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';
import download from 'assets/svg/download-2.svg';

import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
import Collapse from 'components/Collapse';
import H1 from 'components/H1';
import Radio from 'components/Radio';
import ImageUpload from 'components/ImageUpload';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Img from 'components/Img';

import { ReportTemplate } from 'models/ReportTemplate';
import { CardBox, Spacer } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const ReportTemplateMainSettings = ({
  intl: { formatMessage },
  updateReportTemplate,
  deleteReportTemplate,
  deleteReportTemplateLogo,
  generateTestReport,
}) => {
  const {
    sessionId,
    singleReportTemplate,
    loaders: {
      deleteReportTemplateLoading,
      deleteReportTemplateLogoLoading,
      updateReportTemplateLoading,
      generateTestReportLoading,
    },
  } = useContext(ReportTemplatesContext);

  useEffect(() => {
    if (!updateReportTemplateLoading) setIsUploadingImage(false);
  }, [updateReportTemplateLoading]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [openCollapsable, setOpenCollapsable] = useState(false);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);

  const onNameChange = name => {
    if (name !== singleReportTemplate.name)
      updateReportTemplate(sessionId, { ...singleReportTemplate, name });
  };

  const onReportForChange = reportFor => {
    if (reportFor !== singleReportTemplate.reportFor)
      updateReportTemplate(sessionId, { ...singleReportTemplate, reportFor });
  };

  const onLogoChange = logo => {
    setIsUploadingImage(true);
    updateReportTemplate(sessionId, singleReportTemplate, logo.image);
  };

  const onLogoDelete = () => {
    deleteReportTemplateLogo(sessionId, singleReportTemplate.id);
  };

  const onDelete = () => {
    deleteReportTemplate(sessionId, singleReportTemplate.id);
  };

  const onTestDownload = event => {
    event.preventDefault();
    event.stopPropagation();

    generateTestReport(sessionId, singleReportTemplate.id);
  };

  const imageUploading = updateReportTemplateLoading && isUploadingImage;

  return (
    <Container style={{ maxWidth: 600 }}>
      <Row justify="between" align="center">
        <Col>
          <Collapse
            disabled
            isOpened={openCollapsable}
            onToggle={toggleCollapsable}
            height="auto"
            px={0}
            bgOpacity={0}
            onHideImg={arrowDown}
            onShowImg={arrowUp}
            imgWithBackground
            label={
              <Row align="center" justify="between" style={{ width: '100%' }}>
                <Col>
                  <H1>{formatMessage(messages.settingsHeader)}</H1>
                </Col>
                <Col align="end">
                  <TextButton
                    onClick={onTestDownload}
                    whiteSpace="nowrap"
                    fontWeight="bold"
                    fontSize={14}
                    loading={generateTestReportLoading}
                    buttonProps={{
                      color: themeColors.secondary,
                      fontWeight: 'bold',
                      mr: 10,
                    }}
                    spinnerProps={{ size: 30, width: 2 }}
                  >
                    <Img src={download} mr={5} />
                    <FormattedMessage
                      {...messages.settingsDownloadReportButton}
                    />
                  </TextButton>
                </Col>
              </Row>
            }
          >
            <CardBox>
              <Container fluid>
                <Row style={{ marginBottom: 10 }}>
                  <Col>{formatMessage(messages.settingsReportFor)}</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                  <Col>
                    <Row
                      align="center"
                      style={{ margin: 0, cursor: 'pointer' }}
                      onClick={() => onReportForChange(ReportFor.participant)}
                    >
                      <Radio
                        mr={10}
                        checked={
                          singleReportTemplate.reportFor ===
                          ReportFor.participant
                        }
                      />
                      <Text>
                        {formatMessage(messages.settingsReportForParticipant)}
                      </Text>
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      align="center"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onReportForChange(ReportFor.thirdParty)}
                    >
                      <Radio
                        mr={10}
                        checked={
                          singleReportTemplate.reportFor ===
                          ReportFor.thirdParty
                        }
                      />
                      <Text>
                        {formatMessage(messages.settingsReportFor3rdParty)}
                      </Text>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ marginBottom: 20 }}>
                  <Col>
                    <Spacer />
                  </Col>
                </Row>

                <Row style={{ marginBottom: 10 }}>
                  <Col>{formatMessage(messages.settingsLogo)}</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                  <Col>
                    <ImageUpload
                      loading={
                        deleteReportTemplateLogoLoading || imageUploading
                      }
                      image={singleReportTemplate.logoUrl}
                      onAddImage={onLogoChange}
                      onDeleteImage={onLogoDelete}
                    />
                  </Col>
                </Row>

                <Row style={{ marginBottom: 20 }}>
                  <Col>
                    <Spacer />
                  </Col>
                </Row>

                <Row style={{ marginBottom: 10 }}>
                  <Col>{formatMessage(messages.settingsName)}</Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                  <Col>
                    <Box bg={colors.linkWater}>
                      <ApprovableInput
                        mr={0}
                        type="singleline"
                        value={singleReportTemplate.name}
                        onCheck={onNameChange}
                        placeholder={formatMessage(
                          messages.settingsNamePlaceholder,
                        )}
                      />
                    </Box>
                  </Col>
                </Row>

                <Row style={{ marginBottom: 20 }}>
                  <Col>
                    <Spacer />
                  </Col>
                </Row>

                <Row style={{ marginBottom: 10 }}>
                  <Col>
                    <TextButton
                      onClick={onDelete}
                      whiteSpace="nowrap"
                      fontWeight="bold"
                      fontSize={14}
                      loading={deleteReportTemplateLoading}
                      buttonProps={{
                        color: colors.flamingo,
                        fontWeight: 'bold',
                      }}
                      spinnerProps={{ size: 30, width: 2 }}
                    >
                      <FormattedMessage
                        {...messages.settingsDeleteReportTemplateButton}
                      />
                    </TextButton>
                  </Col>
                </Row>
              </Container>
            </CardBox>
          </Collapse>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = {
  updateReportTemplate: updateReportTemplateRequest,
  deleteReportTemplate: deleteReportTemplateRequest,
  deleteReportTemplateLogo: deleteReportTemplateLogoRequest,
  selectTemplate: selectReportTemplate,
  generateTestReport: generateTestReportRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

ReportTemplateMainSettings.propTypes = {
  intl: intlShape,
  updateReportTemplate: PropTypes.func,
  deleteReportTemplate: PropTypes.func,
  deleteReportTemplateLogo: PropTypes.func,
  generateTestReport: PropTypes.func,
  selectTemplate: PropTypes.func,
  selectedReport: PropTypes.shape(ReportTemplate),
};

export default compose(
  withConnect,
  injectIntl,
)(ReportTemplateMainSettings);
