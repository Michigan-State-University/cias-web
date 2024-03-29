import React, { forwardRef, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import some from 'lodash/some';
import { useSelector } from 'react-redux';

import { TlfbConfigBody } from 'models/Question';
import { CalendarData, DayData } from 'models/Tlfb';
import { weekdayAndDayOfMonthFormatter } from 'utils/formatters';
import { CamelToSnake } from 'global/types/camelToSnake';
import { makeSelectInterventionElementsLanguageCode } from 'global/reducers/globalState';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';
import { makeSelectLocale } from 'containers/AppLanguageProvider';

import Calendar from 'components/Calendar';
import Modal, { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import H1 from 'components/H1';
import Box from 'components/Box';
import { CalendarRef } from 'components/Calendar/types';
import Loader from 'components/Loader';

import { colors } from 'theme';
import { CalendarLegend } from 'components/Calendar/CalendarLegend';
import { TlfbContainer } from './styled';
import { getTlfbDateRange } from '../utils';

type Props = {
  title: string;
  subtitle: string;
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
      children,
      isMobile,
      isMobilePreview,
      tlfbConfig,
      selectedDay,
      dayId,
      onSelectDay,
      title,
      subtitle,
      calendarData,
      disableModalClose,
      isLoading = false,
      hideHelpingMaterials,
      orderedGroupNames,
    }: Props,
    ref,
  ) => {
    const language = useSelector(makeSelectInterventionElementsLanguageCode());
    const appLocale = useSelector(makeSelectLocale());

    const onClose = () => {
      onSelectDay(undefined);
    };

    const { startDate, endDate } = useMemo(
      () => getTlfbDateRange(tlfbConfig),
      [tlfbConfig],
    );

    const isMobileView = isMobile || isMobilePreview;
    const shouldDisplayTitleRow = title || subtitle || !hideHelpingMaterials;
    const shouldDisplayLegend =
      isMobileView && some(calendarData, (day: DayData) => !!day.answer);

    const mobileViewHeader = useMemo(() => {
      if (!selectedDay) return '';
      return `${selectedDay
        .locale(language || appLocale)
        .format(weekdayAndDayOfMonthFormatter)}`;
    }, [selectedDay, language]);

    return (
      <TlfbContainer>
        {/* @ts-ignore */}
        {isLoading && <Loader />}
        {shouldDisplayTitleRow && (
          <TlfbTitle
            title={title}
            subtitle={subtitle}
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
          language={language}
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
            <H1 fontSize={24}>{mobileViewHeader}</H1>
            {children}
          </Modal>
        )}
        {!isMobileView && (
          <PopoverModal
            referenceElement={dayId}
            onClose={onClose}
            portalId={ANSWER_SESSION_CONTAINER_ID}
            disableClose={disableModalClose}
            width={isMobile ? '' : '500px'}
          >
            {children}
          </PopoverModal>
        )}
      </TlfbContainer>
    );
  },
);

export default TlfbCalendarLayout;
