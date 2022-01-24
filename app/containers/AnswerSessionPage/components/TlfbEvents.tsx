import React, { useState } from 'react';
import { Dayjs } from 'dayjs';

import { fullDayToYearFormatter } from 'utils/formatters';

import Calendar from 'components/Calendar';
import { PopoverModal } from 'components/Modal';

const TlfbEvents = () => {
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
    <>
      <PopoverModal referenceElement={dayId} onClose={onClose}>
        {selectedDay?.toString()}
      </PopoverModal>
      <Calendar onSelectDay={onSelectDay} selectedDay={selectedDay} />
    </>
  );
};

export default TlfbEvents;
