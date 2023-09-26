import React, { FC, useMemo, useState } from 'react';
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
import CsvFileReader from 'components/CsvFileReader';
import Row from 'components/Row';

import { BackButton } from './BackButton';
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
import { parseEmailsCsv } from './utils';

export type Props = {
  interventionName: string;
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
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
  normalizedHealthClinicsInfos,
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

  const [initialFormValues, setInitialFormValues] =
    useState<Nullable<InviteEmailParticipantsFormValues>>(null);

  const handleUpload = (data: UploadedEmailsCsvData) => {
    const parsedData = parseEmailsCsv(
      data,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
    );

    const newInitialFormValues: InviteEmailParticipantsFormValues =
      parsedData.reduce<InviteEmailParticipantsFormValues>(
        (values, item) => {
          values.emails.push(item.email);
          return values;
        },
        { sessionOption: null, healthClinicOption: null, emails: [] },
      );

    setInitialFormValues(newInitialFormValues);
  };

  return (
    <Column flex={1} overflow="auto">
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
      <Row align="center" mt={24} gap={24}>
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
        <>
          <Text mt={24}>{formatMessage(globalMessages.requiredFields)}</Text>
          <Column mt={24} flex={1}>
            <InviteEmailParticipantsForm
              initialFormValues={initialFormValues}
              isModularIntervention={isModularIntervention}
              isReportingIntervention={isReportingIntervention}
              sessionOptions={sessionOptions}
              healthClinicOptions={healthClinicOptions}
              onFormSubmit={handleSubmit}
              submitting={submitting}
            />
          </Column>
        </>
      )}
    </Column>
  );
};
