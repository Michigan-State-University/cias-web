import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import InequalityChooser from 'components/InequalityChooser';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';

const FormulaCase = () => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      <Row align="center" nogutter>
        <Col xs="content">
          <Icon src={BinIcon} mr={8} />
        </Col>

        <Col xs="content">{formatMessage(messages.chartFormulaCaseIf)}</Col>

        <Col xs="content">
          <Row margin="0 !important">
            <InequalityChooser
              disabled={false}
              onSuccessfulChange={undefined}
              inequalityValue=""
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
            value=""
            onBlur={undefined}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

FormulaCase.propTypes = {};

export default memo(FormulaCase);
