import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { Col, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { ChartSettingsContext } from '../constants';

const ChartSettingsGeneralSection = ({
  chart,
  onEditDescription,
  onEditFormulaPayload,
  onEditName,
}) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  return (
    <FullWidthContainer>
      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsNameLabel)}
              noWrap
            />
          </Text>
          <Input
            disabled={!canBeEdited}
            width="100%"
            height="50px"
            placeholder={formatMessage(messages.chartSettingsNamePlaceholder)}
            value={chart.name}
            onBlur={onEditName}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsDescriptionLabel)}
              noWrap
            />
          </Text>
          <Input
            disabled={!canBeEdited}
            width="100%"
            height="50px"
            placeholder={formatMessage(
              messages.chartSettingsDescriptionPlaceholder,
            )}
            value={chart.description ?? ''}
            onBlur={onEditDescription}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsFormulaLabel)}
              noWrap
            />
          </Text>
          <Input
            rows="5"
            type="multiline"
            disabled={!canBeEdited}
            width="100%"
            placeholder={formatMessage(
              messages.chartSettingsFormulaPlaceholder,
            )}
            value={chart.formula.payload}
            onBlur={onEditFormulaPayload}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

ChartSettingsGeneralSection.propTypes = {
  chart: PropTypes.object,
  onEditDescription: PropTypes.func,
  onEditFormulaPayload: PropTypes.func,
  onEditName: PropTypes.func,
};

export default memo(ChartSettingsGeneralSection);
