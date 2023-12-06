import React from 'react';
import { useIntl } from 'react-intl';

import questionMark from 'assets/svg/red-question-mark.svg';
import { colors, elements, themeColors } from 'theme';

import {
  statusTypeToColorMap,
  statusTypeToFontColorMap,
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
import {
  getExtendedUserInterventionStatus,
  isUserInterventionTileDisabled,
} from './utils';
import Row from '../../components/Row';

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
    status: userInterventionStatus,
    sessionsInIntervention,
    completedSessions,
    id,
    intervention: {
      name: interventionName,
      type: interventionType,
      status: interventionStatus,
    },
    blocked,
    containMultipleFillSession,
  } = userIntervention;

  const extendedStatus = getExtendedUserInterventionStatus(
    blocked,
    interventionStatus,
    userInterventionStatus,
  );

  const statusColor = statusTypeToColorMap[extendedStatus];
  const statusFontColor = statusTypeToFontColorMap[extendedStatus];

  const userInterventionCompletionPercentage =
    sessionsInIntervention === 0
      ? '0%'
      : `${Math.round((completedSessions / sessionsInIntervention) * 100)}%`;

  const tileDisabled = isUserInterventionTileDisabled(
    extendedStatus,
    containMultipleFillSession,
  );

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
        disabled={tileDisabled}
      >
        <Box display="flex" justify="between" align="center">
          <Row gap={8} align="center">
            <Box px={8} py={4} bg={statusColor} borderRadius={5}>
              <Text
                color={statusFontColor}
                fontWeight="bold"
                fontSize={12}
                lineHeight={1.33}
              >
                {formatMessage(
                  userInterventionStatusesMessages[extendedStatus],
                )}
              </Text>
            </Box>
            {extendedStatus === UserInterventionStatus.PAUSED && (
              <Tooltip
                id={`paused-intervention-tooltip-${id}`}
                icon={questionMark}
                text={formatMessage(messages.pausedInterventionTooltip)}
              />
            )}
          </Row>
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
              bg={colors.periwinkleGray50}
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
