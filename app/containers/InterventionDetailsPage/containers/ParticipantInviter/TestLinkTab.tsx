import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';

import messages from './messages';
import InviteUrlFormProvider from './InviteUrlFormProvider';
import { CopyTestLinkButton } from './CopyTestLinkButton';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  interventionLanguageCode: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
};

export const TestLinkTab: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  interventionLanguageCode,
  sessionOptions,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();

  return (
    // @ts-ignore — `intervention` is supplied by the provider's own `connect`
    <InviteUrlFormProvider
      isModularIntervention={isModularIntervention}
      isReportingIntervention={isReportingIntervention}
      interventionId={interventionId}
      interventionLanguageCode={interventionLanguageCode}
      sessionOptions={sessionOptions}
      healthClinicOptions={healthClinicOptions}
      renderInterventionControl={({ url, disabled }) => (
        <CopyTestLinkButton
          interventionId={interventionId}
          url={url}
          disabled={disabled}
          label={formatMessage(messages.copyInterventionTestLinkButtonTitle)}
        />
      )}
      renderSessionControl={({ url, buttonDisabled }) => (
        <CopyTestLinkButton
          interventionId={interventionId}
          url={url}
          // The button's own `disabled` gates the mint, so it takes the *stronger* rule here —
          // unlike `CopyToClipboard`, where `disabled` is cosmetic.
          disabled={buttonDisabled}
          label={formatMessage(messages.copySessionTestLinkButtonTitle)}
        />
      )}
      footer={
        <Text mb={13} fontSize={12} color={themeColors.comment}>
          {formatMessage(messages.copyTestLinkHint)}
        </Text>
      }
    />
  );
};
