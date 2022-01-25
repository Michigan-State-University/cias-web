import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { fullDayToYearFormatter } from 'utils/formatters';

import Calendar from 'components/Calendar';
import { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import { TlfbEventsWithConfigDto as TlfbEventsWithConfig } from 'models/Question';

import { TlfbContainer } from './styled';
import { SharedProps } from './sharedProps';

const TlfbEvents = ({ question }: SharedProps<TlfbEventsWithConfig>) => {
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

  const tlfbStartDate = dayjs().subtract(+daysCount + 1, 'day');
  const tlfbEndDate = dayjs().subtract(1, 'day');

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

  return (
    <TlfbContainer>
      <TlfbTitle smallText={screenTitle} bigText={screenQuestion} />
      <PopoverModal referenceElement={dayId} onClose={onClose}>
        {selectedDay?.toString()}
      </PopoverModal>
      <Calendar
        startDate={tlfbStartDate}
        endDate={tlfbEndDate}
        onSelectDay={onSelectDay}
        selectedDay={selectedDay}
      />
    </TlfbContainer>
  );
};

export default TlfbEvents;
