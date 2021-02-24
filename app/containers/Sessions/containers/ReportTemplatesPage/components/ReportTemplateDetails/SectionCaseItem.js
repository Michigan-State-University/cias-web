import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { injectIntl, intlShape } from 'react-intl';

import {
  deleteSectionCaseImageRequest,
  deleteSectionCaseRequest,
  updateSectionCaseRequest,
} from 'global/reducers/reportTemplates';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import { SectionCase } from 'models/ReportTemplate';
import { colors } from 'theme';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import Text from 'components/Text';
import Img from 'components/Img';
import Collapse from 'components/Collapse';
import H2 from 'components/H2';
import Radio from 'components/Radio';
import InequalityChooser from 'components/InequalityChooser';
import ImageUpload from 'components/ImageUpload';

import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';
import Option from './Option';

const SectionCaseItem = ({
  intl: { formatMessage },
  title,
  sectionCase,
  updateSectionCase,
  deleteImage,
  deleteCase,
}) => {
  const {
    selectedTemplateSectionId,
    loaders: { updateReportTemplateLoading },
  } = useContext(ReportTemplatesContext);

  useEffect(() => {
    if (!updateReportTemplateLoading) setIsUploadingImage(false);
  }, [updateReportTemplateLoading]);

  const [openCollapsable, setOpenCollapsable] = useState(false);
  const toggleCollapsable = () => setOpenCollapsable(!openCollapsable);

  const [titleVisible, setTitleVisible] = useState(Boolean(sectionCase.title));
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  const handlePreviewChange = event => {
    event.preventDefault();
    event.stopPropagation();
    handleSectionCaseUpdate({ ...sectionCase, preview: true }, null, true);
  };

  const handleFormulaMatchChange = formulaMatch => {
    handleSectionCaseUpdate({ ...sectionCase, formulaMatch });
  };

  const handleTitleChange = newTitle => {
    handleSectionCaseUpdate({ ...sectionCase, title: newTitle });
  };

  const handleTitleToggle = value => {
    if (!value) handleTitleChange('');
    setTitleVisible(value);
  };

  const handleContentChange = content => {
    handleSectionCaseUpdate({ ...sectionCase, content });
  };

  const handleImageChange = image => {
    setIsUploadingImage(true);

    handleSectionCaseUpdate(sectionCase, image.image);
  };

  const handleImageDelete = () => {
    deleteImage(sectionCase.id, selectedTemplateSectionId);
  };

  const handleDeleteCase = () => {
    deleteCase(sectionCase.id, selectedTemplateSectionId);
  };

  return (
    <>
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
                <Col xs={2}>
                  <Radio
                    mr={10}
                    onClick={handlePreviewChange}
                    checked={sectionCase.preview}
                  />
                </Col>
                <Col xs={10} align="end" style={{ textAlign: 'end' }}>
                  <Text
                    width="max-content"
                    onClick={handlePreviewChange}
                    whiteSpace="pre"
                    fontWeight={sectionCase.preview ? 'bold' : 'normal'}
                  >
                    {formatMessage(messages.previewCaseRadio)}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      >
        <Container style={{ width: '100%' }}>
          <Row justfy="between" align="center" style={{ marginBottom: 20 }}>
            <Col width="content">
              <Row align="center">
                <Img
                  src={binNoBg}
                  onClick={handleDeleteCase}
                  mr={10}
                  clickable
                />
                <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
                <InequalityChooser
                  onSuccessfulChange={handleFormulaMatchChange}
                  inequalityValue={sectionCase.formulaMatch}
                />
              </Row>
            </Col>
            <Col>
              <Row justify="end" align="center">
                <Option
                  key="section-title-toggle"
                  label={formatMessage(messages.sectionCaseTitleToggle)}
                  value={titleVisible}
                  action={handleTitleToggle}
                />
              </Row>
            </Col>
          </Row>

          {titleVisible && (
            <Row justfy="start">
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
                />
              </Box>
            </Row>
          )}

          <Row justfy="start">
            <Text whiteSpace="pre">
              {formatMessage(messages.sectionCaseContentHeader)}
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
                rows="5"
                width="100%"
                placeholder={formatMessage(
                  messages.sectionCaseContentPlaceholder,
                )}
                value={sectionCase.content}
                onBlur={handleContentChange}
              />
            </Box>
          </Row>

          <Row justfy="start">
            <Text whiteSpace="pre">
              {formatMessage(messages.sectionCaseImageHeader)}
            </Text>
            <ImageUpload
              image={sectionCase.imageUrl}
              loading={isUploadingImage}
              onAddImage={handleImageChange}
              onDeleteImage={handleImageDelete}
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

const withConnect = connect(
  null,
  mapDispatchToProps,
);

SectionCaseItem.propTypes = {
  title: PropTypes.string,
  updateSectionCase: PropTypes.func,
  deleteCase: PropTypes.func,
  deleteImage: PropTypes.func,
  sectionCase: PropTypes.shape(SectionCase),
  intl: intlShape,
};

export default compose(
  withConnect,
  injectIntl,
)(SectionCaseItem);
