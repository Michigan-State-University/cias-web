import React from 'react';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import Text, { EllipsisText } from 'components/Text';
import GhostLink from 'components/GhostLink';
import Tooltip from 'components/Tooltip';
import questionMark from 'assets/svg/red-question-mark.svg';

import globalMessages from 'global/i18n/globalMessages';
import { colors, themeColors } from 'theme';
import {
  statusTypeToColorMap,
  UserInterventionStatus,
} from 'models/UserIntervention/StatusTypes';
import { UserIntervention } from 'models/UserIntervention/UserIntervention';
import { InterventionType } from 'models/Intervention';

import { TileContainer } from './styled';
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
  } = userIntervention;

  const statusWithBlocked = blocked ? UserInterventionStatus.NO_ACCESS : status;

  const statusColor = statusTypeToColorMap[statusWithBlocked];

  const userInterventionCompletionPercentage =
    sessionsInIntervention === 0
      ? '0%'
      : `${Math.round((completedSessions / sessionsInIntervention) * 100)}%`;

  const tileDisabled = [
    UserInterventionStatus.COMPLETED,
    UserInterventionStatus.NO_ACCESS,
  ].includes(statusWithBlocked);

  return (
    <GhostLink disabled={tileDisabled} href={`/user_interventions/${id}`}>
      <TileContainer bg={tileDisabled ? colors.mischka : colors.white}>
        <Box display="flex" justify="between" align="center">
          <Box px={12} py={8} bg={statusColor} borderRadius={5}>
            <Text>
              {formatMessage(
                // @ts-ignore
                globalMessages.userInterventionStatus[statusWithBlocked],
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
