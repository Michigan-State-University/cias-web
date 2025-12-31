import React, { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  makeSelectInterventionLoader,
  bulkCreatePredefinedParticipantsRequest,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import { Alert, AlertType } from 'components/Alert';
import CsvFileExport from 'components/CsvFileExport';
import CsvFileReader from 'components/CsvFileReader';
import Row from 'components/Row';

import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
import {
  InvitePredefinedParticipantsFormValues,
  NormalizedHealthClinicsInfos,
  ParticipantInvitationType,
  UploadedPredefinedParticipantsCsvData,
} from './types';
import {
  InvitePredefinedParticipantsForm,
  Props as InvitePredefinedParticipantsFormProps,
} from './InvitePredefinedParticipantsForm';
import messages from './messages';
import {
  parsePredefinedParticipantsCsv,
  generatePredefinedParticipantsExampleCsv,
  prepareBulkCreatePredefinedParticipantsPayload,
} from './utils';

export type Props = {
  interventionName: string;
  isReportingIntervention: boolean;
  interventionId: string;
  healthClinicOptions: SelectOption<string>[];
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onBack: () => void;
};

export const UploadPredefinedParticipantsView: FC<Props> = ({
  onBack,
  interventionName,
  isReportingIntervention,
  interventionId,
  healthClinicOptions,
  normalizedHealthClinicsInfos,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('bulkCreatePredefinedParticipants'),
  );

  const handleSubmit: InvitePredefinedParticipantsFormProps['onSubmit'] = (
    values,
  ) => {
    const payload = prepareBulkCreatePredefinedParticipantsPayload(
      values,
      interventionId,
    );

    dispatch(
      bulkCreatePredefinedParticipantsRequest(interventionId, payload, () =>
        onBack(),
      ),
    );
  };

  const exampleCsvData = useMemo(
    () =>
      generatePredefinedParticipantsExampleCsv(
        healthClinicOptions,
        isReportingIntervention,
      ),
    [healthClinicOptions, isReportingIntervention],
  );

  const [initialFormValues, setInitialFormValues] =
    useState<Nullable<InvitePredefinedParticipantsFormValues>>(null);

  const handleUpload = (data: UploadedPredefinedParticipantsCsvData) => {
    const parsedParticipants = parsePredefinedParticipantsCsv(
      data,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
    );

    setInitialFormValues({
      participants: parsedParticipants,
    });
  };

  return (
    <Column flex={1} overflow="auto" gap={24}>
      <InviteParticipantsModalBackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />

      <Alert
        content={formatMessage(messages.uploadPredefinedParticipantsInfo)}
        type={AlertType.INFO}
        contentProps={{ maxWidth: 510 }}
      />

      <Row align="center" gap={24}>
        <CsvFileExport
          filename={formatMessage(
            messages.examplePredefinedParticipantsCsvFilename,
            {
              name: interventionName,
            },
          )}
          data={exampleCsvData}
        >
          {formatMessage(messages.exportExampleCsv)}
        </CsvFileExport>
        {/* @ts-ignore */}
        <CsvFileReader onUpload={handleUpload} config={{ header: true }}>
          {formatMessage(messages.predefinedParticipantsUploadLabel)}
        </CsvFileReader>
      </Row>

      {initialFormValues && (
        <Column flex={1}>
          <InvitePredefinedParticipantsForm
            initialFormValues={initialFormValues}
            isReportingIntervention={isReportingIntervention}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </Column>
      )}
    </Column>
  );
};
