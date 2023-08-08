import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Container } from 'react-grid-system';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import {
  addSectionCaseRequest,
  deleteTemplateSectionRequest,
  reorderSectionCasesRequest,
} from 'global/reducers/reportTemplates';
import { SectionCaseBuilder } from 'models/ReportTemplate';

import { themeColors } from 'theme';

import DashedButton from 'components/Button/DashedButton';
import { ModalType, useModal } from 'components/Modal';
import { Col } from 'components/ReactGridSystem';
import H2 from 'components/H2';
import TextButton from 'components/Button/TextButton';
import { DndSortable } from 'components/DragAndDrop';

import SectionFormula from './SectionFormula';
import SectionCaseItem from './SectionCaseItem';
import { Spacer, CardBox } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const TemplateSectionSettings = ({
  intl: { formatMessage },
  addCase,
  deleteSection,
  reorderSectionCases,
}) => {
  const {
    selectedReportId,
    selectedTemplateSectionId,
    selectedTemplateSection,
    loaders: { updateReportTemplateLoading },
    canEdit,
  } = useContext(ReportTemplatesContext);

  const [currentlyOpenedCollapsable, setCurrentlyOpenedCollapsable] =
    useState(null);
  const handleOpenCollapsable = (variantId) => () => {
    if (variantId === currentlyOpenedCollapsable) {
      setCurrentlyOpenedCollapsable(null);
    } else setCurrentlyOpenedCollapsable(variantId);
  };

  useEffect(() => {
    if (!updateReportTemplateLoading) {
      setIsAddingSection(false);
      setIsDeletingSection(false);
    }
  }, [updateReportTemplateLoading]);

  const [isAddingSection, setIsAddingSection] = useState();
  const [isDeletingSection, setIsDeletingSection] = useState();

  const handleAddCase = () => {
    setIsAddingSection(true);
    addCase(
      new SectionCaseBuilder()
        .withPreview(
          !selectedTemplateSection.variants.some(({ preview }) => preview),
        )
        .build(),
      selectedTemplateSectionId,
    );
  };

  const onDelete = () => {
    setIsDeletingSection(true);
    deleteSection(selectedTemplateSectionId, selectedReportId);
  };

  const { openModal: openDeleteModal, Modal: DeleteModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.deleteReportTemplateSectionHeader),
      content: formatMessage(messages.deleteReportTemplateSectionMessage),
      confirmAction: onDelete,
    },
  });

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    const reorderedVariants = items.map((variant, index) => ({
      ...variant,
      position: index,
    }));

    reorderSectionCases(selectedTemplateSectionId, reorderedVariants);
  };

  if (!selectedTemplateSection) return <></>;

  return (
    <CardBox minHeight="100%">
      <DeleteModal />

      <Container fluid>
        <Row style={{ marginBottom: 25 }}>
          <Col xs={7}>
            <H2>{formatMessage(messages.sectionSettingsHeader)}</H2>
          </Col>
          <Col xs={5} align="end">
            <TextButton
              disabled={!canEdit}
              onClick={openDeleteModal}
              whiteSpace="nowrap"
              fontWeight="bold"
              fontSize={14}
              loading={isDeletingSection}
              buttonProps={{
                color: themeColors.warning,
                fontWeight: 'bold',
              }}
              spinnerProps={{ size: 30, width: 2 }}
            >
              <FormattedMessage {...messages.deleteTemplateSectionButton} />
            </TextButton>
          </Col>
        </Row>
        <Row>
          <Col>
            <SectionFormula formula={selectedTemplateSection.formula} />
          </Col>
        </Row>
        <DndSortable
          items={selectedTemplateSection.variants}
          onDragEnd={onDragEnd}
        >
          {({ item, dragHandleProps, index }) => (
            <Row>
              <Col>
                <Spacer />
                <SectionCaseItem
                  openCollapsable={handleOpenCollapsable(item.id)}
                  isOpened={item.id === currentlyOpenedCollapsable}
                  title={formatMessage(messages.caseTitle, {
                    index: index + 1,
                  })}
                  sectionCase={item}
                  dragHandleProps={dragHandleProps}
                />
              </Col>
            </Row>
          )}
        </DndSortable>
        <Row style={{ marginTop: 20 }}>
          <Col>
            <DashedButton
              disabled={!canEdit}
              loading={isAddingSection}
              onClick={handleAddCase}
            >
              {formatMessage(messages.addCaseButton)}
            </DashedButton>
          </Col>
        </Row>
      </Container>
    </CardBox>
  );
};

const mapDispatchToProps = {
  addCase: addSectionCaseRequest,
  deleteSection: deleteTemplateSectionRequest,
  reorderSectionCases: reorderSectionCasesRequest,
};

const withConnect = connect(null, mapDispatchToProps);

TemplateSectionSettings.propTypes = {
  addCase: PropTypes.func,
  deleteSection: PropTypes.func,
  reorderSectionCases: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

export default compose(withConnect, injectIntl)(TemplateSectionSettings);
