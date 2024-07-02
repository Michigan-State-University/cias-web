import React from 'react';
import { useIntl } from 'react-intl';

import { SessionTypes } from 'models/Session';
import H3 from 'components/H3';

import messages from './messages';
import { SessionSettingsSubmitFormValues } from './types';
import { AutofinishForm } from './AutofinishForm';
import { AutocloseForm } from './AutocloseForm';

export type Props = {
  disabled: boolean;
  onSubmit: (changes: Partial<SessionSettingsSubmitFormValues>) => void;
} & SessionSettingsSubmitFormValues;

export const SessionSettingsForm: React.FC<Props> = ({
  disabled,
  autofinishEnabled,
  autofinishDelay,
  autocloseEnabled,
  autocloseAt,
  onSubmit,
  type,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <H3 mt={15} mb={20}>
        {formatMessage(messages.autofinishSettings)}
      </H3>

      <AutocloseForm
        disabled={disabled}
        autocloseEnabled={autocloseEnabled}
        autocloseAt={autocloseAt}
        onSubmit={onSubmit}
      />
      {type !== SessionTypes.SMS_SESSION && (
        <AutofinishForm
          disabled={disabled}
          autofinishEnabled={autofinishEnabled}
          autofinishDelay={autofinishDelay}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
