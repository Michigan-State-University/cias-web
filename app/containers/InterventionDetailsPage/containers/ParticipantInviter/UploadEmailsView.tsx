import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectInterventionLoader,
  sendInterventionInvitationsRequest,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';
import { Alert } from 'components/Alert';
import CsvFileExport from 'components/CsvFileExport';

import { BackButton } from './BackButton';
import { EmailsCsvRow, ParticipantInvitationType } from './types';
import {
  InviteEmailParticipantsForm,
  Props as InviteEmailParticipantsFormProps,
} from './InviteEmailParticipantsForm';
import messages from './messages';

export type Props = {
  interventionName: string;
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onBack: (invitationType: ParticipantInvitationType) => void;
};

export const UploadEmailsView: FC<Props> = ({
  onBack,
  interventionName,
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessionOptions,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('sendInterventionInvitations'),
  );

  const handleSubmit: InviteEmailParticipantsFormProps['onFormSubmit'] = (
    sessionId,
    healthClinicId,
    emails,
  ) => {
    dispatch(
      sendInterventionInvitationsRequest(
        interventionId,
        isModularIntervention,
        sessionId,
        healthClinicId,
        emails,
        () => onBack(ParticipantInvitationType.EMAIL),
      ),
    );
  };

  const exampleCsvData: EmailsCsvRow[] = useMemo(() => {
    if (isReportingIntervention) {
      return healthClinicOptions.map(
        ({ value: healthClinicId, label: healthClinicName }, index) => ({
          email: `example${index + 1}@example.com`,
          healthClinicId,
          healthClinicName,
        }),
      );
    }
    return [...Array(5)].map((_, index) => ({
      email: `example${index + 1}@example.com`,
    }));
  }, [isReportingIntervention, healthClinicOptions]);

  return (
    <Column flex={1}>
      <BackButton
        invitationType={ParticipantInvitationType.EMAIL}
        onBack={onBack}
      />
      <Alert
        content={formatMessage(messages.uploadEmailsInfo)}
        background={themeColors.highlight}
        contentProps={{ maxWidth: 510 }}
        mt={24}
      />
      <Text my={24}>{formatMessage(globalMessages.requiredFields)}</Text>
      <CsvFileExport
        filename={formatMessage(messages.exampleCsvFilename, {
          name: interventionName,
        })}
        data={exampleCsvData}
      >
        {formatMessage(messages.exportExampleCsv)}
      </CsvFileExport>
      <Column flex={1}>
        <InviteEmailParticipantsForm
          isModularIntervention={isModularIntervention}
          isReportingIntervention={isReportingIntervention}
          sessionOptions={sessionOptions}
          healthClinicOptions={healthClinicOptions}
          onFormSubmit={handleSubmit}
          submitting={submitting}
        />
      </Column>
    </Column>
  );
};
