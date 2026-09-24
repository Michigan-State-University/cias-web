import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import share from 'assets/svg/share.svg';

import CopyToClipboard from 'components/CopyToClipboard';
import { SelectOption } from 'components/Select/types';

import messages from './messages';
import InviteUrlFormProvider from './InviteUrlFormProvider';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  interventionLanguageCode: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
};

const CopyLinkForm: FC<Props> = ({
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
      renderInterventionControl={({ url, buttonDisabled, handleSubmit }) => (
        <CopyToClipboard
          // @ts-ignore
          textToCopy={url}
          icon={share}
          iconAlt={formatMessage(messages.copyLinkIconAlt)}
          disabled={false}
          buttonDisabled={buttonDisabled}
          onClick={handleSubmit}
          mt={21}
          mb={13}
        >
          {formatMessage(messages.copyInterventionLinkButtonTitle)}
        </CopyToClipboard>
      )}
      renderSessionControl={({
        url,
        disabled,
        buttonDisabled,
        handleSubmit,
      }) => (
        <CopyToClipboard
          // @ts-ignore
          textToCopy={url}
          icon={share}
          iconAlt={formatMessage(messages.copyLinkIconAlt)}
          disabled={disabled}
          buttonDisabled={buttonDisabled}
          onClick={handleSubmit}
          mt={21}
          mb={13}
        >
          {formatMessage(
            isModularIntervention
              ? messages.copySessionLinkButtonTitle
              : messages.copyLinkButtonTitle,
            {
              isModularIntervention: false,
            },
          )}
        </CopyToClipboard>
      )}
    />
  );
};

export default CopyLinkForm;
