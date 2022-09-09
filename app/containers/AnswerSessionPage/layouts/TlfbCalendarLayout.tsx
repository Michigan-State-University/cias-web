import React, { forwardRef, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import some from 'lodash/some';

import { TlfbConfigBody } from 'models/Question';
import { CalendarData, DayData } from 'models/Tlfb';
import {
  dayNumeralFormatter,
  fullDayOfWeekFormatter,
  fullMonthNameFormatter,
} from 'utils/formatters';
import { CamelToSnake } from 'global/types/camelToSnake';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';
import Calendar from 'components/Calendar';
import Modal, { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import Text from 'components/Text';
import Box from 'components/Box';
import { CalendarRef } from 'components/Calendar/types';
import Loader from 'components/Loader';

import { colors } from 'theme';
import { CalendarLegend } from 'components/Calendar/CalendarLegend';
import { TlfbContainer } from './styled';
import { getTlfbDateRange } from '../utils';

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
  hideHelpingMaterials?: boolean;
  orderedGroupNames?: string[];
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
      hideHelpingMaterials,
      orderedGroupNames,
    }: Props,
    ref,
  ) => {
    const onClose = () => {
      onSelectDay(undefined);
    };

    const { startDate, endDate } = useMemo(
      () => getTlfbDateRange(tlfbConfig),
      [tlfbConfig],
    );

    const isMobileView = isMobile || isMobilePreview;
    const shouldDisplayTitleRow = smallText || bigText || !hideHelpingMaterials;
    const shouldDisplayLegend =
      isMobileView && some(calendarData, (day: DayData) => !!day.answer);

    return (
      <TlfbContainer>
        {/* @ts-ignore */}
        {isLoading && <Loader />}
        {shouldDisplayTitleRow && (
          <TlfbTitle
            smallText={smallText}
            bigText={bigText}
            displayHelpingMaterials={!hideHelpingMaterials && !isMobileView}
          />
        )}
        <Calendar
          ref={ref}
          startDate={startDate}
          onSelectDay={onSelectDay}
          selectedDay={selectedDay}
          endDate={endDate}
          calendarData={calendarData}
          disableManualDayClick={disableModalClose}
          orderedGroupNames={orderedGroupNames || []}
        />
        {shouldDisplayLegend && (
          <Box mt={16}>
            <CalendarLegend />
          </Box>
        )}
        {isMobileView && (
          <Modal
            visible={!!selectedDay}
            onClose={onClose}
            portalId={isMobilePreview ? ANSWER_SESSION_CONTAINER_ID : undefined}
            disableClose={disableModalClose}
            hideCloseButton={disableModalClose}
            width={isMobile ? '' : '500px'}
            height={isMobile && !isMobilePreview ? '100vh' : '100%'}
            bg={colors.linkWater}
          >
            <Box display="flex">
              <Text fontSize="26px">
                {selectedDay?.format(fullDayOfWeekFormatter)},
              </Text>
              <Text fontWeight="bold" ml={5} fontSize="26px">
                {`${selectedDay?.format(
                  fullMonthNameFormatter,
                )} ${selectedDay?.format(dayNumeralFormatter)}`}
              </Text>
            </Box>
            {children}
          </Modal>
        )}
        {!isMobileView && (
          <PopoverModal
            referenceElement={dayId}
            onClose={onClose}
            portalId={ANSWER_SESSION_CONTAINER_ID}
            forceMobile={isMobilePreview}
            disableClose={disableModalClose}
            width={isMobile ? '' : '500px'}
            specialMobileView
          >
            {children}
          </PopoverModal>
        )}
      </TlfbContainer>
    );
  },
);

export default TlfbCalendarLayout;
