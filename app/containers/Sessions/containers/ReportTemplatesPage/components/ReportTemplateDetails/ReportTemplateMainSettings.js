import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { Row, Container } from 'react-grid-system';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import { colors, themeColors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';

import {
  deleteReportTemplateLogoRequest,
  deleteReportTemplateRequest,
  selectReportTemplate,
  duplicateReportTemplateRequest,
  updateReportTemplateRequest,
  generateTestReportRequest,
  ReportFor,
} from 'global/reducers/reportTemplates';
import { makeSelectInterventionHfHsAccess } from 'global/reducers/intervention';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';
import download from 'assets/svg/download-2.svg';
import copy from 'assets/svg/copy3.svg';

import { Col } from 'components/ReactGridSystem';
import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
import Collapse from 'components/Collapse';
import H1 from 'components/H1';
import Radio from 'components/Radio';
import ImageUpload from 'components/ImageUpload';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Img from 'components/Img';
import FlexRow from 'components/Row';
import { ModalType, useModal } from 'components/Modal';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import { useSelectModal, SELECT_MODAL_WIDTH } from 'components/SelectModal';
import CopyModal from 'components/CopyModal';
import { VIEWS } from 'components/CopyModal/Components';
import Tooltip from 'components/Tooltip';

import { CardBox, Spacer } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';
import {
  createDuplicateModalOptions,
  REPORT_TEMPLATE_ACTION_BUTTONS_COMMON_PROPS,
} from './constants';
import { DuplicateReportTemplateOptionId } from './types';

const ReportTemplateMainSettings = ({
  intl: { formatMessage },
  duplicateReportTemplate,
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
      duplicateReportTemplateLoading,
      updateReportTemplateLoading,
      generateTestReportLoading,
    },
    canEdit,
  } = useContext(ReportTemplatesContext);

  const hfhsAccess = useSelector(makeSelectInterventionHfHsAccess());

  useEffect(() => {
    if (!updateReportTemplateLoading) setIsUploadingImage(false);
  }, [updateReportTemplateLoading]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [openCollapsable, setOpenCollapsable] = useState(false);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);

  const onNameChange = (name) => {
    if (name !== singleReportTemplate.name)
      updateReportTemplate(sessionId, { ...singleReportTemplate, name });
  };

  const onReportForChange = (reportFor) => {
    if (reportFor !== singleReportTemplate.reportFor)
      updateReportTemplate(sessionId, { ...singleReportTemplate, reportFor });
  };

  const onLogoChange = (logo) => {
    setIsUploadingImage(true);
    updateReportTemplate(sessionId, singleReportTemplate, logo.image);
  };

  const onLogoDelete = () => {
    deleteReportTemplateLogo(sessionId, singleReportTemplate.id);
  };

  const onDelete = () => {
    deleteReportTemplate(sessionId, singleReportTemplate.id);
  };

  const onTestDownload = (event) => {
    event.preventDefault();
    event.stopPropagation();

    generateTestReport(sessionId, singleReportTemplate.id);
  };

  const [duplicateInternallyModalVisible, setDuplicateInternallyModalVisible] =
    useState(false);

  const { openModal: openDeleteModal, Modal: DeleteModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteReportTemplateHeader),
      content: formatMessage(messages.deleteReportTemplateMessage),
      confirmAction: onDelete,
    },
  });

  const duplicateInternallyConfirmationModalProps = useMemo(
    () => ({
      description: formatMessage(messages.duplicateInternallyConfirmationTitle),
      content: formatMessage(messages.duplicateInternallyConfirmationContent),
      confirmationButtonText: formatMessage(globalMessages.iUnderstand),
      confirmationButtonColor: 'primary',
      confirmAction: () => setDuplicateInternallyModalVisible(true),
      hideCancelButton: true,
      icon: 'info',
      width: SELECT_MODAL_WIDTH,
    }),
    [setDuplicateInternallyModalVisible],
  );

  const {
    openModal: openDuplicateInternallyConfirmationModal,
    Modal: DuplicateInternallyConfirmationModal,
  } = useModal({
    type: ModalType.ConfirmationModal,
    props: duplicateInternallyConfirmationModalProps,
  });

  const handleDuplicateModalClose = (optionId) => {
    if (!optionId) return;

    switch (optionId) {
      case DuplicateReportTemplateOptionId.DUPLICATE_HERE: {
        duplicateReportTemplate(sessionId, singleReportTemplate.id);
        break;
      }
      case DuplicateReportTemplateOptionId.DUPLICATE_INTERNALLY: {
        openDuplicateInternallyConfirmationModal(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  const { openModal: openDuplicateModal, Modal: DuplicateModal } =
    useSelectModal(
      formatMessage(messages.duplicateModalTitle),
      handleDuplicateModalClose,
    );

  const duplicateModalOptions = useMemo(
    () => createDuplicateModalOptions(formatMessage, canEdit),
    [canEdit],
  );

  const onDuplicate = (event) => {
    event.preventDefault();
    event.stopPropagation();

    openDuplicateModal(duplicateModalOptions);
  };

  const handleDuplicateInternallySessionSelected = (targetSession) => {
    duplicateReportTemplate(
      sessionId,
      singleReportTemplate.id,
      targetSession.id,
    );
  };

  const imageUploading = updateReportTemplateLoading && isUploadingImage;
  const isReportForHenryFord =
    singleReportTemplate.reportFor === ReportFor.henryFordHealth;

  const hfhRadioButtonDisabled =
    !canEdit || (!hfhsAccess && isReportForHenryFord);

  return (
    <Container style={{ maxWidth: 600 }}>
      <DeleteModal />
      <DuplicateModal />
      <DuplicateInternallyConfirmationModal />
      <CopyModal
        visible={duplicateInternallyModalVisible}
        onClose={() => setDuplicateInternallyModalVisible(false)}
        copyAction={handleDuplicateInternallySessionSelected}
        disableInterventionCopy
        disableQuestionCopy
        disableCurrentSessionCopy
        pasteText={formatMessage(messages.duplicateToSelectedSession)}
        defaultView={VIEWS.SESSION}
      />

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
            toggleIconPosition="label"
            label={
              <HelpIconTooltip
                id="report-settings-cdh"
                tooltipContent={formatMessage(messages.reportSettingsHelp)}
              >
                <H1>{formatMessage(messages.settingsHeader)}</H1>
              </HelpIconTooltip>
            }
            extraIcons={
              <FlexRow gap={24} align="center">
                <TextButton
                  {...REPORT_TEMPLATE_ACTION_BUTTONS_COMMON_PROPS}
                  onClick={onDuplicate}
                  loading={duplicateReportTemplateLoading}
                >
                  <Img
                    src={copy}
                    title={formatMessage(
                      messages.settingsDuplicateReportButtonTitle,
                    )}
                  />
                  <FormattedMessage
                    {...messages.settingsDuplicateReportButton}
                  />
                </TextButton>
                <TextButton
                  {...REPORT_TEMPLATE_ACTION_BUTTONS_COMMON_PROPS}
                  onClick={onTestDownload}
                  loading={generateTestReportLoading}
                >
                  <Img
                    src={download}
                    title={formatMessage(
                      messages.settingsDownloadReportButtonTitle,
                    )}
                  />
                  <FormattedMessage
                    {...messages.settingsDownloadReportButton}
                  />
                </TextButton>
              </FlexRow>
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
                    >
                      <Radio
                        id={`report-for-toggle-${ReportFor.participant}`}
                        mr={10}
                        disabled={!canEdit}
                        checked={
                          singleReportTemplate.reportFor ===
                          ReportFor.participant
                        }
                        onChange={() =>
                          canEdit && onReportForChange(ReportFor.participant)
                        }
                      >
                        <Text>
                          {formatMessage(messages.settingsReportForParticipant)}
                        </Text>
                      </Radio>
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      align="center"
                      cursor={canEdit ? 'pointer' : 'initial'}
                    >
                      <Radio
                        id={`report-for-toggle-${ReportFor.thirdParty}`}
                        mr={10}
                        disabled={!canEdit}
                        checked={
                          singleReportTemplate.reportFor ===
                          ReportFor.thirdParty
                        }
                        onChange={() =>
                          canEdit && onReportForChange(ReportFor.thirdParty)
                        }
                      >
                        <Text>
                          {formatMessage(messages.settingsReportFor3rdParty)}
                        </Text>
                      </Radio>
                    </Row>
                  </Col>
                  {(hfhsAccess || (hfhRadioButtonDisabled && canEdit)) && (
                    <Col>
                      <Row
                        align="center"
                        cursor={canEdit ? 'pointer' : 'initial'}
                      >
                        <Radio
                          id={`report-for-toggle-${ReportFor.henryFordsHospital}`}
                          mr={10}
                          disabled={hfhRadioButtonDisabled}
                          checked={isReportForHenryFord}
                          onChange={() =>
                            canEdit &&
                            onReportForChange(ReportFor.henryFordHealth)
                          }
                        >
                          <Tooltip
                            id="hfhs-access-revoked-template-type"
                            place="top"
                            stretchContent
                            text={formatMessage(
                              messages.hfhReportTypeTooltipContent,
                            )}
                            visible={
                              !hfhsAccess && canEdit && isReportForHenryFord
                            }
                          >
                            <Text>
                              {formatMessage(
                                messages.settingsReportForHenryFordHealth,
                              )}
                            </Text>
                          </Tooltip>
                        </Radio>
                      </Row>
                    </Col>
                  )}
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
                      disabled={!canEdit}
                      image={singleReportTemplate.logoUrl}
                      onAddImage={onLogoChange}
                      onDeleteImage={onLogoDelete}
                      acceptedFormats={['JPG', 'PNG']}
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
                        disabled={!canEdit}
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
                      onClick={openDeleteModal}
                      whiteSpace="nowrap"
                      fontWeight="bold"
                      fontSize={14}
                      loading={deleteReportTemplateLoading}
                      buttonProps={{
                        color: themeColors.warning,
                        fontWeight: 'bold',
                        disabled: !canEdit,
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
  duplicateReportTemplate: duplicateReportTemplateRequest,
  updateReportTemplate: updateReportTemplateRequest,
  deleteReportTemplate: deleteReportTemplateRequest,
  deleteReportTemplateLogo: deleteReportTemplateLogoRequest,
  selectTemplate: selectReportTemplate,
  generateTestReport: generateTestReportRequest,
};

const withConnect = connect(null, mapDispatchToProps);

ReportTemplateMainSettings.propTypes = {
  intl: PropTypes.shape(IntlShape),
  duplicateReportTemplate: PropTypes.func,
  updateReportTemplate: PropTypes.func,
  deleteReportTemplate: PropTypes.func,
  deleteReportTemplateLogo: PropTypes.func,
  generateTestReport: PropTypes.func,
  selectTemplate: PropTypes.func,
  selectedReport: PropTypes.object,
};

export default compose(withConnect, injectIntl)(ReportTemplateMainSettings);
