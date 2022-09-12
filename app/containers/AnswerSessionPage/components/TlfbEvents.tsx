import React, { useMemo, useState, useEffect } from 'react';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dayjs } from 'dayjs';

import {
  allTlfbSagas,
  addNewTlfbEventRequest,
  tlfbReducer,
  makeSelectTlfbDays,
  editEventNameRequest,
  makeSelectTlfbLoader,
  deleteEventRequest,
  fetchCalendarDataRequest,
  makeSelectTlfbError,
  tlfbReducerKey,
} from 'global/reducers/tlfb';
import { TlfbEventsWithConfigDto as TlfbEventsWithConfig } from 'models/Question';
import { fullDayToYearFormatter } from 'utils/formatters';

import { colors, themeColors } from 'theme';
import EventInput from 'components/EventInput';
import Box from 'components/Box';
import Text from 'components/Text';
import PlusCircle from 'components/Circle/PlusCircle';
import Spinner from 'components/Spinner';
import ErrorAlert from 'components/ErrorAlert';
import Divider from 'components/Divider';
import Button from 'components/Button';
import { PopoverModal } from 'components/Modal';
import Column from 'components/Column';
import H2 from 'components/H2';
import { MONTH_SELECTOR_ID } from 'components/Calendar/constants';
import { ANSWER_SESSION_CONTAINER_ID } from 'containers/App/constants';

import { SharedProps } from './sharedProps';
import messages from '../messages';
import TlfbCalendarLayout from '../layouts/TlfbCalendarLayout';
import { getCalendarMetadata } from '../utils';

const TlfbEvents = ({
  question,
  isMobilePreview,
  isMobile,
  userSessionId,
}: SharedProps<TlfbEventsWithConfig>) => {
  const dispatch = useDispatch();
  const tlfbDaysData = useSelector(makeSelectTlfbDays());
  const createEventLoading = useSelector(makeSelectTlfbLoader('createEvent'));

  const [modalOpenId, setModalOpenId] = useState<string>('');

  const fetchCalendarDataLoader = useSelector(
    makeSelectTlfbLoader('fetchCalendarData'),
  );
  const fetchCalendarDataError = useSelector(
    makeSelectTlfbError('fetchCalendarData'),
  );

  const { formatMessage } = useIntl();

  const {
    body: {
      config,
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

  const { isMultiMonth } = useMemo(
    () => getCalendarMetadata(config, tlfbDaysData),
    [config, tlfbDaysData],
  );

  useEffect(() => {
    if (isMultiMonth) {
      setModalOpenId(MONTH_SELECTOR_ID);
    }
  }, []);

  const [selectedDay, setSelectedDay] = useState<Dayjs>();

  const closeModal = () => setSelectedDay(undefined);

  const dayId = selectedDay
    ? selectedDay.format(fullDayToYearFormatter)
    : undefined;

  useEffect(() => {
    if (userSessionId) {
      dispatch(fetchCalendarDataRequest(userSessionId, questionGroupId));
    }
  }, []);

  const addTlfbEvent = () => {
    if (userSessionId && dayId) {
      dispatch(addNewTlfbEventRequest(questionGroupId, userSessionId, dayId));
    }
  };

  const updateEventName = (newName: string, id: number) => {
    if (dayId) {
      dispatch(editEventNameRequest(id, newName, dayId));
    }
  };

  const onModalClose = () => {
    setModalOpenId('');
  };

  const selectedDayEvents = useMemo(() => {
    if (!dayId) return [];
    return tlfbDaysData[dayId]?.events || [];
  }, [dayId, tlfbDaysData]);

  const addFirstTlfbEventForDay = () => {
    if (dayId && !selectedDayEvents.length) {
      addTlfbEvent();
    }
  };

  useEffect(() => {
    addFirstTlfbEventForDay();
  }, [dayId]);

  const deleteEvent = (id: number) => () => {
    if (dayId) {
      dispatch(deleteEventRequest(id, dayId));
    }
  };

  if (fetchCalendarDataError) {
    return (
      <ErrorAlert errorText={formatMessage(messages.tlfbDataError)} fullPage />
    );
  }

  return (
    <>
      <TlfbCalendarLayout
        title={screenTitle}
        subtitle={screenQuestion}
        tlfbConfig={config}
        isMobile={isMobile}
        isMobilePreview={isMobilePreview}
        onSelectDay={setSelectedDay}
        selectedDay={selectedDay}
        dayId={dayId}
        calendarData={tlfbDaysData}
        isLoading={fetchCalendarDataLoader}
        hideHelpingMaterials
      >
        <>
          {(isMobile || isMobilePreview) && <Divider mb={24} mt={16} />}
          <Box display="flex" direction="column" gap={16}>
            {selectedDayEvents.map(({ name, id }) => (
              <EventInput
                onDelete={deleteEvent(id)}
                onInputBlur={(value: string) => updateEventName(value, id)}
                eventName={name}
                key={`event-input-${id}`}
              />
            ))}
          </Box>
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
            mt={selectedDayEvents.length ? 24 : 0}
          >
            <PlusCircle size="24px" />
            <Text ml={10} color={themeColors.secondary}>
              <FormattedMessage {...messages.addEvent} />
            </Text>
          </Box>
          {(isMobile || isMobilePreview) && (
            <>
              <Divider my={24} />
              {/* @ts-ignore */}
              <Button onClick={closeModal} width="auto" px={32}>
                <FormattedMessage {...messages.saveEvents} />
              </Button>
            </>
          )}
        </>
      </TlfbCalendarLayout>

      <PopoverModal
        portalId={ANSWER_SESSION_CONTAINER_ID}
        referenceElement={modalOpenId}
        onClose={onModalClose}
        disableClose
        width="360px"
        modalStyle={{
          backgroundColor: colors.white,
          borderColor: 'transparent',
        }}
        forceDim
        excludeRefDim={{
          backgroundColor: colors.white,
          padding: '16px',
          borderRadius: '8px',
          margin: '-16px -16px 0px',
        }}
      >
        <Column>
          <H2 mb={10}>{formatMessage(messages.monthSelectorModalTitle)}</H2>

          <Text mb={24}>{formatMessage(messages.monthSelectorModalText)}</Text>

          <Button onClick={onModalClose}>
            {formatMessage(messages.monthSelectorModalButton)}
          </Button>
        </Column>
      </PopoverModal>
    </>
  );
};

export default compose(
  injectSaga({ key: 'addNewEvent', saga: allTlfbSagas }),
  // @ts-ignore
  injectReducer({ key: tlfbReducerKey, reducer: tlfbReducer }),
)(TlfbEvents);
