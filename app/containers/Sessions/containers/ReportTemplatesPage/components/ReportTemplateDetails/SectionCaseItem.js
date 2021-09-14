import React, { memo, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Container } from 'react-grid-system';
import { useIntl } from 'react-intl';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import {
  deleteSectionCaseImageRequest,
  deleteSectionCaseRequest,
  updateSectionCaseRequest,
} from 'global/reducers/reportTemplates';

import { VariableHelper } from 'models/Helpers';
import { SectionCase } from 'models/ReportTemplate';
import {
  currencyQuestion,
  dateQuestion,
  nameQuestion,
  numberQuestion,
  textboxQuestion,
  visualAnalogueScaleQuestion,
} from 'models/Session/QuestionTypes';
import { colors, themeColors } from 'theme';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import VariableChooser from 'containers/VariableChooser';

import { Col } from 'components/ReactGridSystem';
import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import Text from 'components/Text';
import Img from 'components/Img';
import Collapse from 'components/Collapse';
import H2 from 'components/H2';
import Radio from 'components/Radio';
import InequalityChooser from 'components/InequalityChooser';
import ImageUpload from 'components/ImageUpload';
import TextButton from 'components/Button/TextButton';
import OriginalTextHover from 'components/OriginalTextHover';
import { ModalType, useModal } from 'components/Modal';

import { SessionTypes } from 'models/Session/SessionDto';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';
import Option from './Option';

const originalTextIconProps = {
  position: 'absolute',
  right: 21,
  bottom: 12,
};

