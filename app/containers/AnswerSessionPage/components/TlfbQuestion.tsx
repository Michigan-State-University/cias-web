import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Dayjs } from 'dayjs';

import { TlfbQuestionWithConfigDTO as TlfbQuestionWithConfig } from 'models/Question';
import globalMessages from 'global/i18n/globalMessages';
import { fullDayToYearFormatter } from 'utils/formatters';

import Text from 'components/Text';
import Radio from 'components/Radio';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import Circle from 'components/Circle';
import { CalendarRef } from 'components/Calendar/types';

import {
  addNewTlfbSubstance,
  allTlfbSagas,
  editTlfbSubstance,
  fetchCalendarDataRequest,
  makeSelectTlfbDays,
  makeSelectTlfbError,
  makeSelectTlfbLoader,
  tlfbReducer,
} from 'global/reducers/tlfb';

import { colors } from 'theme';
import { SharedProps } from './sharedProps';
import messages from '../messages';
import TlfbCalendarLayout from '../layouts/TlfbCalendarLayout';
import { getCalendarMetadata } from '../utils';
import { useDayByDayHandler } from '../useDayByDayHandler';

const TlfbQuestion = ({
  question,
  isMobile,
  isDesktop,
  isMobilePreview,
  userSessionId,
}: SharedProps<TlfbQuestionWithConfig>) => {
  const calendarRef = useRef<CalendarRef>({ setMonth: () => {} });

  const [selectedDay, setSelectedDay] = useState<Dayjs>();
  const dayId = selectedDay
    ? selectedDay.format(fullDayToYearFormatter)
    : undefined;

  const closeModal = () => setSelectedDay(undefined);

  const tlfbDaysData = useSelector(makeSelectTlfbDays());
  const calendarDataLoading = useSelector(
    makeSelectTlfbLoader('fetchCalendarData'),
  );
  const newSubstanceLoading = useSelector(
    makeSelectTlfbLoader('createSubstance'),
  );
  const editSubstanceLoading = useSelector(
    makeSelectTlfbLoader('editSubstance'),
  );
  const fetchCalendarDataError = useSelector(
    makeSelectTlfbError('fetchCalendarData'),
  );

  const isSubstanceLoading = newSubstanceLoading || editSubstanceLoading;

  const { formatMessage } = useIntl();

  const selectedDaySubstance = useMemo(() => {
    if (!dayId) return undefined;
    return tlfbDaysData[dayId]?.substance;
  }, [dayId, tlfbDaysData]);

  const selectedDayEvents = useMemo(() => {
    if (!dayId) return undefined;
    return tlfbDaysData[dayId]?.events;
  }, [dayId, tlfbDaysData]);

  const canGoToNextDay = useMemo(
    () => (dayId ?? '') in tlfbDaysData,
    [dayId, tlfbDaysData],
  );

  const dispatch = useDispatch();

  const {
    body: {
      config,
      data: [
        {
          payload: {
            head_question: headQuestion,
            question_title: questionTitle,
            substance_question: substanceQuestion,
          },
        },
      ],
    },
    question_group_id: questionGroupId,
  } = question;

  const { isEverythingFilled, oldestAllowedDate } = useMemo(
    () => getCalendarMetadata(config, tlfbDaysData),
    [config, tlfbDaysData],
  );
  const isLastDaySelected =
    selectedDay?.isSame(oldestAllowedDate, 'day') ?? false;
  const isGoToNextDayDisabled = isLastDaySelected || isEverythingFilled;

  useEffect(() => {
    if (userSessionId) {
      dispatch(fetchCalendarDataRequest(userSessionId, questionGroupId));
    }
  }, []);

  const { goToNextDay } = useDayByDayHandler({
    calendarData: tlfbDaysData,
    tlfbConfig: config,
    selectDay: setSelectedDay,
    selectedDay,
    // error to prevent opening modal when error happens
    isLoading: calendarDataLoading || fetchCalendarDataError,
    changeMonth: calendarRef.current.setMonth,
  });

  const changeSelectedDaySubstances =
    (value: boolean) => (_: boolean, event: ChangeEvent) => {
      if (!dayId || !userSessionId) return;

      // prevent outside click detection (due to spinner)
      event.stopPropagation();

      if (selectedDaySubstance) {
        dispatch(
          editTlfbSubstance(
            dayId,
            { substancesConsumed: value },
            selectedDaySubstance.id,
          ),
        );
      } else {
        dispatch(
          addNewTlfbSubstance(dayId, userSessionId, questionGroupId, {
            substancesConsumed: value,
          }),
        );
      }
    };

  if (fetchCalendarDataError) {
    return (
      <ErrorAlert errorText={formatMessage(messages.tlfbDataError)} fullPage />
    );
  }

  const listEvents = Boolean(selectedDayEvents?.length);

  return (
    <TlfbCalendarLayout
      ref={calendarRef}
      bigText={headQuestion}
      smallText={questionTitle}
      isMobile={isMobile}
      isMobilePreview={isMobilePreview}
      tlfbConfig={config}
      onSelectDay={setSelectedDay}
      selectedDay={selectedDay}
      dayId={dayId}
      calendarData={tlfbDaysData}
      disableModalClose={!isEverythingFilled}
      isLoading={calendarDataLoading}
    >
      {(!isDesktop || isMobilePreview) && (
        <>
          {listEvents && (
            <Box
              mt={isMobile || isMobilePreview ? 15 : 0}
              display="inline-flex"
              flexWrap="wrap"
              gap="15px"
            >
              {selectedDayEvents?.map(({ name, id }) => (
                <Box key={id} display="flex" align="center">
                  {/* @ts-ignore */}
                  <Circle bg={colors.azureBlue} size="5px" doNotShrink />
                  <Text ml={5}>{name}</Text>
                </Box>
              ))}
            </Box>
          )}
          {(isMobile || isMobilePreview || listEvents) && (
            <Divider mb={24} mt={16} />
          )}
        </>
      )}
      <Text fontWeight="bold" fontSize={16}>
        {substanceQuestion}
      </Text>
      <Box my={25} display="flex">
        <Radio
          id="yes-option"
          disabled={isSubstanceLoading}
          onChange={changeSelectedDaySubstances(true)}
          checked={selectedDaySubstance?.body.substancesConsumed === true}
        >
          <Text mr={32}>
            <FormattedMessage {...globalMessages.yes} />
          </Text>
        </Radio>
        <Radio
          id="no-option"
          disabled={isSubstanceLoading}
          onChange={changeSelectedDaySubstances(false)}
          checked={selectedDaySubstance?.body.substancesConsumed === false}
        >
          <Text>
            <FormattedMessage {...globalMessages.no} />
          </Text>
        </Radio>
      </Box>
      <Divider mb={25} />
      {/* @ts-ignore */}
      <Button
        onClick={isGoToNextDayDisabled ? closeModal : goToNextDay}
        disabled={!canGoToNextDay}
        loading={isSubstanceLoading}
        width="auto"
        px={30}
      >
        <FormattedMessage
          {...(isGoToNextDayDisabled
            ? messages.saveSubstance
            : messages.goToNextDay)}
        />
      </Button>
    </TlfbCalendarLayout>
  );
};

export default compose(
  injectSaga({ key: 'addNewEvent', saga: allTlfbSagas }),
  // @ts-ignore
  injectReducer({ key: 'tlfbReducer', reducer: tlfbReducer }),
)(TlfbQuestion);
