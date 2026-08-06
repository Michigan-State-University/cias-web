import React, { memo, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { colors, themeColors } from 'theme';
import { floatValidator } from 'utils/validators';

import Box from 'components/Box';
import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Select from 'components/Select';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { ChartSettingsContext } from '../constants';

const populateMinAnsweredOption = (value) => ({ value, label: `${value}` });

const ChartValiditySettings = ({
  formulaVariableCount,
  minAnsweredVariables,
  positiveDespiteMissingThreshold,
  onEditMinAnsweredVariables,
  onEditPositiveDespiteMissingThreshold,
}) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  // charts created before this feature carry a formula without either key
  const variableCount = formulaVariableCount ?? 0;
  const minAnswered = minAnsweredVariables ?? 0;
  const threshold = positiveDespiteMissingThreshold ?? null;

  // an empty or unparseable formula payload leaves nothing to count against
  const isDisabled = !canBeEdited || variableCount === 0;

  // the payload was edited down below the stored minimum — never rewrite it
  // silently, the researcher has to resolve it
  const isMinAnsweredStale = minAnswered > variableCount;

  const minAnsweredOptions = useMemo(
    () =>
      Array.from({ length: variableCount + 1 }, (_, value) =>
        populateMinAnsweredOption(value),
      ),
    [variableCount],
  );

  // built separately from the options so a stale value still renders
  const minAnsweredOption = populateMinAnsweredOption(minAnswered);

  const handleEditMinAnsweredVariables = (option) =>
    onEditMinAnsweredVariables(option.value);

  const handleEditPositiveDespiteMissingThreshold = (value) =>
    onEditPositiveDespiteMissingThreshold(value === '' ? null : Number(value));

  return (
    <FullWidthContainer>
      <Row mt={36}>
        <Col>
          <Box mb={18}>
            <HelpIconTooltip
              id="chart-validity-settings-tooltip"
              tooltipContent={formatMessage(
                messages.chartValiditySingleInstrumentHint,
              )}
              iconProps={{ fill: colors.manatee }}
            >
              <Text>
                <Markup
                  content={formatMessage(messages.chartValiditySettingsLabel)}
                  noWrap
                />
              </Text>
            </HelpIconTooltip>
          </Box>

          <Box mb={5}>
            <HelpIconTooltip
              id="chart-validity-min-answered-tooltip"
              tooltipContent={formatMessage(
                messages.chartValidityMinAnsweredHint,
              )}
              iconProps={{ fill: colors.manatee }}
            >
              <Text>
                {formatMessage(messages.chartValidityMinAnsweredLabel)}
              </Text>
            </HelpIconTooltip>
          </Box>

          <NoMarginRow align="center" nogutter>
            <Col xs="content" mr={10}>
              <Select
                width="90px"
                data-cy="chart-validity-min-answered-select"
                data-testid="min-answered-variables-select"
                selectProps={{
                  isDisabled,
                  bg: colors.linkWater,
                  options: minAnsweredOptions,
                  value: minAnsweredOption,
                  onChange: handleEditMinAnsweredVariables,
                  centered: true,
                }}
              />
            </Col>

            <Col xs="content">
              <Text>
                {formatMessage(messages.chartValidityMinAnsweredOutOf, {
                  variableCount,
                })}
              </Text>
            </Col>
          </NoMarginRow>

          {isMinAnsweredStale && (
            <Comment mt={10} color={themeColors.warning}>
              {formatMessage(messages.chartValidityStaleMinAnsweredNotice, {
                minAnswered,
                variableCount,
              })}
            </Comment>
          )}
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <Box mb={5}>
            <HelpIconTooltip
              id="chart-validity-threshold-tooltip"
              tooltipContent={formatMessage(
                messages.chartValidityThresholdHint,
              )}
              iconProps={{ fill: colors.manatee }}
            >
              <Text>{formatMessage(messages.chartValidityThresholdLabel)}</Text>
            </HelpIconTooltip>
          </Box>

          <Input
            type="singleline"
            data-cy="chart-validity-threshold-input"
            data-testid="positive-despite-missing-threshold-input"
            disabled={isDisabled}
            width="120px"
            height="50px"
            textAlign="center"
            placeholder={formatMessage(
              messages.chartValidityThresholdPlaceholder,
            )}
            value={threshold === null ? '' : `${threshold}`}
            validator={floatValidator}
            onBlur={handleEditPositiveDespiteMissingThreshold}
            aria-label={formatMessage(messages.chartValidityThresholdLabel)}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

ChartValiditySettings.propTypes = {
  formulaVariableCount: PropTypes.number,
  minAnsweredVariables: PropTypes.number,
  positiveDespiteMissingThreshold: PropTypes.number,
  onEditMinAnsweredVariables: PropTypes.func,
  onEditPositiveDespiteMissingThreshold: PropTypes.func,
};

export default memo(ChartValiditySettings);