const SectionCaseItem = ({
  title,
  sectionCase,
  updateSectionCase,
  deleteImage,
  deleteCase,
  openCollapsable,
  isOpened,
}) => {
  const { formatMessage } = useIntl();

  const {
    interventionId,
    sessionId,
    selectedTemplateSectionId,
    loaders: { updateReportTemplateLoading },
    canEdit,
  } = useContext(ReportTemplatesContext);

  useEffect(() => {
    if (!updateReportTemplateLoading) setIsUploadingImage(false);
    if (!updateReportTemplateLoading) setIsUpdatingWithVariable(false);
  }, [updateReportTemplateLoading]);

  const [titleVisible, setTitleVisible] = useState(Boolean(sectionCase.title));
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUpdatingWithVariable, setIsUpdatingWithVariable] = useState(false);

  const handleSectionCaseUpdate = (
    newSectionCase,
    imageData,
    previewChanged,
  ) => {
    updateSectionCase(
      newSectionCase,
      selectedTemplateSectionId,
      imageData,
      previewChanged,
    );
  };

  const handlePreviewChange = (_, event) => {
    event.preventDefault();
    event.stopPropagation();
    handleSectionCaseUpdate({ ...sectionCase, preview: true }, null, true);
  };

  const handleFormulaMatchChange = (formulaMatch) => {
    handleSectionCaseUpdate({ ...sectionCase, formulaMatch });
  };

  const handleTitleChange = (newTitle) => {
    handleSectionCaseUpdate({ ...sectionCase, title: newTitle });
  };

  const handleTitleToggle = (value) => {
    if (!value) handleTitleChange('');
    setTitleVisible(value);
  };

  const handleContentChange = (content) => {
    handleSectionCaseUpdate({ ...sectionCase, content });
  };

  const handleAddVariable = (variable) => {
    setIsUpdatingWithVariable(true);
    const variableHelper = new VariableHelper(variable);

    handleContentChange(
      `${
        sectionCase.content
      }${variableHelper.getFormattedVariableForDynamicInput()}`,
    );
  };

  const handleImageChange = (image) => {
    setIsUploadingImage(true);

    handleSectionCaseUpdate(sectionCase, image.image);
  };

  const handleImageDelete = () => {
    deleteImage(sectionCase.id, selectedTemplateSectionId);
  };

  const handleDeleteCase = () => {
    deleteCase(sectionCase.id, selectedTemplateSectionId);
  };

  const { openModal: openDeleteModal, Modal: DeleteModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteSectionCaseHeader),
      content: formatMessage(messages.deleteSectionCaseMessage),
      confirmAction: handleDeleteCase,
    },
  });

  return (
    <>
      <DeleteModal />

      <Collapse
        disabled
        isOpened={isOpened}
        onToggle={openCollapsable}
        height="auto"
        px={0}
        bgOpacity={0}
        onHideImg={arrowDown}
        onShowImg={arrowUp}
        imgWithBackground
        label={
          <Row
            align="center"
            justify="between"
            style={{ width: '100%', paddingRight: 10 }}
          >
            <Col xs={6}>
              <H2>{title}</H2>
              {sectionCase.formulaMatch && (
                <Text color={colors.grey}>
                  {formatMessage(messages.formulaMatchLookup, {
                    formulaMatch: sectionCase.formulaMatch,
                  })}
                </Text>
              )}
            </Col>
            <Col align="end" xs={6}>
              <Row align="center" justify="end" nogutter>
                <Col>
                  <Radio
                    id={`case-preview-toggle-${sectionCase.id}`}
                    mr={10}
                    disabled={!canEdit}
                    onChange={handlePreviewChange}
                    checked={sectionCase.preview}
                  >
                    <Text
                      width="max-content"
                      whiteSpace="pre"
                      fontWeight={sectionCase.preview ? 'bold' : 'normal'}
                    >
                      {formatMessage(messages.previewCaseRadio)}
                    </Text>
                  </Radio>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      >
        <Container style={{ width: '100%' }} role="group" aria-label={title}>
          <Row justify="between" align="center" style={{ marginBottom: 20 }}>
            <Col xs="content">
              <Row align="center">
                <Img
                  src={binNoBg}
                  onClick={openDeleteModal}
                  mr={10}
                  disabled={!canEdit}
                  clickable
                />
                <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
                <InequalityChooser
                  onSuccessfulChange={handleFormulaMatchChange}
                  inequalityValue={sectionCase.formulaMatch}
                  disabled={!canEdit}
                />
              </Row>
            </Col>
            <Col xs="content">
              <Row justify="end" align="center">
                <Option
                  key="section-title-toggle"
                  label={formatMessage(messages.sectionCaseTitleToggle)}
                  labelId={sectionCase.id}
                  value={titleVisible}
                  action={handleTitleToggle}
                  disabled={!canEdit}
                />
              </Row>
            </Col>
          </Row>

          {titleVisible && (
            <Row justify="start">
              <Text whiteSpace="pre">
                {formatMessage(messages.sectionCaseTitleHeader)}
              </Text>
              <Box
                bg={colors.linkWater}
                width="100%"
                mt={10}
                mb={20}
                px={8}
                py={8}
              >
                <StyledInput
                  type="multiline"
                  rows="1"
                  width="100%"
                  placeholder={formatMessage(
                    messages.sectionCaseTitlePlaceholder,
                  )}
                  value={sectionCase.title}
                  onBlur={handleTitleChange}
                  disabled={!canEdit}
                />
              </Box>
            </Row>
          )}

          <Row justify="start">
            <Col style={{ padding: 0 }}>
              <Text whiteSpace="pre" id="section-case-content">
                {formatMessage(messages.sectionCaseContentHeader)}
              </Text>
            </Col>
            <Col style={{ padding: 0, height: 30 }} align="end">
              <VariableChooser
                disabled={!canEdit}
                interventionId={interventionId}
                onClick={handleAddVariable}
                placement="right"
                questionTypeWhitelist={[
                  dateQuestion.id,
                  textboxQuestion.id,
                  numberQuestion.id,
                  visualAnalogueScaleQuestion.id,
                  currencyQuestion.id,
                  nameQuestion.id,
                ]}
                sessionId={sessionId}
                includeAllVariables
                includeCurrentSession
                includeNonDigitVariables
                isMultiSession
                sessionTypesWhiteList={[SessionTypes.CLASSIC_SESSION]}
              >
                <TextButton
                  whiteSpace="nowrap"
                  fontWeight="bold"
                  fontSize={14}
                  loading={isUpdatingWithVariable}
                  buttonProps={{
                    color: themeColors.secondary,
                    fontWeight: 'bold',
                  }}
                  spinnerProps={{ size: 30, width: 2 }}
                >
                  {formatMessage(messages.addVariableButton)}
                </TextButton>
              </VariableChooser>
            </Col>
            <Box
              bg={colors.linkWater}
              width="100%"
              mt={10}
              mb={20}
              px={8}
              py={8}
            >
              <OriginalTextHover
                id={`section-case-${sectionCase.id}`}
                text={sectionCase.originalText?.content}
                position="relative"
                mr={-9}
                iconProps={originalTextIconProps}
              >
                <StyledInput
                  aria-labelledby="section-case-content"
                  type="multiline"
                  rows="5"
                  width="100%"
                  placeholder={formatMessage(
                    messages.sectionCaseContentPlaceholder,
                  )}
                  value={sectionCase.content}
                  onBlur={handleContentChange}
                  disabled={!canEdit}
                />
              </OriginalTextHover>
            </Box>
          </Row>

          <Row justify="start">
            <Text whiteSpace="pre">
              {formatMessage(messages.sectionCaseImageHeader)}
            </Text>
            <ImageUpload
              image={sectionCase.imageUrl}
              loading={isUploadingImage}
              onAddImage={handleImageChange}
              onDeleteImage={handleImageDelete}
              disabled={!canEdit}
              acceptedFormats={['JPG', 'PNG']}
            />
          </Row>
        </Container>
      </Collapse>
    </>
  );
};

const mapDispatchToProps = {
  updateSectionCase: updateSectionCaseRequest,
  deleteImage: deleteSectionCaseImageRequest,
  deleteCase: deleteSectionCaseRequest,
};

const withConnect = connect(null, mapDispatchToProps);

SectionCaseItem.propTypes = {
  title: PropTypes.string,
  updateSectionCase: PropTypes.func,
  deleteCase: PropTypes.func,
  deleteImage: PropTypes.func,
  sectionCase: PropTypes.shape(SectionCase),
  openCollapsable: PropTypes.func,
  isOpened: PropTypes.bool,
};

export default compose(withConnect, memo)(SectionCaseItem);
