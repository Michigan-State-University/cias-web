import React, { useState } from 'react';
import { Dayjs } from 'dayjs';

import { fullDayToYearFormatter } from 'utils/formatters';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';

import Calendar from 'components/Calendar';
import { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import { TlfbEventsDTO as TlfbEventsModel } from 'models/Question';

import { TlfbContainer } from './styled';

type TlfbEventsProps = {
  question: TlfbEventsModel;
  isMobilePreview: boolean;
};

const TlfbEvents = ({ question, isMobilePreview }: TlfbEventsProps) => {
  const {
    body: { data },
  } = question;

  const questionData = data[0]?.payload;
  const screenQuestion = questionData?.screen_question;
  const screenTitle = questionData?.screen_title;

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

      <PopoverModal
        referenceElement={dayId}
        onClose={onClose}
        portalId={ANSWER_SESSION_CONTAINER_ID}
        forceMobile={isMobilePreview}
      >
        {selectedDay?.toString()}
      </PopoverModal>
      <Calendar onSelectDay={onSelectDay} selectedDay={selectedDay} />
    </TlfbContainer>
  );
};

export default TlfbEvents;
