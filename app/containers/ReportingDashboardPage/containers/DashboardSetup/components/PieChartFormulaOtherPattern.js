import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import ReactColor, { ColorPickerType } from 'components/ReactColor';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { ChartSettingsContext } from '../constants';

const PieChartFormulaOtherPattern = ({ pattern, onEdit }) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const { label, color } = pattern;

  const handleEdit = field => value => onEdit({ ...pattern, [field]: value });

  const onEditLabel = handleEdit('label');

  const onEditColor = newColor => handleEdit('color')(newColor.hex);

  return (
    <FullWidthContainer>
      <Row align="center" nogutter>
        <Col xs="content" mr={5}>
          {formatMessage(messages.chartFormulaOtherCase)}
        </Col>

        <Col xs="content" mr={5}>
          <Input
            disabled={!canBeEdited}
            width="120px"
            height="50px"
            placeholder={formatMessage(
              messages.chartFormulaCaseLabelPlaceholder,
            )}
            value={label}
            onBlur={onEditLabel}
          />
        </Col>

        <Col xs="content">
          <ReactColor
            disabled={!canBeEdited}
            type={ColorPickerType.TWITTER}
            color={color}
            onChangeComplete={onEditColor}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

PieChartFormulaOtherPattern.propTypes = {
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(PieChartFormulaOtherPattern);
