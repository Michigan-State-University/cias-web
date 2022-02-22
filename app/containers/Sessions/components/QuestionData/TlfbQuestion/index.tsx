import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import { TlfbQuestionDTO } from 'models/Question';

import Box from 'components/Box';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import H2 from 'components/H2';
import Text from 'components/Text';

import {
  UPDATE_QUESTION_TITLE,
  UPDATE_HEAD_QUESTION,
  UPDATE_SUBSTANCE_QUESTION,
} from './constants';
import messages from './messages';

const TlfbQuestion = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const currentQuestion = useSelector<unknown, TlfbQuestionDTO>(
    makeSelectSelectedQuestion(),
  );
  const [isSubstancesWithGroups, setIsSubstancesWithGroups] = useState(true);

  const dispatchAction = (action: any) => dispatch(updateQuestionData(action));

  const onUpdate = (type: string) => (value: string) =>
    dispatchAction({ type, data: { value } });

  const {
    body: {
      data: [
        {
          payload: {
            question_title: questionTitle,
            head_question: headQuestion,
            substance_question: substanceQuestion,
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
          onCheck={onUpdate(UPDATE_QUESTION_TITLE)}
          id="question-title"
          transparent={false}
          height={48}
        />
      </Row>

      <Row mb={24}>
        <LabelledApprovableInput
          label={formatMessage(messages.headTitle)}
          placeholder={formatMessage(messages.headTitlePlaceholder)}
          value={headQuestion}
          type="singleline"
          onCheck={onUpdate(UPDATE_HEAD_QUESTION)}
          id="head-question"
          transparent={false}
          height={48}
        />
      </Row>

      <Row>
        <LabelledApprovableInput
          label={formatMessage(messages.substanceTitle)}
          placeholder={formatMessage(messages.substanceTitlePlaceholder)}
          value={substanceQuestion}
          type="singleline"
          onCheck={onUpdate(UPDATE_SUBSTANCE_QUESTION)}
          id="substance-question"
          transparent={false}
          height={48}
        />
      </Row>

      <Row mt={31} mb={24}>
        <H2>{formatMessage(messages.substancesTitle)}</H2>
      </Row>

      <Row mb={24}>
        <Box mr={24}>
          <Radio
            id="yes-subtances-with-groups-radio"
            checked={isSubstancesWithGroups}
            onChange={(state) => setIsSubstancesWithGroups(state)}
          >
            <Text>{formatMessage(messages.yes)}</Text>
          </Radio>
        </Box>
        <Box>
          <Radio
            id="no-subtances-with-groups-radio"
            checked={!isSubstancesWithGroups}
            onChange={(state) => setIsSubstancesWithGroups(!state)}
          >
            <Text>{formatMessage(messages.no)}</Text>
          </Radio>
        </Box>
      </Row>

      <Row>
        <HoverableBox px={8} py={8} ml={-8} onClick={() => {}}>
          <Box>
            <Row align="center">
              <PlusCircle mr={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addNewSubstance)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>
    </Box>
  );
};

export default TlfbQuestion;
