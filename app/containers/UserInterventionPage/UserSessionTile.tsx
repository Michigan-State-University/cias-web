import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import Box from 'components/Box';
import GhostLink from 'components/GhostLink';
import Text, { EllipsisText } from 'components/Text';
import Button from 'components/Button';

import { Session, SessionSchedule } from 'models/Session';
import { UserSession } from 'models/UserSession/UserSession';
import {
  UserSessionStatus,
  statusTypeToColorMap,
  statusTypeToFontColorMap,
} from 'models/UserSession/StatusTypes';
import { InterventionType } from 'models/Intervention';
import { colors, themeColors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';

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
    multipleFill,
  },
  interventionType,
  interventionId,
  userSession,
}: Props) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const sessionUrl = `/interventions/${interventionId}/sessions/${id}/fill`;

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

  const disabledTile =
    !multipleFill &&
    [UserSessionStatus.NOT_AVAILABLE, UserSessionStatus.COMPLETED].includes(
      userSessionStatus,
    );

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
          {formatMessage(messages[SessionSchedule.EXACT_DATE], {
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
    <GhostLink disabled={disabledTile} width="100%" to={sessionUrl}>
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
        {multipleFill && userSessionStatus === UserSessionStatus.COMPLETED && (
          <Box
            display="flex"
            justify="between"
            align="center"
            borderTop={`1px solid ${colors.lightGrey}`}
            pt={15}
            borderRadius={0}
          >
            {userSession?.filledOutCount && (
              <Box>
                <Text textOpacity={0.7} color={themeColors.text}>
                  {formatMessage(messages.sessionFilledNTimes, {
                    count: userSession.filledOutCount,
                  })}
                </Text>
              </Box>
            )}
            <Box>
              <Button
                px={20}
                height={33}
                onClick={() => history.push(sessionUrl)}
              >
                {formatMessage(messages.fillAgain)}
              </Button>
            </Box>
          </Box>
        )}
      </TileContainer>
    </GhostLink>
  );
};

export default UserSessionTile;
