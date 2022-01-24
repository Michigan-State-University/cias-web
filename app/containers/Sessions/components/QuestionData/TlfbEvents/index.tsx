import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import Box from 'components/Box';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Row from 'components/Row';
import H2 from 'components/H2';

import { themeColors } from 'theme';
import { UPDATE_SCREEN_QUESTION, UPDATE_SCREEN_TITLE } from './constants';
import messages from './messages';

const TlfbEvents = () => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector(makeSelectSelectedQuestion());

  const dispatchAction = (action: any) => dispatch(updateQuestionData(action));

  const updateEventQuestionData = (type: string) => (value: string) =>
    dispatchAction({ type, data: { value } });

  const {
    body: {
      data: [
        {
          payload: {
            screen_title: screenTitle,
            screen_question: screenQuestion,
          },
        },
      ],
    },
  } = currentQuestion;
  const { formatMessage } = useIntl();
  return (
    <Box padding={32} width="100%">
      <Row>
        <H2>{formatMessage(messages.title)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <Row my={24}>
        <LabelledApprovableInput
          label={formatMessage(messages.eventsScreenTitle)}
          placeholder={formatMessage(messages.eventsScreenTitlePlaceholder)}
          value={screenTitle}
          type="singleline"
          onCheck={updateEventQuestionData(UPDATE_SCREEN_TITLE)}
          id="events-screen-title"
          transparent={false}
          height={48}
        />
      </Row>

      <LabelledApprovableInput
        label={formatMessage(messages.eventsScreenQuestion)}
        placeholder={formatMessage(messages.eventsScreenQuestionPlaceholder)}
        value={screenQuestion}
        type="singleline"
        onCheck={updateEventQuestionData(UPDATE_SCREEN_QUESTION)}
        id="events-screen-questions"
        transparent={false}
        height={48}
      />
    </Box>
  );
};

export default TlfbEvents;
