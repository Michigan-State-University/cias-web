import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import InequalityChooser from 'components/InequalityChooser';
import ReactColor, { ColorPickerType } from 'components/ReactColor';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const BarChartFormulaPattern = ({ pattern, onEdit, onDelete }) => {
  const { formatMessage } = useIntl();

  const { match, color } = pattern;

  const handleEdit = field => value => onEdit({ ...pattern, [field]: value });

  const onEditMatch = handleEdit('match');

  const onEditColor = newColor => handleEdit('color')(newColor.hex);

  return (
    <FullWidthContainer>
      <Row mb={20} align="center" justify="between" nogutter>
        <NoMarginRow align="center" nogutter>
          <Col xs="content">
            <Icon src={BinIcon} mr={8} onClick={onDelete} />
          </Col>

          <Col xs="content">{formatMessage(messages.chartFormulaCaseIf)}</Col>

          <Col xs="content">
            <Row margin="0 !important">
              <InequalityChooser
                disabled={false}
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
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(BarChartFormulaPattern);
