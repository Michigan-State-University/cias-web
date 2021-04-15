import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from 'components/Box';
import Column from 'components/Column';
import AppContainer from 'components/Container';
import Row from 'components/Row';
import StyledInput from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import { MSULogo } from 'components/Logo';

import Question from 'models/Session/Question';
import { hasObjectProperty } from 'utils/hasObjectProperty';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { Button } from 'components/Button';
import { colors, elements } from 'theme';
import { makeSelectIsNarratorTab } from 'global/reducers/localState';
import { useInjectSaga } from 'redux-injectors';
import {
  makeSelectSelectedQuestion,
  editQuestionSaga,
} from 'global/reducers/questions';
import {
  makeSelectIntervention,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';

import { canEdit } from 'models/Status/statusPermissions';
import { nameQuestion, finishQuestion } from 'models/Session/QuestionTypes';

import CommonLayout from 'containers/AnswerSessionPage/layouts/CommonLayout';

import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionNarrator from '../QuestionNarrator';
import QuestionSubtitle from '../QuestionSubtitle';
import QuestionTitle from '../QuestionTitle';
import QuestionVideo from '../QuestionVideo';
import VariableInput from './VariableInput';
import messages from './messages';
import { AnswerOuterContainer, AnswerInterventionContent } from './styled';

const QuestionDetails = props => (
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
  selectedQuestion,
  isNarratorTab,
  interventionStatus,
  formatMessage,
  changeGroupName,
  sessionId,
  currentGroupScope,
  intervention,
}) => {
  useInjectSaga({ key: 'editQuestion', saga: editQuestionSaga });
  const animationBoundaries = useRef(null);

  const { logoUrl } = intervention ?? {};

  const editingPossible = canEdit(interventionStatus);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  if (selectedQuestion != null) {
    const {
      id,
      body,
      type,
      settings: {
        video,
        image,
        title,
        subtitle,
        proceed_button: proceedButton,
      } = {},
      narrator: { settings } = {},
    } = selectedQuestion || {};

    const isNameScreen = type === nameQuestion.id;
    const isFinishScreen = type === finishQuestion.id;

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
                px={12}
                value={currentGroupScope.title}
                fontSize={18}
                fontWeight="bold"
                placeholder={formatMessage(messages.groupPlaceholder)}
                maxWidth="initial"
                onFocus={selectInputText}
                onBlur={val =>
                  changeGroupName(val, sessionId, currentGroupScope.id)
                }
                disabled={!editingPossible}
              />
              <MSULogo logoUrl={logoUrl} />
            </Row>
          )}
          <AnswerInterventionContent
            ref={animationBoundaries}
            id="quill_boundaries"
          >
            <QuestionNarrator
              questionId={id}
              animationBoundaries={animationBoundaries}
              settings={{ ...settings, title, subtitle }}
            />
            <Row justify="center" width="100%">
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
                    {body && hasObjectProperty(body, 'variable') && (
                      <Row mt={10} ml={26}>
                        <VariableInput
                          disabled={isNameScreen}
                          questionId={id}
                          interventionStatus={interventionStatus}
                          isNarratorTab={isNarratorTab}
                          variable={body.variable}
                        />
                      </Row>
                    )}
                    {video && (
                      <Row mt={10}>
                        <QuestionVideo disabled={!editingPossible} />
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
                  <CommonLayout currentQuestion={selectedQuestion ?? {}} />
                )}

                <Row>
                  <QuestionData />
                </Row>
                {(isNullOrUndefined(proceedButton) || proceedButton) &&
                  !isFinishScreen && (
                    <Box my={20}>
                      <Button my={20} width="180px" disabled>
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
  }

  return null;
};

RenderQuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
  formatMessage: PropTypes.func,
  changeGroupName: PropTypes.func,
  sessionId: PropTypes.string,
  currentGroupScope: PropTypes.object,
  intervention: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  isNarratorTab: makeSelectIsNarratorTab(),
  interventionStatus: makeSelectInterventionStatus(),
  intervention: makeSelectIntervention(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionDetails);
