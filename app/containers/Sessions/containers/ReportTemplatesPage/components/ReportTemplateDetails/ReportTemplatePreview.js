import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { useIntl } from 'react-intl';

import {
  addTemplateSectionRequest,
  reorderTemplateSectionRequest,
  updateReportTemplateRequest,
} from 'global/reducers/reportTemplates';

import { TemplateSectionBuilder } from 'models/ReportTemplate';

import DashedButton from 'components/Button/DashedButton';
import Img from 'components/Img';
import ApprovableInput from 'components/Input/ApprovableInput';
import { selectQuillText } from 'components/Input/utils';
import { DndSortable } from 'components/DragAndDrop';
import OriginalTextHover, {
  OriginalTextIconPosition,
} from 'components/OriginalTextHover';

import TemplateSectionItem from './TemplateSectionItem';
import { CardBox } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const ReportTemplatePreview = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const addSection = (section, reportId) =>
    dispatch(addTemplateSectionRequest(section, reportId));
  const updateReportTemplate = (sessionId, reportTemplate) =>
    dispatch(updateReportTemplateRequest(sessionId, reportTemplate));
  const reorderSections = (reportId, reorderedSections) =>
    dispatch(reorderTemplateSectionRequest(reportId, reorderedSections));

  const {
    selectedReportId,
    sessionId,
    singleReportTemplate,
    loaders: { updateReportTemplateLoading },
    canEdit,
  } = useContext(ReportTemplatesContext);

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    const reorderedSections = items.map((section, index) => ({
      ...section,
      position: index,
    }));
    reorderSections(selectedReportId, reorderedSections);
  };

  useEffect(() => {
    if (!updateReportTemplateLoading) setIsAddingSection(false);
  }, [updateReportTemplateLoading]);

  const [isAddingSection, setIsAddingSection] = useState();

  const handleAddSection = () => {
    setIsAddingSection(true);
    addSection(new TemplateSectionBuilder().build(), selectedReportId);
  };

  const onSummaryChange = (summary) => {
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
                  <OriginalTextHover
                    id={`report-template-${selectedReportId}-summary`}
                    text={singleReportTemplate.originalText.summary}
                    iconPosition={OriginalTextIconPosition.START}
                    marginInlineStart={10}
                  >
                    <ApprovableInput
                      type="singleline"
                      value={singleReportTemplate.summary ?? ''}
                      placeholder={formatMessage(
                        messages.reportHeaderPlaceholder,
                      )}
                      onCheck={onSummaryChange}
                      onFocus={selectQuillText}
                      autoSize
                      richText
                      pl="0px"
                      fontSize={32}
                      fontWeight="bold"
                      width="100%"
                      disabled={!canEdit}
                    />
                  </OriginalTextHover>
                </Col>
              </Row>
              <DndSortable
                onDragEnd={onDragEnd}
                items={singleReportTemplate.sections}
              >
                {({ item, dragHandleProps }) => (
                  <Row style={{ padding: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <TemplateSectionItem
                        templateSection={item}
                        showDndHandle={canEdit}
                        dragHandleProps={dragHandleProps}
                      />
                    </Col>
                  </Row>
                )}
              </DndSortable>
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

export default ReportTemplatePreview;
