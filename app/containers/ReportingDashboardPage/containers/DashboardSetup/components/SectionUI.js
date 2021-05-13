import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import LabelledInput from 'components/Input/LabelledInput';

import StyledInput from 'components/Input/StyledInput';
import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const SectionUI = ({
  description,
  name,
  onDescriptionChange,
  onNameChange,
}) => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      <Row>
        <Col>
          <LabelledInput
            mb={30}
            placeholder={formatMessage(messages.inputSectionNamePlaceholder)}
            onBlur={onNameChange}
            value={name}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledInput
            mb={30}
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
};

export default memo(SectionUI);
