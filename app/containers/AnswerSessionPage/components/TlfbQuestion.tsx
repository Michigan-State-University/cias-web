import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Dayjs } from 'dayjs';
import { Markup } from 'interweave';

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
import { SharedProps } from '../types';
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
  disabled,
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

  const {
    data: [
      {
        payload: { display_helping_materials: displayHelpingMaterials },
      },
    ],
  } = config;

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

  const totalSubstanceLength = useMemo(
    () =>
      substanceGroups.reduce((sum, group) => sum + group.substances.length, 0),
    [substanceGroups],
  );

  const canGoToNextDay = useMemo(() => {
    if (!answerBody) return false;

    const { substancesConsumed, consumptions } = answerBody;

    if (substancesWithGroup) {
      if (!substancesConsumed) return true;
      if (!substanceGroups.length) return true;
      if (!substanceGroups.some((group) => group.substances.length)) {
        return true;
      }

      return (
        !!consumptions?.length &&
        consumptions.length === totalSubstanceLength &&
        consumptions.every(({ amount }) => Boolean(amount))
      );
    }

    if (!substances.length) return true;

    return consumptions?.length === substances.length;
  }, [answerBody]);

  const orderedGroupNames = useMemo(
    () => [...substanceGroups, ...substances].map(({ name }) => name),
    [substancesWithGroup, substances],
  );

  const { isEveryAnswerFilled, startDate } = useMemo(
    () => getCalendarMetadata(config, tlfbDaysData),
    [config, tlfbDaysData],
  );
  const isLastDaySelected = selectedDay?.isSame(startDate, 'day') ?? false;
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
      subtitle={headQuestion}
      title={questionTitle}
      isMobile={isMobile}
      isMobilePreview={isMobilePreview}
      tlfbConfig={config}
      onSelectDay={setSelectedDay}
      selectedDay={selectedDay}
      dayId={dayId}
      calendarData={tlfbDaysData}
      disableModalClose={!isEveryAnswerFilled}
      isLoading={calendarDataLoading}
      hideHelpingMaterials={!displayHelpingMaterials}
      orderedGroupNames={orderedGroupNames}
    >
      {(!isDesktop || isMobilePreview) && (
        <>
          {listEvents && (
            <Box
              marginBlockStart={isMobile || isMobilePreview ? 15 : 0}
              display="inline-flex"
              flexWrap="wrap"
              gap="15px"
              dir="auto"
              width="100%"
            >
              {selectedDayEvents?.map(({ name, id }) => (
                <Box key={id} display="flex" align="center">
                  {/* @ts-ignore */}
                  <Circle bg={colors.azureBlue} size="5px" doNotShrink />
                  <Text marginInlineStart={5}>{name}</Text>
                </Box>
              ))}
            </Box>
          )}
          {(isMobile || isMobilePreview || listEvents) && (
            <Divider mb={24} mt={16} />
          )}
        </>
      )}
      <Box mb={8} dir="auto">
        <Markup content={substanceQuestion} />
      </Box>
      <TlfbConsumptionForm
        substances={substances}
        substanceGroups={substanceGroups}
        grouped={substancesWithGroup}
        loading={isAnswerLoading}
        answerBody={answerBody}
        onChange={setAnswerBody}
        mobile={isMobile}
        disabled={disabled}
      />
      <Divider mb={25} />
      {/* @ts-ignore */}
      <Row display="flex" justify="between" align="center" gap={8}>
        <Button
          onClick={saveAnswer}
          disabled={!canGoToNextDay || disabled}
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
        {displayHelpingMaterials && (isMobile || isMobilePreview) && (
          <TlfbHelpingMaterials mobile />
        )}
      </Row>
    </TlfbCalendarLayout>
  );
};

export default compose(
  injectSaga({ key: 'addNewEvent', saga: allTlfbSagas }),
  // @ts-ignore
  injectReducer({ key: tlfbReducerKey, reducer: tlfbReducer }),
)(TlfbQuestion);
