import React, { useMemo, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { TlfbConfigBody } from 'models/Question';
import {
  dayNumeralFormatter,
  fullDayToYearFormatter,
  fullMonthNameFormatter,
} from 'utils/formatters';
import { CamelToSnake } from 'global/types/camelToSnake';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';
import Calendar from 'components/Calendar';
import { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import Text from 'components/Text';
import Box from 'components/Box';
import { CalendarData } from 'components/Calendar/types';

import { TlfbContainer } from './styled';

type Props = {
  smallText: string;
  bigText: string;
  isMobilePreview: boolean;
  isMobile: boolean;
  tlfbConfig: CamelToSnake<TlfbConfigBody>;
  children: React.ReactNode;
  setDayId: (dayId?: string) => void;
  calendarData: CalendarData;
};

const TlfbCalendarLayout = ({
  bigText,
  children,
  isMobile,
  isMobilePreview,
  tlfbConfig,
  setDayId,
  smallText,
  calendarData,
}: Props) => {
  const [selectedDay, setSelectedDay] = useState<Dayjs>();
  const dayId = selectedDay
    ? selectedDay.format(fullDayToYearFormatter)
    : undefined;

  useEffect(() => {
    setDayId(dayId);
  }, [dayId]);

  const onClose = () => {
    setSelectedDay(undefined);
  };

  const tlfbStartDate = useMemo(() => {
    const {
      data: [
        {
          payload: { days_count: daysCount },
        },
      ],
    } = tlfbConfig;
    return dayjs().subtract(+daysCount, 'day');
  }, [tlfbConfig.data]);

  return (
    <TlfbContainer>
      <TlfbTitle smallText={smallText} bigText={bigText} />
      <PopoverModal
        referenceElement={dayId}
        onClose={onClose}
        portalId={ANSWER_SESSION_CONTAINER_ID}
        forceMobile={isMobilePreview}
        width={isMobile ? '' : '350px'}
      >
        <>
          {(isMobilePreview || isMobile) && (
            <Box display="flex">
              <Text fontWeight="bold" fontSize="26px">
                {selectedDay?.format(dayNumeralFormatter)},
              </Text>
              <Text ml={5} fontSize="26px">
                {selectedDay?.format(fullMonthNameFormatter)}
              </Text>
            </Box>
          )}
          {children}
        </>
      </PopoverModal>
      <Calendar
        startDate={tlfbStartDate}
        onSelectDay={setSelectedDay}
        selectedDay={selectedDay}
        endDate={dayjs().subtract(1, 'day')}
        calendarData={calendarData}
      />
    </TlfbContainer>
  );
};

export default TlfbCalendarLayout;
