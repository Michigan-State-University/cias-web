import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Container } from 'react-grid-system';

import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import {
  addSectionCaseRequest,
  deleteTemplateSectionRequest,
} from 'global/reducers/reportTemplates';
import { SectionCaseBuilder } from 'models/ReportTemplate';

import { themeColors } from 'theme';

import DashedButton from 'components/Button/DashedButton';
import { ModalType, useModal } from 'components/Modal';
import { Col } from 'components/ReactGridSystem';
import H2 from 'components/H2';
import TextButton from 'components/Button/TextButton';

import SectionFormula from './SectionFormula';
import SectionCaseItem from './SectionCaseItem';
import { Spacer, CardBox } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const TemplateSectionSettings = ({
  intl: { formatMessage },
  addCase,
  deleteSection,
}) => {
  const {
    selectedReportId,
    selectedTemplateSectionId,
    selectedTemplateSection,
    loaders: { updateReportTemplateLoading },
    canEdit,
  } = useContext(ReportTemplatesContext);

  const [currentlyOpenedCollapsable, setCurrentlyOpenedCollapsable] =
    useState(-1);
  const handleOpenCollapsable = (index) => () => {
    if (index === currentlyOpenedCollapsable) setCurrentlyOpenedCollapsable(-1);
    else setCurrentlyOpenedCollapsable(index);
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
        {selectedTemplateSection.variants.map((variant, index) => (
          <Row key={`section-case-${variant.id}`}>
            <Col>
              <Spacer />
              <SectionCaseItem
                openCollapsable={handleOpenCollapsable(index)}
                isOpened={index === currentlyOpenedCollapsable}
                title={formatMessage(messages.caseTitle, {
                  index: index + 1,
                })}
                sectionCase={variant}
              />
            </Col>
          </Row>
        ))}
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
};

const withConnect = connect(null, mapDispatchToProps);

TemplateSectionSettings.propTypes = {
  addCase: PropTypes.func,
  deleteSection: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

export default compose(withConnect, injectIntl)(TemplateSectionSettings);
