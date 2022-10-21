import React, { memo, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { colors } from 'theme';

import { fullDayToYearFormatter } from 'utils/formatters';

import Box from 'components/Box';
import Tooltip from 'components/Tooltip';
import Text from 'components/Text';

import { EventData } from 'models/Tlfb';
import TlfbYesNoText from 'components/TlfbYesNoText';
import globalMessages from 'global/i18n/globalMessages';

import messages from '../messages';
import EventList from './EventList';
import SubstancesUsageList from './SubstancesUsageList';
import { DayCell, DayCellProps } from './DayCell';
import { StyledText } from './styled';
import { SubstanceUsage } from '../types';
import {
  NUMBER_OF_EVENTS_VISIBLE,
  NUMBER_OF_SUBSTANCES_VISIBLE,
} from '../constants';

export type CalendarDayType = {
  rowsNumber: number;
  orderedGroupNames: string[];
} & Pick<
  DayCellProps,
  | 'day'
  | 'dayData'
  | 'unreachable'
  | 'disabled'
  | 'active'
  | 'onClick'
  | 'compact'
  | 'disableManualDayClick'
>;

export const Day = ({
  day,
  rowsNumber,
  compact,
  active,
  dayData,
  orderedGroupNames,
  ...props
}: CalendarDayType) => {
  const { formatMessage } = useIntl();
  const id = day.format(fullDayToYearFormatter);

  const events: EventData[] = dayData?.events || [];

  const substancesGroupUsages = useMemo<SubstanceUsage[]>(() => {
    const consumptions = dayData?.answer?.body.consumptions || [];
    if (consumptions.length === 0) return [];
    const substances = consumptions.reduce<NormalizedData<boolean>>(
      (acc, { name, consumed, amount }) => ({
        ...acc,
        [name]:
          acc[name] ||
          consumed ||
          (amount ? parseInt(amount, 10) !== 0 : false),
      }),
      {},
    );
    return orderedGroupNames.map((name) => ({
      name,
      consumed: substances[name],
    }));
  }, [orderedGroupNames, dayData]);

  const substancesLabel = useMemo(() => {
    if (!dayData || !dayData.answer || !dayData.answer.body) return null;

    const { consumptions, substancesConsumed } = dayData!.answer!.body;
    if (substancesConsumed === false) return <TlfbYesNoText yes={false} />;
    if (substancesConsumed && consumptions.length === 0)
      return <TlfbYesNoText yes />;

    return (
      <>
        {substancesGroupUsages
          .slice(0, NUMBER_OF_SUBSTANCES_VISIBLE)
          .map(({ consumed, name }) => (
            <Box display="flex" align="center" justify="end">
              <Text
                key={name}
                fontWeight="bold"
                color={colors.brightNavyBlue}
                fontSize={11}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                textAlign="right"
              >
                {name}
              </Text>
              <Box flexShrink={0}>
                <Text
                  fontWeight="bold"
                  color={colors.brightNavyBlue}
                  fontSize={11}
                >
                  : {formatMessage(globalMessages[consumed ? 'yes' : 'no'])}
                </Text>
              </Box>
            </Box>
          ))}
        {substancesGroupUsages.length > NUMBER_OF_SUBSTANCES_VISIBLE && (
          <StyledText textAlign="right" color={colors.bluewood} ml={12}>
            <FormattedMessage
              values={{
                count:
                  substancesGroupUsages.length - NUMBER_OF_SUBSTANCES_VISIBLE,
              }}
              {...messages.moreToDisplay}
            />
          </StyledText>
        )}
      </>
    );
  }, [dayData, substancesGroupUsages]);

  const numberOfEventsHidden = events.length - NUMBER_OF_EVENTS_VISIBLE;
  const numberOfSubstancesHidden =
    substancesGroupUsages.length - NUMBER_OF_SUBSTANCES_VISIBLE;
  const shouldRenderTooltip =
    !compact &&
    !active &&
    (numberOfEventsHidden > 0 ||
      (numberOfSubstancesHidden > 0 &&
        (!dayData ||
          !dayData.answer ||
          !dayData.answer.body ||
          dayData.answer.body.substancesConsumed)));

  const dayContentProps: DayCellProps = {
    day,
    dayData,
    id,
    compact,
    active,
    numberOfEventsHidden,
    substancesLabel,
    ...props,
  };

  if (!shouldRenderTooltip) return <DayCell {...dayContentProps} />;

  return (
    // @ts-ignore
    <Tooltip
      id={`${id}-events-tooltip`}
      place="right"
      stretchContent
      backgroundColor={colors.bluewood}
      content={
        <Box>
          {substancesGroupUsages.length > 0 && (
            <Text color={colors.white} fontSize={12} fontWeight="bold" mb={4}>
              {formatMessage(messages.substances, {
                count: substancesGroupUsages.length,
              })}
            </Text>
          )}
          <SubstancesUsageList
            substanceUsages={substancesGroupUsages}
            textColor={colors.white}
            wrap
          />
          {events.length > 0 && (
            <Text color={colors.white} fontSize={12} fontWeight="bold" my={4}>
              {formatMessage(messages.events)}
            </Text>
          )}
          <EventList events={events} textColor={colors.white} wrap />
        </Box>
      }
    >
      <DayCell {...dayContentProps} />
    </Tooltip>
  );
};

export default memo(Day);
