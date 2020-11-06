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
import { MSULogo } from 'components/Logo';

import Question from 'models/Intervention/Question';
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
import { makeSelectProblemStatus } from 'global/reducers/problem';

import { canEdit } from 'models/Status/statusPermissions';
import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionNarrator from '../QuestionNarrator';
import QuestionPreview from './QuestionPreview';
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
  problemStatus,
  formatMessage,
  changeGroupName,
  interventionId,
  currentGroupScope,
}) => {
  useInjectSaga({ key: 'editQuestion', saga: editQuestionSaga });
  const animationBoundaries = useRef(null);

  const editingPossible = canEdit(problemStatus);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  if (selectedQuestion != null) {
    const {
      id,
      title: questionTitle,
      subtitle: questionSubtitle,
      image_url: imageUrl,
      video_url: videoUrl,
      body,
      settings: {
        video,
        image,
        title,
        subtitle,
        proceed_button: proceedButton,
      } = {},
      narrator: { settings } = {},
    } = selectedQuestion || {};

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
                onBlur={val =>
                  changeGroupName(val, interventionId, currentGroupScope.id)
                }
              />
              <MSULogo />
            </Row>
          )}
          <AnswerInterventionContent
            ref={animationBoundaries}
            id="quill_boundaries"
          >
            <QuestionNarrator
              questionId={id}
              animationBoundaries={animationBoundaries}
              settings={settings}
            />
            <Row justify="center" width="100%">
              <AppContainer disablePageTitle $width="100%">
                <Row width="100%" mt={5} height={30} />
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
                          questionId={id}
                          problemStatus={problemStatus}
                          isNarratorTab={isNarratorTab}
                          variable={body.variable}
                        />
                      </Row>
                    )}
                    {video && (
                      <Row mt={10}>
                        <QuestionVideo />
                      </Row>
                    )}
                    {image && (
                      <Row mt={10}>
                        <QuestionImage />
                      </Row>
                    )}
                  </>
                )}
                {isNarratorTabOrEditNotPossible && (
                  <>
                    {title && questionTitle && (
                      <QuestionPreview
                        padding={26}
                        dangerouslySetInnerHTML={{ __html: questionTitle }}
                      />
                    )}
                    {subtitle && questionSubtitle && (
                      <QuestionPreview
                        mt={10}
                        padding={26}
                        dangerouslySetInnerHTML={{ __html: questionSubtitle }}
                      />
                    )}
                    {video && !isNullOrUndefined(videoUrl) && (
                      <Row mt={10}>
                        <QuestionVideo />
                      </Row>
                    )}
                    {image && !isNullOrUndefined(imageUrl) && (
                      <Row mt={10}>
                        <QuestionImage />
                      </Row>
                    )}
                  </>
                )}

                <Row>
                  <QuestionData />
                </Row>
                {(isNullOrUndefined(proceedButton) || proceedButton) && (
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
  problemStatus: PropTypes.string,
  formatMessage: PropTypes.func,
  changeGroupName: PropTypes.func,
  interventionId: PropTypes.string,
  currentGroupScope: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  isNarratorTab: makeSelectIsNarratorTab(),
  problemStatus: makeSelectProblemStatus(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionDetails);
