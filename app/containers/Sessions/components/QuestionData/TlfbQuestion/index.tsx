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
import { InterventionStatusMetadata } from 'models/Intervention';

import Box from 'components/Box';
import Radio from 'components/Radio';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import Row from 'components/Row';
import H2 from 'components/H2';
import Text from 'components/Text';

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
  statusMetadata: InterventionStatusMetadata;
};

const TlfbQuestion = ({
  statusMetadata: { isEditable },
}: TlfbQuestionProps) => {
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
          type="singleline"
          onCheck={onUpdateQuestion(UPDATE_QUESTION_TITLE)}
          id="question-title"
          transparent={false}
          height={48}
          disabled={!isEditable}
        />
      </Row>

      <Row mb={24}>
        <LabelledApprovableInput
          label={formatMessage(messages.headTitle)}
          placeholder={formatMessage(messages.headTitlePlaceholder)}
          value={headQuestion}
          type="singleline"
          onCheck={onUpdateQuestion(UPDATE_HEAD_QUESTION)}
          id="head-question"
          transparent={false}
          height={48}
          disabled={!isEditable}
        />
      </Row>

      <Row>
        <LabelledApprovableInput
          label={formatMessage(messages.substanceTitle)}
          placeholder={formatMessage(messages.substanceTitlePlaceholder)}
          value={substanceQuestion}
          type="singleline"
          onCheck={onUpdateQuestion(UPDATE_SUBSTANCE_QUESTION)}
          id="substance-question"
          transparent={false}
          height={48}
          disabled={!isEditable}
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
            disabled={!isEditable}
          >
            <Text>{formatMessage(globalMessages.yes)}</Text>
          </Radio>
        </Box>
        <Box>
          <Radio
            id="no-subtances-with-groups-radio"
            checked={!substancesWithGroup}
            onChange={onUpdateSubstancesWithGroupToggle(false)}
            disabled={!isEditable}
          >
            <Text>{formatMessage(globalMessages.no)}</Text>
          </Radio>
        </Box>
      </Row>

      {substancesWithGroup && (
        <GroupedSubstances
          substanceGroups={substanceGroups}
          loading={isLoading}
          error={error ?? ''}
          disabled={!isEditable}
        />
      )}

      {!substancesWithGroup && (
        <UngroupedSubstances
          substances={substances}
          loading={isLoading}
          error={error ?? ''}
          disabled={!isEditable}
        />
      )}
    </Box>
  );
};

export default TlfbQuestion;