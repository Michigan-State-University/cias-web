import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import { RootState } from 'global/reducers';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import { TlfbEventsDTO } from 'models/Question';

import Box from 'components/Box';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Row from 'components/Row';
import H2 from 'components/H2';
import { selectQuillText } from 'components/Input/utils';

import { UPDATE_SCREEN_QUESTION, UPDATE_SCREEN_TITLE } from './constants';
import messages from './messages';

export type TlfbEventsProps = {
  editingPossible: boolean;
};

const TlfbEvents = ({ editingPossible }: TlfbEventsProps) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector<RootState, TlfbEventsDTO>(
    makeSelectSelectedQuestion(),
  );

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
          original_text: originalText,
        },
      ],
    },
  } = currentQuestion;
  const { formatMessage } = useIntl();
  return (
    <Box py={32} px={17} width="100%">
      <Row>
        <H2>{formatMessage(messages.title)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <Row my={24}>
        <LabelledApprovableInput
          label={formatMessage(messages.eventsScreenTitle)}
          placeholder={formatMessage(messages.eventsScreenTitlePlaceholder)}
          value={screenTitle}
          type="multiline"
          onCheck={updateEventQuestionData(UPDATE_SCREEN_TITLE)}
          onFocus={selectQuillText}
          id="events-screen-title"
          transparent={false}
          disabled={!editingPossible}
          richText
          richTextBlurTransparentBorder={false}
          autoSize
          originalTextHover={originalText?.screen_title}
        />
      </Row>

      <LabelledApprovableInput
        label={formatMessage(messages.eventsScreenQuestion)}
        placeholder={formatMessage(messages.eventsScreenQuestionPlaceholder)}
        value={screenQuestion}
        type="multiline"
        onCheck={updateEventQuestionData(UPDATE_SCREEN_QUESTION)}
        onFocus={selectQuillText}
        id="events-screen-questions"
        transparent={false}
        disabled={!editingPossible}
        richText
        richTextBlurTransparentBorder={false}
        autoSize
        originalTextHover={originalText?.screen_question}
      />
    </Box>
  );
};

export default TlfbEvents;
