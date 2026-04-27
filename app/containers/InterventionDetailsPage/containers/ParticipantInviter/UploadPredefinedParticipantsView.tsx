import React, { FC, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  makeSelectInterventionLoader,
  makeSelectRaSession,
  makeSelectRaSessionQuestionGroups,
  makeSelectBulkCreateStructuredErrors,
  bulkCreatePredefinedParticipantsRequest,
  bulkCreatePredefinedParticipantsError,
  fetchRaSessionQuestionGroupsRequest,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import { Alert, AlertType } from 'components/Alert';
import CsvFileExport from 'components/CsvFileExport';
import CsvFileReader from 'components/CsvFileReader';
import Row from 'components/Row';

import { BulkCreateErrorList } from './BulkCreateErrorList';
import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
import {
  NormalizedHealthClinicsInfos,
  ParticipantInvitationType,
  UploadedPredefinedParticipantsCsvData,
  ParsedPredefinedParticipantCsvRow,
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
  mergePredefinedParticipants,
  prepareRaAnswerColumnMap,
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

  const structuredErrors = useSelector(makeSelectBulkCreateStructuredErrors());

  const raSession = useSelector(makeSelectRaSession());
  const raSessionQuestionGroups = useSelector(
    makeSelectRaSessionQuestionGroups(),
  );

  useEffect(() => {
    if (raSession?.id) {
      dispatch(fetchRaSessionQuestionGroupsRequest(raSession.id));
    }
  }, [raSession?.id]);

  const raAnswerColumns = useMemo(
    () => prepareRaAnswerColumnMap(raSession, raSessionQuestionGroups),
    [raSession, raSessionQuestionGroups],
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
        normalizedHealthClinicsInfos,
        isReportingIntervention,
        raAnswerColumns,
      ),
    [
      healthClinicOptions,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
      raAnswerColumns,
    ],
  );

  const [participants, setParticipants] = useState<
    ParsedPredefinedParticipantCsvRow[]
  >([]);

  const [hasRaAnswers, setHasRaAnswers] = useState(false);

  const handleUpload = (data: UploadedPredefinedParticipantsCsvData) => {
    dispatch(bulkCreatePredefinedParticipantsError(null));

    try {
      const {
        participants: parsedParticipants,
        invalidPhoneCount,
        invalidHealthClinicCount,
        unknownRaAnswerColumnCount,
        raAnswerTypeMismatchCount,
      } = parsePredefinedParticipantsCsv(
        data,
        normalizedHealthClinicsInfos,
        isReportingIntervention,
        raAnswerColumns,
      );

      if (invalidPhoneCount > 0) {
        toast.warning(
          formatMessage(messages.csvInvalidPhoneNumbers, {
            count: invalidPhoneCount,
          }),
        );
      }

      if (invalidHealthClinicCount > 0) {
        toast.warning(
          formatMessage(messages.csvInvalidHealthClinicIds, {
            count: invalidHealthClinicCount,
          }),
        );
      }

      if (unknownRaAnswerColumnCount > 0) {
        toast.warning(
          formatMessage(messages.csvUnknownRaAnswerColumn, {
            count: unknownRaAnswerColumnCount,
          }),
        );
      }

      if (raAnswerTypeMismatchCount > 0) {
        toast.warning(
          formatMessage(messages.csvRaAnswerTypeMismatch, {
            count: raAnswerTypeMismatchCount,
          }),
        );
      }

      const detected = parsedParticipants.some(
        (p) => p.raAnswers && Object.values(p.raAnswers).some((v) => v?.trim()),
      );
      setHasRaAnswers(detected);

      setParticipants((prevParticipants) =>
        mergePredefinedParticipants(prevParticipants, parsedParticipants),
      );
    } catch (error) {
      toast.error(formatMessage(messages.csvParsingError));
    }
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
        wrap={false}
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

      {participants.length > 0 && (
        <Column flex={1} gap={16}>
          {hasRaAnswers && (
            <Alert
              type={AlertType.INFO}
              content={formatMessage(messages.raAnswersInfoBanner)}
              wrap={false}
            />
          )}

          {structuredErrors && structuredErrors.length > 0 && (
            <BulkCreateErrorList errors={structuredErrors} />
          )}

          <InvitePredefinedParticipantsForm
            initialFormValues={{ participants }}
            onSubmit={handleSubmit}
            submitting={submitting}
            onParticipantsChange={setParticipants}
            raAnswerColumns={raAnswerColumns}
          />
        </Column>
      )}
    </Column>
  );
};
