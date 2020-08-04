import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Question from 'models/Intervention/Question';
import NoContent from 'components/NoContent';
import { Button } from 'components/Button';

import { colors } from 'theme';
import { makeSelectDraggable } from 'containers/Interventions/components/QuestionNarrator/selectors';
import QuestionPreview from 'containers/Interventions/components/QuestionDetails/QuestionPreview';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { makeSelectSelectedQuestion } from '../../containers/EditInterventionPage/selectors';
import { AnswerOuterContainer, AnswerInterventionContent } from './styled';
import messages from './messages';

import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionVideo from '../QuestionVideo';
import QuestionNarrator from '../QuestionNarrator';
import QuestionSubtitle from '../QuestionSubtitle';
import QuestionTitle from '../QuestionTitle';

const QuestionDetails = props => (
  <Box
    width="100%"
    display="flex"
    overflow="scroll"
    padding={30}
    bg={colors.zirkon}
  >
    {renderQuestionDetails(props)}
  </Box>
);

const renderQuestionDetails = ({ selectedQuestion, draggable }) => {
  if (selectedQuestion != null) {
    const {
      id,
      title: questionTitle,
      subtitle: questionSubtitle,
      image_url: imageUrl,
      video_url: videoUrl,
      settings: {
        video,
        image,
        title,
        subtitle,
        proceed_button: proceedButton,
      } = {},
      narrator: { settings: { animation } = {} } = {},
    } = selectedQuestion || {};

    return (
      <AnswerOuterContainer>
        <div>
          <AnswerInterventionContent>
            {animation && <QuestionNarrator questionId={id} />}
            <Row justify="center" filled>
              <Column mx={50} justify="center">
                <Row width="100%" mt={5} height={30} />
                {!draggable && (
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
                {draggable && (
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
                    <Button my={20} width="180px">
                      <FormattedMessage {...messages.nextQuestion} />
                    </Button>
                  </Box>
                )}
              </Column>
            </Row>
          </AnswerInterventionContent>
        </div>
      </AnswerOuterContainer>
    );
  }

  return <NoContent />;
};

renderQuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  draggable: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  draggable: makeSelectDraggable(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionDetails);
