import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { themeColors } from 'theme';

import VariableChooser from 'containers/VariableChooser';
import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';

import { ChartStatus } from 'global/reducers/dashboardSections';
import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { ChartSettingsContext } from '../constants';
import { ReportingDashboardPageContext } from '../../../constants';

const ChartSettingsGeneralSection = ({
  chart,
  onEditDescription,
  onEditFormulaPayload,
  onEditName,
}) => {
  const { formatMessage } = useIntl();
  const { organizationId } = useContext(ReportingDashboardPageContext);

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const { description, formula, name, status } = chart;

  const handleAddVariable = useCallback(
    variable => {
      onEditFormulaPayload(`${formula.payload}${variable}`);
    },
    [onEditFormulaPayload, formula.payload],
  );

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
            value={name}
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
            value={description ?? ''}
            onBlur={onEditDescription}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <NoMarginRow justify="between" width="100%">
            <Text mb={5}>
              <Markup
                content={formatMessage(messages.chartSettingsFormulaLabel)}
                noWrap
              />
            </Text>
            <VariableChooser
              includeAllSessions
              includeAllVariables
              isMultiIntervention
              onClick={handleAddVariable}
              organizationId={organizationId}
              disabled={status !== ChartStatus.DRAFT}
            >
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.chartSettingsAddVariable)}
              </Text>
            </VariableChooser>
          </NoMarginRow>

          <Input
            rows="5"
            type="multiline"
            disabled={!canBeEdited}
            width="100%"
            placeholder={formatMessage(
              messages.chartSettingsFormulaPlaceholder,
            )}
            value={formula.payload}
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
