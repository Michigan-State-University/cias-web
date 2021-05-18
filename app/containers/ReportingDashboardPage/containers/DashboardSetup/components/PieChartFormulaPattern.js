import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import InequalityChooser from 'components/InequalityChooser';
import ReactColor, { ColorPickerType } from 'components/ReactColor';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';

const PieChartFormulaPattern = ({ pattern, onEdit, onDelete }) => {
  const { formatMessage } = useIntl();

  const { match, label, color } = pattern;

  const handleEdit = field => value => onEdit({ ...pattern, [field]: value });

  const onEditMatch = handleEdit('match');

  const onEditLabel = handleEdit('label');

  const onEditColor = newColor => handleEdit('color')(newColor.hex);

  return (
    <FullWidthContainer>
      <Row align="center" mb={20} nogutter>
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

        <Col xs="content" mr={5}>
          {formatMessage(messages.chartFormulaCaseEquals)}
        </Col>

        <Col xs="content" mr={5}>
          <Input
            disabled={false}
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
            type={ColorPickerType.TWITTER}
            color={color}
            onChangeComplete={onEditColor}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

PieChartFormulaPattern.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(PieChartFormulaPattern);
