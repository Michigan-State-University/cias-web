import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { borders, colors } from 'theme';

import { numericValidator } from 'utils/validators';

import { FullWidthSwitch } from 'components/Switch';
import H3 from 'components/H3';
import Row from 'components/Row';
import Column from 'components/Column';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import {
  ADD_NONE_OF_THE_ABOVE,
  REMOVE_NONE_OF_THE_ABOVE,
} from 'containers/Sessions/components/QuestionData/MultiQuestion/constants';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import { Input } from '../styled';
import messages from '../messages';
import { getSettingOptionTooltipText } from './utils';

const SettingsOption = ({
  setting,
  index,
  onUpdate,
  disabled,
  isLast,
  session,
  addNoneOfAboveAnswer,
  removeNoneOfAboveAnswer,
}) => {
  const { formatMessage } = useIntl();

  const isNullableNumericSettings =
    index === 'min_length' || index === 'max_length';

  const handleUpdate = useCallback(
    (value) => onUpdate(`${index}`, value),
    [index],
  );

  const handleStringToNumericUpdate = useCallback(
    (value) => {
      if (isNullableNumericSettings && value === '') handleUpdate(null);
      else handleUpdate(+value);
    },
    [handleUpdate],
  );

  const tooltipText = getSettingOptionTooltipText(formatMessage, index);

  const optionDisabled = () => {
    switch (index) {
      case 'start_autofinish_timer':
        return !session?.autofinishEnabled;
      default:
        return false;
    }
  };

  const numericInput = useCallback(
    () => (
      <>
        <H3>{formatMessage(messages[`${index}`])}</H3>
        <Input
          placeholder={formatMessage(messages[`${index}_placeholder`])}
          type="singleline"
          keyboard="tel"
          value={setting === null ? '' : `${setting}`}
          validator={numericValidator}
          onBlur={handleStringToNumericUpdate}
          width={150}
          px={12}
          disabled={disabled}
        />
      </>
    ),
    [index, setting, disabled, isNullableNumericSettings],
  );

  const renderSetting = () => {
    if (isNullableNumericSettings) return numericInput();

    if (index === 'none_of_above') {
      return (
        <Column>
          <FullWidthSwitch
            id={index}
            disabled={disabled || optionDisabled()}
            checked={setting}
            onToggle={(answer) => {
              if (answer) {
                handleUpdate(true);
                addNoneOfAboveAnswer();
              } else {
                handleUpdate(false);
                removeNoneOfAboveAnswer();
              }
            }}
          >
            <HelpIconTooltip
              id={`question-settings-option-tooltip-${index}`}
              tooltipContent={tooltipText}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
            </HelpIconTooltip>
          </FullWidthSwitch>
        </Column>
      );
    }

    switch (setting?.constructor) {
      case Number:
        return numericInput();
      case Boolean:
      default:
        return (
          <FullWidthSwitch
            id={index}
            disabled={disabled || optionDisabled()}
            checked={setting}
            onToggle={handleUpdate}
          >
            <HelpIconTooltip
              id={`question-settings-option-tooltip-${index}`}
              tooltipContent={tooltipText}
            >
              <H3>{formatMessage(messages[`${index}`])}</H3>
            </HelpIconTooltip>
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
  session: PropTypes.object,
  addNoneOfAboveAnswer: PropTypes.func.isRequired,
  removeNoneOfAboveAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = (dispatch) => ({
  addNoneOfAboveAnswer: () =>
    dispatch(updateQuestionData({ type: ADD_NONE_OF_THE_ABOVE })),
  removeNoneOfAboveAnswer: () =>
    dispatch(updateQuestionData({ type: REMOVE_NONE_OF_THE_ABOVE })),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default memo(compose(withConnect)(SettingsOption));
