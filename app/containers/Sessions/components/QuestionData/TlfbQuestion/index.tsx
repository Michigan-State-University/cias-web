import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import isNil from 'lodash/isNil';

import { themeColors } from 'theme';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';
import { TlfbQuestionDTO, Substance } from 'models/Question';
import globalMessages from 'global/i18n/globalMessages';

import Box from 'components/Box';
import Radio from 'components/Radio';
import HoverableBox from 'components/Box/HoverableBox';
import LabelledApprovableInput from 'components/Input/LabelledApprovableInput';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import H2 from 'components/H2';
import Text from 'components/Text';
import BoxTable from 'components/BoxTable';

import {
  UPDATE_QUESTION_TITLE,
  UPDATE_HEAD_QUESTION,
  UPDATE_SUBSTANCE_QUESTION,
} from './constants';
import {
  updateQuestion,
  updateSubstancesWithGroupToggle,
  addSubstance,
  removeSubstance,
  editSubstance,
} from './actions';
import messages from './messages';
import NewSubstanceModal from './NewSubstanceModal';

const TlfbQuestion = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const currentQuestion = useSelector<unknown, TlfbQuestionDTO>(
    makeSelectSelectedQuestion(),
  );
  const [isSubstanceModalVisible, setIsSubstanceModalVisible] = useState(false);
  const [activeSubstanceIndex, setactiveSubstanceIndex] =
    useState<Nullable<number>>(null);
  const isEditMode = !isNil(activeSubstanceIndex);

  const openModal = () => setIsSubstanceModalVisible(true);
  const closeModal = () => {
    setIsSubstanceModalVisible(false);
    setactiveSubstanceIndex(null);
  };

  const onUpdateQuestion = (type: string) => (value: string) =>
    dispatch(updateQuestion(value, type));

  const onUpdateSubstancesWithGroupToggle = (option: boolean) => () =>
    dispatch(updateSubstancesWithGroupToggle(option));

  const onAddSubstance = (substance: Substance) =>
    dispatch(addSubstance(substance));

  const onRemoveSubstance = (substanceIndex: number) =>
    dispatch(removeSubstance(substanceIndex));

  const onEditSubstance = (substanceIndex: number) => {
    setactiveSubstanceIndex(substanceIndex);
    openModal();
  };

  const handleEditSubstance = (substance: Substance) => {
    if (!isNil(activeSubstanceIndex)) {
      dispatch(editSubstance(activeSubstanceIndex, substance));
    }
  };

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
          >
            <Text>{formatMessage(globalMessages.yes)}</Text>
          </Radio>
        </Box>
        <Box>
          <Radio
            id="no-subtances-with-groups-radio"
            checked={!substancesWithGroup}
            onChange={onUpdateSubstancesWithGroupToggle(false)}
          >
            <Text>{formatMessage(globalMessages.no)}</Text>
          </Radio>
        </Box>
      </Row>

      {!substancesWithGroup && (
        <BoxTable
          data={substances}
          badgeKeys={['variable']}
          onRowDelete={onRemoveSubstance}
          onRowEdit={onEditSubstance}
        />
      )}

      <Row>
        <HoverableBox px={8} py={8} ml={-8} onClick={openModal}>
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

      <NewSubstanceModal
        substance={isEditMode ? substances[activeSubstanceIndex] : undefined}
        visible={isSubstanceModalVisible}
        onClose={closeModal}
        loading={false}
        editMode={isEditMode}
        onSubmitForm={isEditMode ? handleEditSubstance : onAddSubstance}
        grouped={substancesWithGroup}
      />
    </Box>
  );
};

export default TlfbQuestion;
