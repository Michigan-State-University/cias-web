import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { injectIntl, IntlShape } from 'react-intl';

import { selectTemplateSection } from 'global/reducers/reportTemplates';

import { TemplateSection } from 'models/ReportTemplate';

import Img from 'components/Img';

import { SectionContainer, SectionText, SectionTitle } from '../../styled';
import { ReportTemplatesContext } from '../../utils';
import messages from '../../messages';

const TemplateSectionItem = ({
  intl: { formatMessage },
  templateSection,
  selectSection,
}) => {
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
          <Row style={{ marginBottom: 10 }} nogutter>
            <Col>
              <SectionTitle isSelected={isSelected || isHovered}>
                {previewCase.title}
              </SectionTitle>
            </Col>
          </Row>
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
    </SectionContainer>
  );
};

const mapDispatchToProps = {
  selectSection: selectTemplateSection,
};

const withConnect = connect(null, mapDispatchToProps);

TemplateSectionItem.propTypes = {
  templateSection: PropTypes.shape(TemplateSection),
  selectSection: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

export default compose(withConnect, injectIntl)(TemplateSectionItem);
