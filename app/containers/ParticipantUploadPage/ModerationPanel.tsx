import React from 'react';
import { useIntl } from 'react-intl';

import {
  ParticipantUpload,
  ParticipantUploadModerationLabel,
  ParticipantUploadModerationOutcome,
  ParticipantUploadModerationStatus,
  getModerationCategory,
  getModerationOutcome,
  getModerationSkipReason,
} from 'models/ParticipantUpload';

import { Alert, AlertType } from 'components/Alert';
import Column from 'components/Column';
import Text from 'components/Text';

import {
  moderationCategoryMessages,
  moderationMessages,
  moderationSkipReasonMessages,
} from './messages';

export type ModerationPanelProps = {
  upload: ParticipantUpload;
};

const ModerationPanel = ({ upload }: ModerationPanelProps) => {
  const { formatMessage, formatNumber } = useIntl();

  const renderLabel = ({
    name,
    confidence,
  }: ParticipantUploadModerationLabel) => {
    const category = getModerationCategory(name);

    return (
      <Text key={name} fontSize={14} lineHeight={1.3}>
        {formatMessage(moderationMessages.labelConfidence, {
          category: formatMessage(
            category
              ? moderationCategoryMessages[category]
              : moderationMessages.unknownCategory,
          ),
          confidence: formatNumber(confidence, { maximumFractionDigits: 1 }),
        })}
      </Text>
    );
  };

  const renderBody = () => {
    switch (getModerationOutcome(upload)) {
      case ParticipantUploadModerationOutcome.PENDING:
        return (
          <Alert
            type={AlertType.INFO}
            content={formatMessage(moderationMessages.moderationPending)}
            data-cy="participant-upload-moderation-pending"
          />
        );
      case ParticipantUploadModerationOutcome.CLEAR:
        return (
          <Alert
            type={AlertType.INFO}
            content={formatMessage(moderationMessages.moderationClear)}
            data-cy="participant-upload-moderation-clear"
          />
        );
      case ParticipantUploadModerationOutcome.FLAGGED:
        return (
          <Column gap={8} data-cy="participant-upload-moderation-flagged">
            <Alert
              type={AlertType.WARNING}
              content={formatMessage(moderationMessages.moderationFlagged)}
            />
            {(upload.moderationLabels ?? []).map(renderLabel)}
          </Column>
        );
      default: {
        const skipReason = getModerationSkipReason(upload);
        const failed =
          upload.moderationStatus === ParticipantUploadModerationStatus.FAILED;

        const explanation = (() => {
          if (failed) return moderationMessages.moderationFailed;
          if (skipReason) return moderationSkipReasonMessages[skipReason];
          return moderationMessages.moderationNoReason;
        })();

        return (
          <Alert
            type={AlertType.WARNING_LIGHT}
            content={`${formatMessage(
              moderationMessages.moderationUnchecked,
            )} ${formatMessage(explanation)}`}
            data-cy="participant-upload-moderation-unchecked"
          />
        );
      }
    }
  };

  return (
    <Column gap={8} data-cy="participant-upload-moderation">
      <Text fontSize={14} fontWeight="bold">
        {formatMessage(moderationMessages.heading)}
      </Text>
      {renderBody()}
      {!!upload.moderationModelVersion && (
        <Text fontSize={12} lineHeight={1.3} textOpacity={0.6}>
          {formatMessage(moderationMessages.modelVersion, {
            version: upload.moderationModelVersion,
          })}
        </Text>
      )}
    </Column>
  );
};

export default ModerationPanel;
