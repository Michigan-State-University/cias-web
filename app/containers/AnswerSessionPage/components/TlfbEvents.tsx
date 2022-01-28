import React, { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import {
  addNewEventSaga,
  addNewTlfbEvent,
  tlfbReducer,
  makeSelectTlfbDays,
  makeSelectTlfbLoaders,
} from 'global/reducers/tlfb';
import { TlfbEventsWithConfigDto as TlfbEventsWithConfig } from 'models/Question';

import { fullDayToYearFormatter } from 'utils/formatters';

import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';
import { themeColors } from 'theme';
import Calendar from 'components/Calendar';
import EventCollapse from 'components/EventCollapse';
import Box from 'components/Box';
import Text from 'components/Text';
import { PopoverModal } from 'components/Modal';
import TlfbTitle from 'components/TlfbTitle';
import PlusCircle from 'components/Circle/PlusCircle';
import Spinner from 'components/Spinner';

import { TlfbContainer } from './styled';
import { SharedProps } from './sharedProps';
import messages from '../messages';

const TlfbEvents = ({
  question,
  isMobilePreview,
  isMobile,
  userSessionId,
}: SharedProps<TlfbEventsWithConfig>) => {
  const dispatch = useDispatch();
  const tlfbDaysData = useSelector(makeSelectTlfbDays());
  const createEventLoading = useSelector(makeSelectTlfbLoaders('createEvent'));

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
    question_group_id: questionGroupId,
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

  const addTlfbEvent = () => {
    if (userSessionId && selectedDay) {
      dispatch(
        addNewTlfbEvent(
          questionGroupId,
          userSessionId,
          selectedDay.toISOString(),
        ),
      );
    }
  };

  const selectedDayEvents = useMemo(() => {
    if (!dayId) return [];
    return tlfbDaysData[dayId]?.events || [];
  }, [dayId, tlfbDaysData]);

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
        <>
          {selectedDayEvents.map((event, index) => (
            <Box mb={16} key={`event-collapsable-${index}`}>
              <EventCollapse
                title={`Event ${index + 1}`}
                eventName={event.name}
              />
            </Box>
          ))}
          {createEventLoading && (
            <Box my={10} mx="auto">
              <Spinner color={themeColors.secondary} />
            </Box>
          )}
          <Box
            role="button"
            onClick={addTlfbEvent}
            cursor="pointer"
            display="flex"
            align="center"
          >
            <PlusCircle size="24px" />
            <Text ml={10} color={themeColors.secondary}>
              <FormattedMessage {...messages.addEvent} />
            </Text>
          </Box>
        </>
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

export default compose(
  injectSaga({ key: 'addNewEvent', saga: addNewEventSaga }),
  // @ts-ignore
  injectReducer({ key: 'tlfbReducer', reducer: tlfbReducer }),
)(TlfbEvents);
