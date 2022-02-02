import React, { useMemo, useState } from 'react';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import {
  allTlfbSagas,
  addNewTlfbEvent,
  tlfbReducer,
  makeSelectTlfbDays,
  editEventName,
  makeSelectTlfbLoader,
} from 'global/reducers/tlfb';
import { TlfbEventsWithConfigDto as TlfbEventsWithConfig } from 'models/Question';

import { themeColors } from 'theme';
import EventCollapse from 'components/EventCollapse';
import Box from 'components/Box';
import Text from 'components/Text';
import PlusCircle from 'components/Circle/PlusCircle';
import Spinner from 'components/Spinner';

import { SharedProps } from './sharedProps';
import messages from '../messages';
import TlfbCalendarLayout from '../layouts/TlfbCalendarLayout';

const TlfbEvents = ({
  question,
  isMobilePreview,
  isMobile,
  userSessionId,
}: SharedProps<TlfbEventsWithConfig>) => {
  const dispatch = useDispatch();
  const tlfbDaysData = useSelector(makeSelectTlfbDays());
  const createEventLoading = useSelector(makeSelectTlfbLoader('createEvent'));

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

  const [dayId, setDayId] = useState<string | undefined>(undefined);

  const addTlfbEvent = () => {
    if (userSessionId && dayId) {
      dispatch(addNewTlfbEvent(questionGroupId, userSessionId, dayId));
    }
  };

  const updateEventName = (newName: string, id: number) => {
    if (dayId) {
      dispatch(editEventName(id, newName, dayId));
    }
  };

  const selectedDayEvents = useMemo(() => {
    if (!dayId) return [];
    return tlfbDaysData[dayId]?.events || [];
  }, [dayId, tlfbDaysData]);

  return (
    <TlfbCalendarLayout
      smallText={screenTitle}
      bigText={screenQuestion}
      tlfbConfig={config}
      isMobile={isMobile}
      isMobilePreview={isMobilePreview}
      setDayId={setDayId}
    >
      <>
        {selectedDayEvents.map(({ name, id }, index) => (
          <Box mb={16} key={`event-collapsable-${id}`}>
            <EventCollapse
              onInputBlur={(value: string) => updateEventName(value, id)}
              title={`Event ${index + 1}`}
              eventName={name}
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
    </TlfbCalendarLayout>
  );
};

export default compose(
  injectSaga({ key: 'addNewEvent', saga: allTlfbSagas }),
  // @ts-ignore
  injectReducer({ key: 'tlfbReducer', reducer: tlfbReducer }),
)(TlfbEvents);
