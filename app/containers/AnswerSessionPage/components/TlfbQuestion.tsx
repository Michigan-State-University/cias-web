import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Dayjs } from 'dayjs';

import { TlfbQuestionWithConfigDTO as TlfbQuestionWithConfig } from 'models/Question';
import { fullDayToYearFormatter } from 'utils/formatters';

import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import Circle from 'components/Circle';
import Row from 'components/Row';
import { CalendarRef } from 'components/Calendar/types';
import { TlfbConsumptionForm } from 'components/TlfbConsumptionForm';
import TlfbHelpingMaterials from 'components/TlfbHelpingMaterials';

import {
  addTlfbQuestionAnswerRequest,
  allTlfbSagas,
  editTlfbQuestionAnswerRequest,
  fetchCalendarDataRequest,
  makeSelectAnswerSavedSuccessfully,
  makeSelectTlfbDays,
  makeSelectTlfbError,
  makeSelectTlfbLoader,
  tlfbReducer,
  tlfbReducerKey,
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
  selectAnswer,
}: SharedProps<TlfbQuestionWithConfig, any>) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const calendarRef = useRef<CalendarRef>({
    setMonth: () => {},
  });

  const [selectedDay, setSelectedDay] = useState<Dayjs>();
  const dayId = selectedDay
    ? selectedDay.format(fullDayToYearFormatter)
    : undefined;

  const closeModal = () => setSelectedDay(undefined);

  const tlfbDaysData = useSelector(makeSelectTlfbDays());
  const calendarDataLoading = useSelector(
    makeSelectTlfbLoader('fetchCalendarData'),
  );
  const answerSavedSuccessfully = useSelector(
    makeSelectAnswerSavedSuccessfully(),
  );
  const newAnswerLoading = useSelector(
    makeSelectTlfbLoader('addTlfbQuestionAnswer'),
  );
  const editAnswerLoading = useSelector(
    makeSelectTlfbLoader('editTlfbQuestionAnswer'),
  );
  const fetchCalendarDataError = useSelector(
    makeSelectTlfbError('fetchCalendarData'),
  );

  const isAnswerLoading = newAnswerLoading || editAnswerLoading;

  const {
    body: {
      config,
      data: [
        {
          payload: {
            head_question: headQuestion,
            question_title: questionTitle,
            substance_question: substanceQuestion,
            substances,
            substance_groups: substanceGroups,
            substances_with_group: substancesWithGroup,
          },
        },
      ],
    },
    question_group_id: questionGroupId,
  } = question;

  const selectedDayEvents = useMemo(() => {
    if (!dayId) return undefined;
    return tlfbDaysData[dayId]?.events;
  }, [dayId, tlfbDaysData]);

  const selectedDayAnswer = useMemo(() => {
    if (!dayId) return undefined;
    return tlfbDaysData[dayId]?.answer;
  }, [dayId, tlfbDaysData]);

  useEffect(() => {
    setAnswerBody(selectedDayAnswer?.body);
  }, [selectedDayAnswer]);

  const [answerBody, setAnswerBody] = useState(selectedDayAnswer?.body);

  const canGoToNextDay = useMemo(() => {
    if (!answerBody) return false;

    const { substancesConsumed, consumptions } = answerBody;
    if (!substancesConsumed) return true;

    if (substancesWithGroup) {
      return (
        !!consumptions?.length &&
        consumptions.every(({ amount }) => Boolean(amount))
      );
    }

    return consumptions?.length === substances.length;
  }, [answerBody]);

  const { isEveryAnswerFilled, oldestAllowedDate } = useMemo(
    () => getCalendarMetadata(config, tlfbDaysData),
    [config, tlfbDaysData],
  );
  const isLastDaySelected =
    selectedDay?.isSame(oldestAllowedDate, 'day') ?? false;
  const isGoToNextDayDisabled = isLastDaySelected || isEveryAnswerFilled;

  useEffect(() => {
    if (userSessionId) {
      dispatch(fetchCalendarDataRequest(userSessionId, questionGroupId));
    }
  }, []);

  useEffect(() => {
    if (isEveryAnswerFilled) {
      selectAnswer([{}]);
    }
  }, [isEveryAnswerFilled]);

  const { goToNextDay } = useDayByDayHandler({
    calendarData: tlfbDaysData,
    tlfbConfig: config,
    selectDay: setSelectedDay,
    selectedDay,
    // error to prevent opening modal when error happens
    isLoading: calendarDataLoading || fetchCalendarDataError,
    changeMonth: calendarRef.current.setMonth,
  });

  useEffect(() => {
    if (!selectedDay || !answerSavedSuccessfully) return;
    if (isGoToNextDayDisabled) {
      closeModal();
      return;
    }
    goToNextDay();
  }, [answerSavedSuccessfully]);

  const saveAnswer = () => {
    if (!dayId || !userSessionId || !answerBody) return;

    if (selectedDayAnswer) {
      dispatch(
        editTlfbQuestionAnswerRequest(dayId, answerBody, selectedDayAnswer.id),
      );
    } else {
      dispatch(
        addTlfbQuestionAnswerRequest(
          dayId,
          userSessionId,
          questionGroupId,
          answerBody,
        ),
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
      disableModalClose={!isEveryAnswerFilled}
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
      <TlfbConsumptionForm
        substances={substances}
        substanceGroups={substanceGroups}
        grouped={substancesWithGroup}
        loading={isAnswerLoading}
        answerBody={answerBody}
        onChange={setAnswerBody}
        mobile={isMobile}
      />
      <Divider mb={25} />
      {/* @ts-ignore */}
      <Row display="flex" justify="between" align="center">
        <Button
          onClick={saveAnswer}
          disabled={!canGoToNextDay}
          loading={isAnswerLoading}
          width="auto"
          px={30}
        >
          <FormattedMessage
            {...(isGoToNextDayDisabled
              ? messages.saveAnswer
              : messages.goToNextDay)}
          />
        </Button>
        {(isMobile || isMobilePreview) && <TlfbHelpingMaterials />}
      </Row>
    </TlfbCalendarLayout>
  );
};

export default compose(
  injectSaga({ key: 'addNewEvent', saga: allTlfbSagas }),
  // @ts-ignore
  injectReducer({ key: tlfbReducerKey, reducer: tlfbReducer }),
)(TlfbQuestion);
