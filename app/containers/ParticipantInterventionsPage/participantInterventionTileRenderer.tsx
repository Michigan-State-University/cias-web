import React from 'react';
import { useIntl } from 'react-intl';

import questionMark from 'assets/svg/red-question-mark.svg';
import { colors, elements, themeColors } from 'theme';

import {
  statusTypeToColorMap,
  UserInterventionStatus,
} from 'models/UserIntervention/StatusTypes';
import { UserIntervention } from 'models/UserIntervention/UserIntervention';
import { InterventionType } from 'models/Intervention';

import { RoutePath } from 'global/constants';
import userInterventionStatusesMessages from 'global/i18n/userInterventionStatusesMessages';

import { parametrizeRoutePath } from 'utils/router';

import Box from 'components/Box';
import Text, { EllipsisText } from 'components/Text';
import GhostLink from 'components/GhostLink';
import Tooltip from 'components/Tooltip';
import { TileContainer } from 'components/TileContainer';

import messages from './messages';

const COMPLETED_INTERVENTION_TEXT_OPACITY = 0.3;

interface Props {
  data: { items: UserIntervention[] };
  index: number;
}

const ParticipantInterventionTileRenderer = ({ data, index }: Props) => {
  const { formatMessage } = useIntl();
  const { items } = data;
  const userIntervention = items?.[index];

  if (!userIntervention) return null;

  const {
    status,
    sessionsInIntervention,
    completedSessions,
    id,
    intervention: { name: interventionName, type: interventionType },
    blocked,
    containMultipleFillSession,
  } = userIntervention;

  const statusWithBlocked = blocked ? UserInterventionStatus.NO_ACCESS : status;

  const statusColor = statusTypeToColorMap[statusWithBlocked];

  const userInterventionCompletionPercentage =
    sessionsInIntervention === 0
      ? '0%'
      : `${Math.round((completedSessions / sessionsInIntervention) * 100)}%`;

  const tileDisabled =
    statusWithBlocked === UserInterventionStatus.NO_ACCESS ||
    (!containMultipleFillSession &&
      statusWithBlocked === UserInterventionStatus.COMPLETED);

  return (
    <GhostLink
      disabled={tileDisabled}
      to={parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
        userInterventionId: id,
      })}
    >
      <TileContainer
        bg={tileDisabled ? colors.mischka : colors.white}
        height={elements.userInterventionTileHeight}
      >
        <Box display="flex" justify="between" align="center">
          <Box px={12} py={8} bg={statusColor} borderRadius={5}>
            <Text>
              {formatMessage(
                userInterventionStatusesMessages[statusWithBlocked],
              )}
            </Text>
          </Box>
          {interventionType !== InterventionType.DEFAULT && !blocked && (
            <Box
              display="flex"
              opacity={tileDisabled ? COMPLETED_INTERVENTION_TEXT_OPACITY : 1}
            >
              <Text>{formatMessage(messages.modules)}</Text>
              <Text fontWeight="bold" ml={5} color={themeColors.secondary}>
                {sessionsInIntervention}
              </Text>
            </Box>
          )}
          {blocked && (
            // @ts-ignore
            <Tooltip
              id={`No-access-tooltip-${id}`}
              ml={8}
              icon={questionMark}
              text={formatMessage(messages.noAccessTooltip)}
            />
          )}
        </Box>

        <EllipsisText
          fontSize="18px"
          lineHeight="130%"
          fontWeight="bold"
          lines={2}
          text={interventionName}
          opacity={tileDisabled ? COMPLETED_INTERVENTION_TEXT_OPACITY : 1}
          dataFor={id}
          dir="auto"
        />
        <Box
          visibility={
            interventionType === InterventionType.DEFAULT || blocked
              ? 'hidden'
              : 'auto'
          }
          opacity={tileDisabled ? COMPLETED_INTERVENTION_TEXT_OPACITY : 1}
        >
          <Text>{formatMessage(messages.completion)} </Text>
          <Box display="flex" justify="between" align="center">
            <Box
              bg={statusTypeToColorMap[UserInterventionStatus.READY_TO_START]}
              borderRadius={2}
              width="80%"
              height={4}
            >
              <Box
                bg={statusColor}
                width={userInterventionCompletionPercentage}
                height="100%"
              />
            </Box>
            <Text fontWeight="bold" ml={20}>
              {userInterventionCompletionPercentage}
            </Text>
          </Box>
        </Box>
      </TileContainer>
    </GhostLink>
  );
};

export default ParticipantInterventionTileRenderer;
