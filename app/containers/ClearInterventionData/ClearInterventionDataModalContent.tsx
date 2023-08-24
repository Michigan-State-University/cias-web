import { FC } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import globalMessages from 'global/i18n/globalMessages';

import { SensitiveDataState } from 'models/Intervention';

import { CustomDayjsLocale } from 'utils/dayjs';

import Column from 'components/Column';
import Text from 'components/Text';

import messages from './messages';

export type Props = {
  sensitiveDataState: SensitiveDataState;
  clearSensitiveDataScheduledAt: Nullable<string>;
};

export const ClearInterventionDataModalContent: FC<Props> = ({
  sensitiveDataState,
  clearSensitiveDataScheduledAt,
}) => {
  const { formatMessage } = useIntl();

  if (sensitiveDataState === SensitiveDataState.COLLECTED)
    return (
      <Column>
        <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
          {formatMessage(globalMessages.areYouSure)}
        </Text>
        <Text mt={16} fontSize={15} lineHeight={1.5}>
          {formatMessage(messages.clearDataConfirmationContent)}
        </Text>
        <Text mt={32} fontSize={15} lineHeight={1.5} opacity={0.7}>
          {formatMessage(messages.clearDataConfirmationNote)}
        </Text>
      </Column>
    );

  if (sensitiveDataState === SensitiveDataState.MARKED_TO_REMOVE)
    return (
      <Column>
        <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
          {formatMessage(messages.markedToRemoveTitle)}
        </Text>
        <Text mt={16} fontSize={15} lineHeight={1.5}>
          {formatMessage(messages.markedToRemoveContentFirst)}
        </Text>
        {clearSensitiveDataScheduledAt && (
          <Text fontSize={15} lineHeight={1.5}>
            {formatMessage(messages.markedToRemoveContentSecond, {
              time: dayjs(clearSensitiveDataScheduledAt)
                .locale(CustomDayjsLocale.EN_LONG_RELATIVE_TIME)
                .fromNow(false),
            })}
          </Text>
        )}
      </Column>
    );

  if (sensitiveDataState === SensitiveDataState.REMOVED)
    return (
      <Column>
        <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
          {formatMessage(messages.removedTitle)}
        </Text>
        <Text mt={16} fontSize={15} lineHeight={1.5}>
          {formatMessage(messages.removedContent)}
        </Text>
      </Column>
    );

  return null;
};
