import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import { selectTemplateSection } from 'global/reducers/reportTemplates';

import FlexRow from 'components/Row';
import FlexColumn from 'components/Column';

import { TemplateSection } from 'models/ReportTemplate';

import Img from 'components/Img';

import { SectionContainer, SectionText, SectionTitle } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const TemplateSectionItem = ({
  templateSection,
  showDndHandle,
  dragHandleProps,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const selectSection = (id) => dispatch(selectTemplateSection(id));

  const { selectedTemplateSectionId } = useContext(ReportTemplatesContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleSelectSection = () => {
    selectSection(templateSection.id);
  };

  const isSelected = selectedTemplateSectionId === templateSection.id;

  const previewCase = templateSection.variants.find(({ preview }) => preview);

  const isEmpty =
    !previewCase ||
    (!previewCase.title && !previewCase.content && !previewCase.imageUrl);

  return (
    <SectionContainer
      onClick={handleSelectSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      fluid
    >
      <Row align="center">
        {showDndHandle && (
          <Col xs={1} {...dragHandleProps}>
            <Img
              alt={`${formatMessage(messages.reorderIconAlt)} ${
                templateSection.position
              }`}
              ml={10}
              src={ReorderIcon}
              disabled={false}
            />
          </Col>
        )}
        <Col dir="auto">
          {isEmpty ? (
            <Row>
              <Col>
                <SectionText isSelected={isSelected || isHovered}>
                  {formatMessage(messages.emptySection)}
                </SectionText>
              </Col>
            </Row>
          ) : (
            <>
              {previewCase.title && (
                <Row style={{ marginBottom: 10 }} nogutter>
                  <Col>
                    <SectionTitle isSelected={isSelected || isHovered}>
                      {previewCase.title}
                    </SectionTitle>
                  </Col>
                </Row>
              )}
              <FlexRow>
                <FlexColumn width={previewCase.imageUrl ? '67%' : '100%'}>
                  <SectionText isSelected={isSelected || isHovered}>
                    <Markup content={previewCase.content} />
                  </SectionText>
                </FlexColumn>
                {previewCase.imageUrl && (
                  <FlexColumn width="33%">
                    <Img
                      src={previewCase.imageUrl}
                      style={{
                        objectFit: 'contain',
                        marginInlineStart: '60px',
                      }}
                    />
                  </FlexColumn>
                )}
              </FlexRow>
            </>
          )}
        </Col>
      </Row>
    </SectionContainer>
  );
};

TemplateSectionItem.propTypes = {
  templateSection: PropTypes.shape(TemplateSection),
  showDndHandle: PropTypes.bool,
  dragHandleProps: PropTypes.object,
};

export default TemplateSectionItem;
