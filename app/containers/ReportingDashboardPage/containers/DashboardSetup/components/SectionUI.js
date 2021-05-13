import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import LabelledInput from 'components/Input/LabelledInput';
import StyledInput from 'components/Input/StyledInput';
import Divider from 'components/Divider';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const SectionUI = ({
  description,
  name,
  onDescriptionChange,
  onNameChange,
  showDivider,
}) => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      {showDivider && (
        <Row mb={10}>
          <Col>
            <Divider />
          </Col>
        </Row>
      )}

      <Row mb={10}>
        <Col>
          <LabelledInput
            placeholder={formatMessage(messages.inputSectionNamePlaceholder)}
            onBlur={onNameChange}
            value={name}
          />
        </Col>
      </Row>

      <Row mb={10}>
        <Col>
          <StyledInput
            ml={-12}
            maxWidth={300}
            type="multiline"
            placeholder={formatMessage(
              messages.inputSectionDescriptionPlaceholder,
            )}
            onBlur={onDescriptionChange}
            value={description ?? ''}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

SectionUI.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onDescriptionChange: PropTypes.func,
  onNameChange: PropTypes.func,
  showDivider: PropTypes.bool,
};

export default memo(SectionUI);
