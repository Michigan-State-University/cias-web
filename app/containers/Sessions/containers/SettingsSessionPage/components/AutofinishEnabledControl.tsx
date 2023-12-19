import React from 'react';
import { useIntl } from 'react-intl';
import { useField, useFormikContext } from 'formik';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import FormikSwitchInput from 'components/FormikSwitchInput';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Column from 'components/Column';

import messages from './messages';
import { SessionSettingsFormValues } from './types';

export const defaultAutofinishDelayValue = 24;

export type Props = {
  disabled: boolean;
};

export const AutofinishEnabledControl: React.FC<Props> = ({ disabled }) => {
  const { formatMessage } = useIntl();

  const { submitForm } = useFormikContext<SessionSettingsFormValues>();

  const [{ value: autofinishEnabled }] = useField<boolean>('autofinishEnabled');
  const [
    ,
    { initialValue: autofinishDelayInitialValue },
    { setValue: setAutofinishDelay },
  ] = useField<number>('autofinishDelay');

  useDidUpdateEffect(() => {
    if (!autofinishEnabled) {
      setAutofinishDelay(
        autofinishDelayInitialValue ?? defaultAutofinishDelayValue,
      );
    }
    submitForm();
  }, [autofinishEnabled]);

  return (
    <FormikSwitchInput formikKey="autofinishEnabled" disabled={disabled}>
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
  );
};
