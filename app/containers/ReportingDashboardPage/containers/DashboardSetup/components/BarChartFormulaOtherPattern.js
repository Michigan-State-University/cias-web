import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import ReactColor, { ColorPickerType } from 'components/ReactColor';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { ChartSettingsContext } from '../constants';

const BarChartFormulaOtherPattern = ({ pattern, onEdit }) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const { color } = pattern;

  const handleEdit = field => value => onEdit({ ...pattern, [field]: value });

  const onEditColor = newColor => handleEdit('color')(newColor.hex);

  return (
    <FullWidthContainer>
      <Row align="center" justify="between" nogutter>
        <Col xs="content" mr={10}>
          {formatMessage(messages.barChartFormulaOtherCase)}
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

BarChartFormulaOtherPattern.propTypes = {
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(BarChartFormulaOtherPattern);
