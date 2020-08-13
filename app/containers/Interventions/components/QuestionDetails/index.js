import React, { useRef } from 'react';
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
import QuestionPreview from 'containers/Interventions/components/QuestionDetails/QuestionPreview';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import {
  makeSelectSelectedQuestion,
  makeSelectIsNarratorTab,
} from '../../containers/EditInterventionPage/selectors';
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
    <RenderQuestionDetails {...props} />
  </Box>
);

const RenderQuestionDetails = ({ selectedQuestion, isNarratorTab }) => {
  const animationBoundaries = useRef(null);

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
      narrator: { settings } = {},
    } = selectedQuestion || {};

    return (
      <AnswerOuterContainer>
        <Box width="100%">
          <AnswerInterventionContent ref={animationBoundaries}>
            <QuestionNarrator
              questionId={id}
              animationBoundaries={animationBoundaries}
              settings={settings}
            />

            <Row justify="center" filled>
              <Column mx={50} justify="center">
                <Row width="100%" mt={5} height={30} />
                {!isNarratorTab && (
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
                {isNarratorTab && (
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
        </Box>
      </AnswerOuterContainer>
    );
  }

  return <NoContent />;
};

RenderQuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  isNarratorTab: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  isNarratorTab: makeSelectIsNarratorTab(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionDetails);
