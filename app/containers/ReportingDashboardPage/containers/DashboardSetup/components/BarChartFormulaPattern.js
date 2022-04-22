import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import InequalityChooser from 'components/InequalityChooser';
import ReactColor, { ColorPickerType } from 'components/ReactColor';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { ChartSettingsContext } from '../constants';

const BarChartFormulaPattern = ({ pattern, onEdit }) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const { match, color } = pattern;

  const handleEdit = (field) => (value) =>
    onEdit({ ...pattern, [field]: value });

  const onEditMatch = handleEdit('match');

  const onEditColor = (newColor) => handleEdit('color')(newColor.hex);

  return (
    <FullWidthContainer>
      <Row mb={20} align="center" justify="between" nogutter>
        <NoMarginRow align="center" nogutter>
          <Col xs="content">{formatMessage(messages.chartFormulaCaseIf)}</Col>

          <Col xs="content">
            <Row margin="0 !important">
              <InequalityChooser
                disabled={!canBeEdited}
                onSuccessfulChange={onEditMatch}
                inequalityValue={match}
              />
            </Row>
          </Col>

          <Col xs="content" mr={10}>
            {formatMessage(messages.barChartFormulaCaseEquals)}
          </Col>
        </NoMarginRow>

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

BarChartFormulaPattern.propTypes = {
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(BarChartFormulaPattern);
