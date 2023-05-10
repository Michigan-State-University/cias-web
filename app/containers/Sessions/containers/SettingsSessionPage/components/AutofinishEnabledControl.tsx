import React from 'react';
import { useIntl } from 'react-intl';
import { useField, useFormikContext } from 'formik';

import questionMark from 'assets/svg/grey-question-mark.svg';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import Tooltip from 'components/Tooltip';
import FormikSwitchInput from 'components/FormikSwitchInput';
import Row from 'components/Row';

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
      <Row gap={8} align="center">
        {formatMessage(messages.autofinishEnabledLabel)}
        <Tooltip
          id="autofinish-enabled-tooltip-info"
          icon={questionMark}
          content={formatMessage(messages.autofinishTooltip)}
        />
      </Row>
    </FormikSwitchInput>
  );
};
