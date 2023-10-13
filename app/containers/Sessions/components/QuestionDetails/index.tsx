import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { defaults } from 'lodash';

import { colors, elements } from 'theme';

import { GroupType, QuestionGroup } from 'models/QuestionGroup';
import { QuestionDTO, QuestionTypes } from 'models/Question';
import { Intervention } from 'models/Intervention';
import { CHARACTER_CONFIGS } from 'models/Character';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import {
  editQuestionSaga,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';
import {
  makeSelectEditingPossible,
  makeSelectIntervention,
} from 'global/reducers/intervention';
import questionTypesMessages from 'global/i18n/questionTypesMessages';
import { makeSelectInterventionFixedElementsDirection } from 'global/reducers/globalState';

import CommonLayout from 'containers/AnswerSessionPage/layouts/CommonLayout';
import ScreenBackButton from 'containers/AnswerSessionPage/components/ScreenBackButton';
import { ActionButtons } from 'containers/AnswerSessionPage/components/ActionButtons';

import Box from 'components/Box';
import Column from 'components/Column';
import AppContainer from 'components/Container';
import Row from 'components/Row';
import StyledInput from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import Img from 'components/Img';
import Text from 'components/Text';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionNarrator from '../QuestionNarrator';
import QuestionSubtitle from '../QuestionSubtitle';
import QuestionTitle from '../QuestionTitle';
import QuestionVideo from '../QuestionVideo';
import VariableInput from './VariableInput';
import messages from './messages';
import { AnswerInterventionContent, AnswerOuterContainer } from './styled';
import { HIDE_NARRATOR_QUESTIONS } from './constants';
import { variableTooltipContents } from './variableTooltipContents';
import QuestionDetailsLanguageProvider from './QuestionDetailsLanguageProvider';

export type QuestionDetailsProps = {
  changeGroupName: (name: string) => void;
  currentGroupScope: QuestionGroup;
};

const QuestionDetails = (props: QuestionDetailsProps) => (
  <Box
    width="100%"
    display="flex"
    overflow="scroll"
    padding={30}
    bg={colors.zirkon}
  >
    <RenderQuestionDetails {...props} />
  </Box>
);

const RenderQuestionDetails = ({
  changeGroupName,
  currentGroupScope,
}: QuestionDetailsProps) => {
  const { formatMessage } = useIntl();

  const selectedQuestion: Nullable<QuestionDTO> = useSelector(
    makeSelectSelectedQuestion(),
  );
  const intervention: Nullable<Intervention> = useSelector(
    makeSelectIntervention(),
  );
  const editingPossible = useSelector(makeSelectEditingPossible());

  const isNarratorTab: boolean = useSelector(makeSelectIsNarratorTab());

  const fixedElementsDirection = useSelector(
    makeSelectInterventionFixedElementsDirection(),
  );

  useInjectSaga({ key: 'editQuestion', saga: editQuestionSaga });
  const animationBoundaries = useRef(null);

  const variableTooltipContent = useMemo(() => {
    if (!selectedQuestion?.type) return null;
    try {
      // @ts-ignore
      return formatMessage(variableTooltipContents[selectedQuestion.type]);
    } catch {
      return null;
    }
  }, [selectedQuestion?.type]);

  if (!selectedQuestion || !intervention) return null;

  const { logoUrl, imageAlt, status } = intervention;

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const {
    id,
    body,
    type,
    settings: questionSettings,
    narrator: { settings: narratorSettings, blocks },
  } = selectedQuestion;

  const {
    video,
    image,
    title,
    subtitle,
    required,
    proceed_button: proceedButton,
  } = defaults(
    { ...questionSettings },
    {
      video: false,
      image: false,
      title: false,
      subtitle: false,
      required: true,
      proceed_button: true,
    },
  );

  const isNameScreen = type === QuestionTypes.NAME;
  const isFinishScreen = type === QuestionTypes.FINISH;
  const isHenryFordInitialScreen = type === QuestionTypes.HENRY_FORD_INITIAL;
  const isTlfbGroup = currentGroupScope?.type === GroupType.TLFB;
  const shouldShowNarrator =
    !!blocks?.length && !HIDE_NARRATOR_QUESTIONS.includes(type);
  const renderContinueButton =
    proceedButton &&
    !isTlfbGroup &&
    !isFinishScreen &&
    !isHenryFordInitialScreen;

  const { character, extra_space_for_narrator: extraSpaceForNarrator } =
    narratorSettings;
  const narratorExtraSpace = CHARACTER_CONFIGS[character].size.height;

  return (
    <QuestionDetailsLanguageProvider>
      <AnswerOuterContainer>
        <Column width="100%" display="flex" align="center">
          {currentGroupScope && (
            <Row
              mb={10}
              width="inherit"
              maxWidth={elements.draggableContainerSize}
              justify="between"
              align="center"
            >
              <StyledInput
                // @ts-ignore
                px={12}
                value={currentGroupScope.title}
                fontSize={18}
                fontWeight="bold"
                placeholder={formatMessage(messages.groupPlaceholder)}
                maxWidth="initial"
                onFocus={selectInputText}
                onBlur={(val) => changeGroupName(val)}
                disabled={!editingPossible}
              />
              {!isTlfbGroup && logoUrl && (
                <Img
                  maxHeight={elements.interventionLogoSize.height}
                  maxWidth={elements.interventionLogoSize.width}
                  src={logoUrl}
                  aria-label={imageAlt}
                />
              )}
              {isTlfbGroup && (
                <Text fontWeight="medium">
                  {formatMessage(questionTypesMessages[type])}
                </Text>
              )}
            </Row>
          )}
          <AnswerInterventionContent
            ref={animationBoundaries}
            id="quill_boundaries"
          >
            {shouldShowNarrator && (
              <QuestionNarrator
                questionId={id}
                animationBoundaries={animationBoundaries}
                settings={{ ...narratorSettings, title, subtitle }}
              />
            )}
            <Row
              justify="center"
              width="100%"
              pt={extraSpaceForNarrator ? narratorExtraSpace : 30}
            >
              {/* @ts-ignore */}
              <AppContainer disablePageTitle $width="100%">
                {!isNarratorTabOrEditNotPossible && (
                  <>
                    {title && (
                      <Row width="100%">
                        <QuestionTitle />
                      </Row>
                    )}
                    {subtitle && (
                      <Row>
                        <QuestionSubtitle />
                      </Row>
                    )}
                    {'variable' in body && (
                      <Row mt={10} ml={26}>
                        <HelpIconTooltip
                          id="hardcoded-variable-score-info"
                          tooltipContent={variableTooltipContent}
                        >
                          <VariableInput
                            disabled={isNameScreen}
                            questionId={id}
                            interventionStatus={status}
                            isNarratorTab={isNarratorTab}
                            variable={body.variable}
                          />
                        </HelpIconTooltip>
                      </Row>
                    )}
                    {video && (
                      <Row mt={10}>
                        <QuestionVideo
                          // @ts-ignore
                          disabled={!editingPossible}
                        />
                      </Row>
                    )}
                    {image && (
                      <Row mt={10}>
                        <QuestionImage disabled={!editingPossible} />
                      </Row>
                    )}
                  </>
                )}
                {isNarratorTabOrEditNotPossible && (
                  <CommonLayout
                    currentQuestion={selectedQuestion ?? {}}
                    showOriginalText={!isNarratorTab}
                  />
                )}

                <Row>
                  <QuestionData />
                </Row>

                <Row align="center" gap={16} dir={fixedElementsDirection}>
                  <ScreenBackButton disabled />
                  <ActionButtons
                    questionType={type}
                    questionRequired={required}
                    isCatMhSession={false}
                    skipQuestionButtonDisabled
                    renderContinueButton={renderContinueButton}
                    continueButtonDisabled
                  />
                </Row>
              </AppContainer>
            </Row>
          </AnswerInterventionContent>
        </Column>
      </AnswerOuterContainer>
    </QuestionDetailsLanguageProvider>
  );
};

export default QuestionDetails;
