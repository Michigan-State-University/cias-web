import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { colors, elements } from 'theme';

import { canEdit } from 'models/Status/statusPermissions';
import { GroupType, QuestionGroup } from 'models/QuestionGroup';
import { QuestionDTO, QuestionTypes } from 'models/Question';
import { Intervention } from 'models/Intervention';

import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import {
  editQuestionSaga,
  makeSelectSelectedQuestion,
} from 'global/reducers/questions';
import { makeSelectIntervention } from 'global/reducers/intervention';
import globalMessages from 'global/i18n/globalMessages';

import CommonLayout from 'containers/AnswerSessionPage/layouts/CommonLayout';

import Box from 'components/Box';
import Column from 'components/Column';
import AppContainer from 'components/Container';
import Row from 'components/Row';
import StyledInput from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import { Button } from 'components/Button';
import Img from 'components/Img';
import Text from 'components/Text';

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

  const isNarratorTab: boolean = useSelector(makeSelectIsNarratorTab());

  useInjectSaga({ key: 'editQuestion', saga: editQuestionSaga });
  const animationBoundaries = useRef(null);

  if (!selectedQuestion || !intervention) return null;

  const { logoUrl, imageAlt, status } = intervention;

  const editingPossible = canEdit(status);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const {
    id,
    body,
    type,
    settings: { video, image, title, subtitle },
    narrator: { settings, blocks },
  } = selectedQuestion;

  const isNameScreen = type === QuestionTypes.NAME;
  const isFinishScreen = type === QuestionTypes.FINISH;
  const isTlfbGroup = currentGroupScope?.type === GroupType.TLFB;
  const shouldShowNarrator =
    !!blocks?.length && !HIDE_NARRATOR_QUESTIONS.includes(type);

  const proceedButton =
    'proceed_button' in selectedQuestion.settings
      ? selectedQuestion.settings.proceed_button
      : true;
  const showProceedButton = proceedButton && !isTlfbGroup && !isFinishScreen;

  return (
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
                {
                  // @ts-ignore
                  formatMessage(globalMessages.questionTypes[type])
                }
              </Text>
            )}
          </Row>
        )}
        <AnswerInterventionContent
          ref={animationBoundaries}
          id="quill_boundaries"
          transparentBackground={!isTlfbGroup}
        >
          {shouldShowNarrator && (
            <QuestionNarrator
              questionId={id}
              animationBoundaries={animationBoundaries}
              settings={{ ...settings, title, subtitle }}
            />
          )}
          <Row justify="center" width="100%">
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
                    <Row mt={10}>
                      <QuestionSubtitle />
                    </Row>
                  )}
                  {'variable' in body && (
                    <Row mt={10} ml={26}>
                      <VariableInput
                        disabled={isNameScreen}
                        questionId={id}
                        interventionStatus={status}
                        isNarratorTab={isNarratorTab}
                        variable={body.variable}
                      />
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

              {showProceedButton && (
                <Box my={20} ml={26}>
                  {/* @ts-ignore */}
                  <Button width={elements.continueButtonWidth} disabled>
                    <FormattedMessage {...messages.nextQuestion} />
                  </Button>
                </Box>
              )}
            </AppContainer>
          </Row>
        </AnswerInterventionContent>
      </Column>
    </AnswerOuterContainer>
  );
};

export default QuestionDetails;
