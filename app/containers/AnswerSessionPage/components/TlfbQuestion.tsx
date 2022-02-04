import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';

import { TlfbQuestionWithConfigDTO as TlfbQuestionWithConfig } from 'models/Question';
import globalMessages from 'global/i18n/globalMessages';

import Text from 'components/Text';
import Radio from 'components/Radio';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Button from 'components/Button';

import {
  addNewTlfbSubstance,
  allTlfbSagas,
  editTlfbSubstance,
  makeSelectTlfbDays,
  makeSelectTlfbLoader,
  tlfbReducer,
} from 'global/reducers/tlfb';
import Spinner from 'components/Spinner';
import { themeColors } from 'theme';
import { SharedProps } from './sharedProps';
import messages from '../messages';
import TlfbCalendarLayout from '../layouts/TlfbCalendarLayout';

const TlfbQuestion = ({
  question,
  isMobile,
  isMobilePreview,
  userSessionId,
}: SharedProps<TlfbQuestionWithConfig>) => {
  const [dayId, setDayId] = useState<string | undefined>(undefined);

  const tlfbDaysData = useSelector(makeSelectTlfbDays());
  const newSubstanceLoading = useSelector(
    makeSelectTlfbLoader('createSubstance'),
  );

  const selectedDaySubstances = useMemo(() => {
    if (!dayId) return undefined;
    return tlfbDaysData[dayId]?.substance;
  }, [dayId, tlfbDaysData]);

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

  useEffect(() => {
    if (dayId && !selectedDaySubstances && userSessionId) {
      dispatch(addNewTlfbSubstance(dayId, userSessionId, questionGroupId));
    }
  }, [dayId, selectedDaySubstances]);

  const changeSelectedDaySubstances = (value: boolean) => () => {
    if (dayId && selectedDaySubstances) {
      dispatch(
        editTlfbSubstance(
          dayId,
          { substancesConsumed: value },
          selectedDaySubstances.id,
        ),
      );
    }
  };

  return (
    <TlfbCalendarLayout
      bigText={headQuestion}
      smallText={questionTitle}
      isMobile={isMobile}
      isMobilePreview={isMobilePreview}
      tlfbConfig={config}
      setDayId={setDayId}
    >
      {newSubstanceLoading && (
        <Box mx="auto">
          <Spinner color={themeColors.secondary} />
        </Box>
      )}
      {!newSubstanceLoading && (
        <>
          <Text fontWeight="bold" fontSize={16}>
            {substanceQuestion}
          </Text>
          <Box my={25} display="flex">
            <Radio
              id="yes-option"
              onChange={changeSelectedDaySubstances(true)}
              checked={selectedDaySubstances?.body.substancesConsumed === true}
            >
              <Text mr={32}>
                <FormattedMessage {...globalMessages.yes} />
              </Text>
            </Radio>
            <Radio
              id="no-option"
              onChange={changeSelectedDaySubstances(false)}
              checked={!selectedDaySubstances?.body.substancesConsumed}
            >
              <Text>
                <FormattedMessage {...globalMessages.no} />
              </Text>
            </Radio>
          </Box>
          <Divider mb={25} />
          {/* @ts-ignore */}
          <Button width="auto" px={30}>
            <FormattedMessage {...messages.goToNextDay} />
          </Button>
        </>
      )}
    </TlfbCalendarLayout>
  );
};

export default compose(
  injectSaga({ key: 'addNewEvent', saga: allTlfbSagas }),
  // @ts-ignore
  injectReducer({ key: 'tlfbReducer', reducer: tlfbReducer }),
)(TlfbQuestion);
