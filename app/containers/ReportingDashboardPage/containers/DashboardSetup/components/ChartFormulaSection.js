import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { themeColors, colors } from 'theme';

import VariableChooser from 'containers/VariableChooser';
import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import { ChartStatus } from 'global/reducers/dashboardSections';
import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { ChartSettingsContext } from '../constants';
import { ReportingDashboardPageContext } from '../../../constants';

const ChartFormulaSection = ({ chart, onEditFormulaPayload }) => {
  const { formatMessage } = useIntl();
  const { organizationId } = useContext(ReportingDashboardPageContext);

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const { formula, status } = chart;

  const handleAddVariable = useCallback(
    (variable) => {
      onEditFormulaPayload(`${formula.payload}${variable}`);
    },
    [onEditFormulaPayload, formula.payload],
  );

  return (
    <FullWidthContainer>
      <Row>
        <Col>
          <NoMarginRow justify="between" width="100%">
            <Text mb={5} display="flex">
              <Markup
                content={formatMessage(messages.chartSettingsFormulaLabel)}
                noWrap
              />
              <HelpIconTooltip
                id="formula_tooltip"
                mx={8}
                tooltipContent={formatMessage({
                  id: `app.GlobalMessages.formulasTooltip`,
                  defaultMessage: `For details how to construct mathematical or logical equations please visit <a href='https://www.cias.app/resources' target='_blank'>www.cias.app/resources</a>`,
                })}
                iconProps={{ fill: colors.manatee }}
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

ChartFormulaSection.propTypes = {
  chart: PropTypes.object,
  onEditFormulaPayload: PropTypes.func,
};

export default memo(ChartFormulaSection);
