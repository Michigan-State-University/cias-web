import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import InequalityChooser from 'components/InequalityChooser';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';

// ! TODO: Rename Case to Pattern
// ! TODO: Use destructing
const FormulaCase = ({ pattern, onEdit, onDelete }) => {
  const { formatMessage } = useIntl();

  const handleEdit = field => value => onEdit({ ...pattern, [field]: value });

  const onEditMatch = handleEdit('match');

  const onEditLabel = handleEdit('label');

  return (
    <FullWidthContainer>
      <Row align="center" nogutter>
        <Col xs="content">
          <Icon src={BinIcon} mr={8} onClick={onDelete} />
        </Col>

        <Col xs="content">{formatMessage(messages.chartFormulaCaseIf)}</Col>

        <Col xs="content">
          <Row margin="0 !important">
            <InequalityChooser
              disabled={false}
              onSuccessfulChange={onEditMatch}
              inequalityValue={pattern.match}
            />
          </Row>
        </Col>

        <Col xs="content">{formatMessage(messages.chartFormulaCaseEquals)}</Col>

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

FormulaCase.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  pattern: PropTypes.object,
};

export default memo(FormulaCase);
