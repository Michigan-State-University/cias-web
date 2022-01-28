import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { fullDayToYearFormatter } from 'utils/formatters';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';

import Calendar from 'components/Calendar';
import EventCollapse from 'components/EventCollapse';
import Box from 'components/Box';
import { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import { TlfbEventsWithConfigDto as TlfbEventsWithConfig } from 'models/Question';

import { TlfbContainer } from './styled';
import { SharedProps } from './sharedProps';

const TlfbEvents = ({
  question,
  isMobilePreview,
  isMobile,
}: SharedProps<TlfbEventsWithConfig>) => {
  const {
    body: {
      config: {
        data: [
          {
            payload: { days_count: daysCount },
          },
        ],
      },
      data: [
        {
          payload: {
            screen_question: screenQuestion,
            screen_title: screenTitle,
          },
        },
      ],
    },
  } = question;

  const tlfbStartDate = dayjs().subtract(+daysCount, 'day');

  const [selectedDay, setSelectedDay] = useState<Dayjs>();
  const dayId = selectedDay
    ? selectedDay.format(fullDayToYearFormatter)
    : undefined;

  const onClose = () => {
    setSelectedDay(undefined);
  };

  const onSelectDay = (day: Dayjs) => {
    setSelectedDay(day);
  };

  // TODO: handle storing and modification of events
  const eventsMock = [{ name: 'Birthday' }, { name: 'Christmas' }];

  return (
    <TlfbContainer>
      <TlfbTitle smallText={screenTitle} bigText={screenQuestion} />
      <PopoverModal
        referenceElement={dayId}
        onClose={onClose}
        portalId={ANSWER_SESSION_CONTAINER_ID}
        forceMobile={isMobilePreview}
        width={!isMobile ? '350px' : ''}
      >
        {eventsMock.map((event, index) => (
          <Box mb={16} key={`event-collapsable-${index}`}>
            <EventCollapse
              title={`Event ${index + 1}`}
              eventName={event.name}
            />
          </Box>
        ))}
      </PopoverModal>
      <Calendar
        startDate={tlfbStartDate}
        onSelectDay={onSelectDay}
        selectedDay={selectedDay}
      />
    </TlfbContainer>
  );
};

export default TlfbEvents;
