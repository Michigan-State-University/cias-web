import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import { RootState } from 'global/reducers';
import {
  makeSelectError,
  makeSelectLoader,
  makeSelectSelectedQuestion,
  makeSelectTlfbVariables,
} from 'global/reducers/questions';
import { TlfbQuestionDTO } from 'models/Question';
import globalMessages from 'global/i18n/globalMessages';

import Box from 'components/Box';
import Radio from 'components/Radio';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Row from 'components/Row';
import H2 from 'components/H2';
import Text from 'components/Text';
import { selectQuillText } from 'components/Input/utils';

import {
  UPDATE_QUESTION_TITLE,
  UPDATE_HEAD_QUESTION,
  UPDATE_SUBSTANCE_QUESTION,
} from './constants';
import { updateQuestion, updateSubstancesWithGroupToggle } from './actions';
import messages from './messages';

import UngroupedSubstances from './UngroupedSubstances';
import GroupedSubstances from './GroupedSubstances';

export type TlfbQuestionProps = {
  editingPossible: boolean;
};

const TlfbQuestion = ({ editingPossible }: TlfbQuestionProps) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const currentQuestion = useSelector<RootState, TlfbQuestionDTO>(
    makeSelectSelectedQuestion(),
  );

  const error = useSelector<RootState, Nullable<string>>(
    makeSelectError('updateQuestionError'),
  );

  const isLoading = useSelector<RootState, boolean>(
    makeSelectLoader('updateQuestionLoading'),
  );

  const tlfbVariables = useSelector<RootState, string[]>(
    makeSelectTlfbVariables(),
  );

  const onUpdateQuestion = (type: string) => (value: string) =>
    dispatch(updateQuestion(value, type));

  const onUpdateSubstancesWithGroupToggle = (option: boolean) => () =>
    dispatch(updateSubstancesWithGroupToggle(option, tlfbVariables));

  const {
    body: {
      data: [
        {
          payload: {
            question_title: questionTitle,
            head_question: headQuestion,
            substance_question: substanceQuestion,
            substances_with_group: substancesWithGroup,
            substances,
            substance_groups: substanceGroups,
          },
          original_text: originalText,
        },
      ],
    },
  } = currentQuestion;

  return (
    <Box py={32} px={17} width="100%">
      <Row>
        <H2>{formatMessage(messages.title)}</H2>
        <H2 color={themeColors.warning}>*</H2>
      </Row>
      <Row my={24}>
        <LabelledApprovableInput
          label={formatMessage(messages.questionTitle)}
          placeholder={formatMessage(messages.questionTitlePlaceholder)}
          value={questionTitle}
          type="multiline"
          onCheck={onUpdateQuestion(UPDATE_QUESTION_TITLE)}
          onFocus={selectQuillText}
          id="question-title"
          transparent={false}
          disabled={!editingPossible}
          richText
          richTextBlurTransparentBorder={false}
          autoSize
          originalTextHover={originalText?.question_title}
        />
      </Row>

      <Row mb={24}>
        <LabelledApprovableInput
          label={formatMessage(messages.headTitle)}
          placeholder={formatMessage(messages.headTitlePlaceholder)}
          value={headQuestion}
          type="multiline"
          onCheck={onUpdateQuestion(UPDATE_HEAD_QUESTION)}
          onFocus={selectQuillText}
          id="head-question"
          transparent={false}
          disabled={!editingPossible}
          richText
          richTextBlurTransparentBorder={false}
          autoSize
          originalTextHover={originalText?.head_question}
        />
      </Row>

      <Row>
        <LabelledApprovableInput
          label={formatMessage(messages.substanceTitle)}
          placeholder={formatMessage(messages.substanceTitlePlaceholder)}
          value={substanceQuestion}
          type="multiline"
          onCheck={onUpdateQuestion(UPDATE_SUBSTANCE_QUESTION)}
          onFocus={selectQuillText}
          id="substance-question"
          transparent={false}
          disabled={!editingPossible}
          richText
          richTextBlurTransparentBorder={false}
          autoSize
          originalTextHover={originalText?.substance_question}
        />
      </Row>

      <Row mt={31} mb={24}>
        <H2>{formatMessage(messages.substancesTitle)}</H2>
      </Row>

      <Row mb={24}>
        <Box mr={24}>
          <Radio
            id="yes-subtances-with-groups-radio"
            checked={substancesWithGroup}
            onChange={onUpdateSubstancesWithGroupToggle(true)}
            disabled={!editingPossible}
          >
            <Text>{formatMessage(globalMessages.yes)}</Text>
          </Radio>
        </Box>
        <Box>
          <Radio
            id="no-subtances-with-groups-radio"
            checked={!substancesWithGroup}
            onChange={onUpdateSubstancesWithGroupToggle(false)}
            disabled={!editingPossible}
          >
            <Text>{formatMessage(globalMessages.no)}</Text>
          </Radio>
        </Box>
      </Row>

      {substancesWithGroup && (
        <GroupedSubstances
          originalText={originalText?.substance_groups}
          substanceGroups={substanceGroups}
          loading={isLoading}
          error={error ?? ''}
          disabled={!editingPossible}
        />
      )}

      {!substancesWithGroup && (
        <UngroupedSubstances
          originalText={originalText?.substances}
          substances={substances}
          loading={isLoading}
          error={error ?? ''}
          disabled={!editingPossible}
        />
      )}
    </Box>
  );
};

export default TlfbQuestion;
