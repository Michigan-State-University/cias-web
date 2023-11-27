import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'formik';

import FormikSwitchInput from 'components/FormikSwitchInput';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Column from 'components/Column';
import Row from 'components/Row';
import FormikInput from 'components/FormikInput';
import FormikSelect from 'components/FormikSelect';
import { SelectOption } from 'components/Select/types';

import messages from './messages';
import { InputContainer } from './styled';

import { SessionSettingsFormValues, AutofinishTimeUnit } from './types';

export const defaultAutofinishDelayValue = 24;

export type Props = {
  disabled: boolean;
  values: SessionSettingsFormValues;
  submitForm: () => void;
  timeUnitOptions: SelectOption<AutofinishTimeUnit>[];
};

export const AutofinishControls: React.FC<Props> = ({
  disabled,
  values,
  submitForm,
  timeUnitOptions,
}) => {
  const { formatMessage } = useIntl();

  const [
    ,
    { initialValue: autofinishDelayInitialValue },
    { setValue: setAutofinishDelay },
  ] = useField<number>('autofinishDelay');

  const updateDelayValue = useCallback(
    (autofinishEnabled: boolean) => {
      if (!autofinishEnabled) {
        setAutofinishDelay(
          autofinishDelayInitialValue ?? defaultAutofinishDelayValue,
        );
      }
    },
    [setAutofinishDelay, autofinishDelayInitialValue],
  );

  return (
    <InputContainer>
      <FormikSwitchInput
        formikKey="autofinishEnabled"
        disabled={disabled}
        submitOnChange
        onChange={updateDelayValue}
      >
        <HelpIconTooltip
          id="autofinish-enabled-tooltip-info"
          tooltipContent={
            <Column>
              {formatMessage(messages.autofinishTooltipOne)}
              <br />
              <br />
              {formatMessage(messages.autofinishTooltipTwo)}
            </Column>
          }
        >
          {formatMessage(messages.autofinishEnabledLabel)}
        </HelpIconTooltip>
      </FormikSwitchInput>
      {values.autofinishEnabled && (
        <Row gap={16} mt={16}>
          <FormikInput
            formikKey="autofinishDelay"
            labelProps={{
              fontSize: 13,
            }}
            label={formatMessage(messages.autofinishDelayLabel)}
            onBlur={submitForm}
            disabled={disabled}
            inputProps={{
              width: '100%',
            }}
          />
          <FormikSelect
            formikKey="timeUnit"
            options={timeUnitOptions}
            disabled={disabled}
            columnStyleProps={{ mt: 20 }}
            submitOnChange
          />
        </Row>
      )}
    </InputContainer>
  );
};
