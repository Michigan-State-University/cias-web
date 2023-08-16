import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import values from 'lodash/values';
import { IntlShape } from 'react-intl';

import { QuestionDTO, QuestionTypes } from 'models/Question';
import { findQuestionById } from 'models/Session/utils';
import { IReflectionBlock, SpeechAnimation } from 'models/Narrator';
import { reflectionFormulaType, speechType } from 'models/Narrator/BlockTypes';
import { EFeedbackAction } from 'models/Narrator/FeedbackActions';
import { CharacterType } from 'models/Character';
import { ApiData } from 'models/Api';
import { Session, SessionTypes } from 'models/Session';
import { ReflectableQuestion } from 'models/ReflectableQuestion';
import { QuestionGroup } from 'models/QuestionGroup';

import { characterToSpeechAnimationsMap } from 'utils/animations/animationsNames';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import useGet from 'utils/useGet';
import { getPreviousQuestions } from 'utils/questions';

import animationMessages from 'global/i18n/animationNames';
import {
  makeSelectQuestions,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';
import { makeSelectSession } from 'global/reducers/session';
import {
  makeSelectNormalizedQuestionGroups,
  makeSelectSelectedQuestionGroup,
} from 'global/reducers/questionGroups';

import Column from 'components/Column';
import Box from 'components/Box';
import Select from 'components/Select';
import Row from 'components/Row';
import { FullWidthSwitch } from 'components/Switch';
import Text from 'components/Text';
import ArrowDropdown from 'components/ArrowDropdown';
import { SelectOption } from 'components/Select/types';
import Loader from 'components/Loader';
import VariableChooser, {
  VariableChooserMode,
} from 'containers/VariableChooser';

import messages from '../../messages';
import { switchSpeechReflection, updateBlockSettings } from '../../../actions';
import Reflection from './Reflection';
import { setUpReflections } from './utils';

type SpeechAnimationOption = SelectOption<SpeechAnimation>;
type FeedbackActionPositionOption = SelectOption<EFeedbackAction>;

type Props = {
  formatMessage: IntlShape['formatMessage'];
  character: CharacterType;
  block: IReflectionBlock;
  id: string;
  disabled: boolean;
  blockIndex: number;
};

const ReflectionBlock = ({
  formatMessage,
  block,
  blockIndex,
  id: currentQuestionId,
  disabled,
  character,
}: Props) => {
  const dispatch = useDispatch();

  const currentSessionQuestions: QuestionDTO[] = useSelector(
    makeSelectQuestions(),
  );
  const normalizedQuestionGroups: NormalizedData<QuestionGroup> = useSelector(
    makeSelectNormalizedQuestionGroups(),
  );
  const currentQuestion: Nullable<QuestionDTO> = useSelector(
    makeSelectSelectedQuestion(),
  );
  const currentQuestionGroup: Nullable<QuestionGroup> = useSelector(
    makeSelectSelectedQuestionGroup(),
  );
  const currentSession: Nullable<Session> = useSelector(makeSelectSession());

  const currentSessionPreviousQuestions = useMemo(
    () =>
      getPreviousQuestions(
        currentSessionQuestions,
        normalizedQuestionGroups,
        currentQuestion,
        currentQuestionGroup,
      ),
    [
      currentSessionQuestions,
      normalizedQuestionGroups,
      currentQuestion,
      currentQuestionGroup,
    ],
  );

  const [targetChooserOpen, setTargetChooserOpen] = useState(false);

  const [lastSelectedQuestion, setLastSelectedQuestion] =
    useState<Nullable<ReflectableQuestion>>(null);

  const {
    question_id: reflectedQuestionId,
    question_group_id: reflectedQuestionGroupId,
    session_id: reflectedOtherSessionId,
  } = block;

  const reflectedCurrentSessionQuestion: Nullable<QuestionDTO> = useMemo(() => {
    if (!reflectedQuestionId || reflectedOtherSessionId) return null;
    return findQuestionById(
      currentSessionPreviousQuestions,
      reflectedQuestionId,
    );
  }, [reflectedQuestionId, reflectedOtherSessionId]);

  const reflectedOtherSessionQuestionSubtitleUrl =
    !reflectedQuestionId || !reflectedOtherSessionId || lastSelectedQuestion
      ? ''
      : `/v1/question_groups/${reflectedQuestionGroupId}/questions/${reflectedQuestionId}`;

  const {
    data: otherSessionQuestionSubtitle,
    error,
    isFetching,
  } = useGet(
    reflectedOtherSessionQuestionSubtitleUrl,
    ({ data }: ApiData<QuestionDTO>) => data.attributes.subtitle,
  );

  const reflectedQuestionSubtitle =
    lastSelectedQuestion?.subtitle ??
    (reflectedOtherSessionId
      ? otherSessionQuestionSubtitle
      : reflectedCurrentSessionQuestion?.subtitle);

  const selectOptions = useMemo(() => {
    const animations = characterToSpeechAnimationsMap[character];

    return animations.map((animation) => ({
      value: animation,
      label: formatMessage(animationMessages[animation]),
    }));
  }, [character]);

  const feedbackOptions = useMemo(() => {
    const options = values(EFeedbackAction).filter(
      (action) => action !== EFeedbackAction.SHOW_SPECTRUM,
    );

    return options.map((option) => ({
      value: option,
      label: formatMessage(messages[option]),
    }));
  }, [EFeedbackAction]);

  const selectedOption = selectOptions.find(
    (option) => option.value === block.animation,
  );

  const selectedFeedbackOption = feedbackOptions.find(
    (option) => option.value === block.action,
  );

  const hasSpecialPositioning = block.action !== EFeedbackAction.NO_ACTION;

  if (!currentSession || !currentQuestion || !currentQuestionGroup) return null;
  const { id: currentSessionId, interventionId: currentInterventionId } =
    currentSession;

  const onQuestionSelected = (question: ReflectableQuestion) => {
    setTargetChooserOpen(false);
    setLastSelectedQuestion(question);

    const { id, sessionId, questionGroupId } = question;
    const isCurrentSessionQuestion = sessionId === currentSessionId;

    dispatch(
      updateBlockSettings(
        blockIndex,
        {
          ...(isCurrentSessionQuestion
            ? { session_id: null, question_group_id: null }
            : {
                session_id: sessionId,
                question_group_id: questionGroupId,
              }),
          question_id: id,
          reflections: setUpReflections(question),
        },
        currentQuestionId,
      ),
    );
  };

  return (
    <Column>
      {currentQuestion.type === QuestionTypes.FEEDBACK && (
        <>
          <Box mt={15}>{formatMessage(messages.selectActionPosition)}</Box>
          <Box mt={15}>
            <Select
              // @ts-ignore
              selectProps={{
                isDisabled: disabled,
                options: feedbackOptions,
                value: selectedFeedbackOption,
                onChange: (option: Nullable<FeedbackActionPositionOption>) => {
                  const action = option?.value;
                  dispatch(
                    updateBlockSettings(
                      blockIndex,
                      {
                        action,
                        animation:
                          action === EFeedbackAction.NO_ACTION
                            ? 'rest'
                            : 'pointUp',
                      },
                      currentQuestionId,
                    ),
                  );
                },
              }}
            />
          </Box>
        </>
      )}
      {!hasSpecialPositioning && (
        <>
          <Box mt={15}>{formatMessage(messages.speechAnimation)}</Box>
          <Box mt={15}>
            <Select
              // @ts-ignore
              selectProps={{
                isDisabled: disabled,
                options: selectOptions,
                value: selectedOption,
                onChange: (option: Nullable<SpeechAnimationOption>) =>
                  dispatch(
                    updateBlockSettings(
                      blockIndex,
                      { animation: option?.value },
                      currentQuestionId,
                    ),
                  ),
              }}
            />
          </Box>
        </>
      )}
      <Row my={15} align="center" justify="between">
        <FullWidthSwitch
          id="reflection-toggle"
          disabled={disabled}
          checked
          onToggle={() =>
            dispatch(
              switchSpeechReflection(blockIndex, currentQuestionId, speechType),
            )
          }
        >
          {formatMessage(messages.reflectionToggle)}
        </FullWidthSwitch>
      </Row>
      <Row mb={15} align="center" justify="between">
        <FullWidthSwitch
          id="formula-toggle"
          disabled={disabled}
          checked={false}
          onToggle={() =>
            dispatch(
              switchSpeechReflection(
                blockIndex,
                currentQuestionId,
                reflectionFormulaType,
              ),
            )
          }
        >
          {formatMessage(messages.formulaToggle)}
        </FullWidthSwitch>
      </Row>
      <VariableChooser
        mode={VariableChooserMode.REFLECTABLE_QUESTION}
        disabled={disabled}
        onClick={onQuestionSelected}
        setIsOpen={setTargetChooserOpen}
        includeAllSessions={false}
        currentInterventionId={currentInterventionId}
        currentSessionId={currentSessionId}
        isMultiIntervention={false}
        isMultiSession
        initialSessionId={reflectedOtherSessionId ?? currentSessionId}
        sessionTypesWhiteList={[SessionTypes.CLASSIC_SESSION]}
        currentSessionPreviousQuestions={currentSessionPreviousQuestions}
        dropdownWidth={348}
      >
        <ArrowDropdown
          disabled={disabled}
          width="100%"
          childWidthScope="parent"
          positionFrom="right"
          isOpened={targetChooserOpen}
          dropdownContent={
            <Box>
              {isFetching && <Loader type="inline" />}
              {!isFetching && (
                <Text
                  textOverflow="ellipsis"
                  whiteSpace="pre"
                  overflow="hidden"
                >
                  {reflectedQuestionSubtitle
                    ? htmlToPlainText(reflectedQuestionSubtitle)
                    : formatMessage(messages.chooseQuestion)}
                  {error && formatMessage(messages.questionNotFound)}
                </Text>
              )}
            </Box>
          }
        />
      </VariableChooser>
      <Box mt={15}>
        {block.reflections.map((reflection, index) => (
          <Reflection
            disabled={disabled}
            key={`${currentQuestionId}-reflection-${index}`}
            formatMessage={formatMessage}
            id={currentQuestionId}
            reflectionIndex={index}
            blockIndex={blockIndex}
            reflection={reflection}
            block={block}
          />
        ))}
      </Box>
    </Column>
  );
};

export default ReflectionBlock;
