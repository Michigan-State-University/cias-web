import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import questionMark from 'assets/svg/grey-question-mark.svg';

import { borders, colors } from 'theme';

import { numericValidator } from 'utils/validators';

import { FullWidthSwitch } from 'components/Switch';
import H3 from 'components/H3';
import Row from 'components/Row';
import Tooltip from 'components/Tooltip';

import { Input } from '../styled';
import messages from '../messages';
import { getSettingOptionTooltipText } from './utils';

const SettingsOption = ({ setting, index, onUpdate, disabled, isLast }) => {
  const { formatMessage } = useIntl();

  const handleUpdate = useCallback(
    (value) => onUpdate(`${index}`, value),
    [index],
  );

  const handleStringToNumericUpdate = useCallback(
    (value) => handleUpdate(+value),
    [handleUpdate],
  );

  const tooltipText = getSettingOptionTooltipText(formatMessage, index);

  const renderSetting = () => {
    switch (setting?.constructor) {
      case Number:
        return (
          <>
            <H3>{formatMessage(messages[`${index}`])}</H3>

            <Input
              placeholder={formatMessage(messages.textLimitSettingsPlaceholder)}
              type="singleline"
              keyboard="tel"
              value={`${setting}`}
              validator={numericValidator}
              onBlur={handleStringToNumericUpdate}
              width={150}
            />
          </>
        );
      case Boolean:
      default:
        return (
          <FullWidthSwitch
            id={index}
            disabled={disabled}
            checked={setting}
            onToggle={handleUpdate}
          >
            <Row align="center" gap={8}>
              <H3>{formatMessage(messages[`${index}`])}</H3>
              {tooltipText && (
                <Tooltip
                  id={`question-settings-option-tooltip-${index}`}
                  icon={questionMark}
                  content={tooltipText}
                />
              )}
            </Row>
          </FullWidthSwitch>
        );
    }
  };

  return (
    <Row
      justify="between"
      align="center"
      pb={15}
      mb={15}
      borderBottom={
        !isLast
          ? `${borders.borderWidth} ${borders.borderStyle} ${colors.linkWater}`
          : null
      }
    >
      {renderSetting()}
    </Row>
  );
};

SettingsOption.propTypes = {
  onUpdate: PropTypes.func,
  setting: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  index: PropTypes.string,
  disabled: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default memo(SettingsOption);
