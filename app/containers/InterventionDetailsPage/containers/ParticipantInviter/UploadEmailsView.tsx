import React, { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  makeSelectInterventionLoader,
  sendInterventionInvitationsRequest,
  SendInterventionInvitationsData,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import { Alert, AlertType } from 'components/Alert';
import CsvFileExport from 'components/CsvFileExport';
import CsvFileReader from 'components/CsvFileReader';
import Row from 'components/Row';

import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
import {
  EmailsCsvRow,
  InviteEmailParticipantsFormValues,
  NormalizedHealthClinicsInfos,
  ParticipantInvitationType,
  UploadedEmailsCsvData,
} from './types';
import {
  InviteEmailParticipantsForm,
  Props as InviteEmailParticipantsFormProps,
} from './InviteEmailParticipantsForm';
import messages from './messages';
import {
  parseEmailsCsv,
  prepareUploadEmailsInitialValues,
  prepareSendInvitationsPayload,
} from './utils';

export type Props = {
  interventionName: string;
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onBack: () => void;
};

export const UploadEmailsView: FC<Props> = ({
  onBack,
  interventionName,
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessionOptions,
  healthClinicOptions,
  normalizedHealthClinicsInfos,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('sendInterventionInvitations'),
  );

  const handleSubmit: InviteEmailParticipantsFormProps['onSubmit'] = (
    values,
  ) => {
    const invitations: SendInterventionInvitationsData =
      prepareSendInvitationsPayload(values, interventionId);

    dispatch(
      sendInterventionInvitationsRequest(interventionId, invitations, () =>
        onBack(),
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

  const [initialFormValues, setInitialFormValues] =
    useState<Nullable<InviteEmailParticipantsFormValues>>(null);

  const handleUpload = (data: UploadedEmailsCsvData) => {
    const parsedData = parseEmailsCsv(
      data,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
    );

    const newInitialFormValues = prepareUploadEmailsInitialValues(
      parsedData,
      isReportingIntervention,
      isModularIntervention,
      normalizedHealthClinicsInfos,
      sessionOptions[0],
    );

    setInitialFormValues(newInitialFormValues);
  };

  return (
    <Column flex={1} overflow="auto" gap={24}>
      <InviteParticipantsModalBackButton
        invitationType={ParticipantInvitationType.EMAIL}
        onBack={onBack}
      />
      <Alert
        content={formatMessage(messages.uploadEmailsInfo)}
        type={AlertType.INFO}
        contentProps={{ maxWidth: 510 }}
      />
      <Row align="center" gap={24}>
        <CsvFileExport
          filename={formatMessage(messages.exampleCsvFilename, {
            name: interventionName,
          })}
          data={exampleCsvData}
        >
          {formatMessage(messages.exportExampleCsv)}
        </CsvFileExport>
        {/* @ts-ignore */}
        <CsvFileReader onUpload={handleUpload}>
          {formatMessage(messages.csvUploadLabel)}
        </CsvFileReader>
      </Row>
      {initialFormValues && (
        <Column flex={1}>
          <InviteEmailParticipantsForm
            initialFormValues={initialFormValues}
            isModularIntervention={isModularIntervention}
            isReportingIntervention={isReportingIntervention}
            sessionOptions={sessionOptions}
            healthClinicOptions={healthClinicOptions}
            onSubmit={handleSubmit}
            submitting={submitting}
            normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
          />
        </Column>
      )}
    </Column>
  );
};
