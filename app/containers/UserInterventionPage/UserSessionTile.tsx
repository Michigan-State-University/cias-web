import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import Box from 'components/Box';
import GhostLink from 'components/GhostLink';
import Text, { EllipsisText } from 'components/Text';

import { Session } from 'models/Session/Session';
import { UserSession } from 'models/UserSession/UserSession';
import {
  UserSessionStatus,
  statusTypeToColorMap,
  statusTypeToFontColorMap,
} from 'models/UserSession/StatusTypes';
import { InterventionType } from 'models/Intervention';
import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import { SCHEDULE_OPTIONS } from 'global/reducers/intervention';

import { TileContainer } from './styled';
import messages from './messages';

const DISABLED_TILE_TEXT_OPACITY = 0.15;

interface Props {
  session: Session;
  interventionType: InterventionType;
  interventionId: string;
  userSession?: Nullable<UserSession>;
}

const UserSessionTile = ({
  session: {
    estimatedTime,
    id,
    name,
    position,
    schedule,
    schedulePayload,
    scheduleAt,
  },
  interventionType,
  interventionId,
  userSession,
}: Props) => {
  const { formatMessage } = useIntl();

  const isFirstSession = position === 1;

  const isScheduledForFuture =
    !userSession ||
    !userSession.scheduledAt ||
    dayjs().isBefore(dayjs(userSession.scheduledAt));

  const isNotAvailable =
    interventionType !== InterventionType.FLEXIBLE &&
    isScheduledForFuture &&
    !isFirstSession &&
    !userSession?.finishedAt &&
    !userSession?.lastAnswerAt;

  const userSessionStatus = useMemo(() => {
    if (isNotAvailable) return UserSessionStatus.NOT_AVAILABLE;
    if (!userSession) return UserSessionStatus.READY_TO_START;

    const { finishedAt, lastAnswerAt } = userSession;
    if (finishedAt) return UserSessionStatus.COMPLETED;

    if (lastAnswerAt) return UserSessionStatus.IN_PROGRESS;

    return UserSessionStatus.READY_TO_START;
  }, [userSession, isNotAvailable]);

  const tileBackground = useMemo(() => {
    if (userSessionStatus === UserSessionStatus.NOT_AVAILABLE)
      return colors.mischka;
    if (userSessionStatus === UserSessionStatus.COMPLETED) return colors.zirkon;
    return colors.white;
  }, [userSessionStatus]);

  const disabledTile = [
    UserSessionStatus.NOT_AVAILABLE,
    UserSessionStatus.COMPLETED,
  ].includes(userSessionStatus);

  const renderBottomText = () => {
    if (userSessionStatus !== UserSessionStatus.NOT_AVAILABLE) {
      return (
        <Text
          opacity={
            UserSessionStatus.COMPLETED === userSessionStatus
              ? DISABLED_TILE_TEXT_OPACITY
              : 1
          }
          mr={3}
        >
          {formatMessage(messages.estimatedTime, {
            time: estimatedTime,
          })}
        </Text>
      );
    }

    if (userSession && userSession.scheduledAt && isScheduledForFuture) {
      return (
        <Text>
          {formatMessage(messages[SCHEDULE_OPTIONS.exactDate], {
            scheduleAt: dayjs(userSession.scheduledAt).format(
              'MMMM D, YYYY h:mm A',
            ),
            schedulePayload: null,
          })}
        </Text>
      );
    }

    return (
      <Text>
        {formatMessage(messages[schedule], {
          scheduleAt: dayjs(scheduleAt).format('MMMM D, YYYY'),
          schedulePayload,
        })}
      </Text>
    );
  };

  return (
    <GhostLink
      disabled={disabledTile}
      width="100%"
      href={`/interventions/${interventionId}/sessions/${id}/fill`}
    >
      <TileContainer bg={tileBackground}>
        <Box display="flex" justify="between" align="center">
          <Box
            px={12}
            py={8}
            bg={statusTypeToColorMap[userSessionStatus]}
            borderRadius={5}
          >
            <Text color={statusTypeToFontColorMap[userSessionStatus]}>
              {formatMessage(
                // @ts-ignore
                globalMessages.userSessionStatus[userSessionStatus],
              )}
            </Text>
          </Box>
        </Box>
        <EllipsisText
          fontSize="18px"
          lineHeight="130%"
          fontWeight="bold"
          lines={2}
          text={name}
          opacity={disabledTile ? DISABLED_TILE_TEXT_OPACITY : 1}
          dataFor={id}
        />

        <Box
          display="flex"
          visibility={
            estimatedTime || estimatedTime === 0 || isNotAvailable
              ? 'visible'
              : 'hidden'
          }
        >
          {renderBottomText()}
        </Box>
      </TileContainer>
    </GhostLink>
  );
};

export default UserSessionTile;