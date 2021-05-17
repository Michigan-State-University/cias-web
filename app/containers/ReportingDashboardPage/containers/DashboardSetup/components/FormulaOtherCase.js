import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';

const FormulaOtherCase = () => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      <Row align="center" nogutter>
        <Col xs="content">{formatMessage(messages.chartFormulaOtherCase)}</Col>

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

FormulaOtherCase.propTypes = {};

export default memo(FormulaOtherCase);
