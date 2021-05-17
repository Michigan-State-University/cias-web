import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';

const FormulaOtherPattern = ({ pattern, onEdit }) => {
  const { formatMessage } = useIntl();

  const handleEdit = field => value => onEdit({ ...pattern, [field]: value });

  const onEditLabel = handleEdit('label');

  return (
    <FullWidthContainer>
      <Row align="center" nogutter>
        <Col xs="content" mr={5}>
          {formatMessage(messages.chartFormulaOtherCase)}
        </Col>

        <Col xs="content">
          <Input
            disabled={false}
            width="120px"
            height="50px"
            placeholder={formatMessage(
              messages.chartFormulaCaseLabelPlaceholder,
            )}
            value={pattern.label}
            onBlur={onEditLabel}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

FormulaOtherPattern.propTypes = {
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(FormulaOtherPattern);
