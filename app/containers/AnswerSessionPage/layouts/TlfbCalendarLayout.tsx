import React, { forwardRef, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { TlfbConfigBody } from 'models/Question';
import { CalendarData } from 'models/Tlfb';
import { dayNumeralFormatter, fullMonthNameFormatter } from 'utils/formatters';
import { CamelToSnake } from 'global/types/camelToSnake';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';
import Calendar from 'components/Calendar';
import { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import Text from 'components/Text';
import Box from 'components/Box';
import { CalendarRef } from 'components/Calendar/types';
import Loader from 'components/Loader';

import { TlfbContainer } from './styled';

type Props = {
  smallText: string;
  bigText: string;
  isMobilePreview: boolean;
  isMobile: boolean;
  tlfbConfig: CamelToSnake<TlfbConfigBody>;
  children: React.ReactNode;
  selectedDay?: Dayjs;
  dayId?: string;
  onSelectDay: (day?: Dayjs) => void;
  calendarData: CalendarData;
  disableModalClose?: boolean;
  isLoading?: boolean;
};

const TlfbCalendarLayout = forwardRef<CalendarRef, Props>(
  (
    {
      bigText,
      children,
      isMobile,
      isMobilePreview,
      tlfbConfig,
      selectedDay,
      dayId,
      onSelectDay,
      smallText,
      calendarData,
      disableModalClose,
      isLoading = false,
    }: Props,
    ref,
  ) => {
    const onClose = () => {
      onSelectDay(undefined);
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
        {/* @ts-ignore */}
        {isLoading && <Loader />}
        <TlfbTitle smallText={smallText} bigText={bigText} />
        <Calendar
          ref={ref}
          startDate={tlfbStartDate}
          onSelectDay={onSelectDay}
          selectedDay={selectedDay}
          endDate={dayjs().subtract(1, 'day')}
          calendarData={calendarData}
          disableManualDayClick={disableModalClose}
        />
        <PopoverModal
          referenceElement={dayId}
          onClose={onClose}
          portalId={ANSWER_SESSION_CONTAINER_ID}
          forceMobile={isMobilePreview}
          disableClose={disableModalClose}
          width={isMobile ? '' : '400px'}
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
      </TlfbContainer>
    );
  },
);

export default TlfbCalendarLayout;
