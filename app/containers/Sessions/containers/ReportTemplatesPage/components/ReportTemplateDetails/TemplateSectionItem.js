import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import { selectTemplateSection } from 'global/reducers/reportTemplates';

import { TemplateSection } from 'models/ReportTemplate';

import Img from 'components/Img';

import { SectionContainer, SectionText, SectionTitle } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const TemplateSectionItem = ({ templateSection, dragHandleProps }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const selectSection = id => dispatch(selectTemplateSection(id));

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
        <Col xs={1}>
          <Img
            ml={10}
            src={ReorderIcon}
            disabled={false}
            {...dragHandleProps}
          />
        </Col>
        <Col>
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
              <Row nogutter>
                <Col xs={previewCase.imageUrl ? 8 : 12}>
                  <SectionText isSelected={isSelected || isHovered}>
                    {previewCase.content}
                  </SectionText>
                </Col>
                <Col xs={4}>
                  {previewCase.imageUrl && (
                    <Img
                      src={previewCase.imageUrl}
                      style={{
                        maxWidth: '112px',
                        height: 'auto',
                        marginLeft: 60,
                      }}
                    />
                  )}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </SectionContainer>
  );
};

TemplateSectionItem.propTypes = {
  templateSection: PropTypes.shape(TemplateSection),
  dragHandleProps: PropTypes.object,
};

export default TemplateSectionItem;
