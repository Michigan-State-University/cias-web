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
import { AnswerOuterContainer, AnswerOuterContent } from './styled';
import messages from './messages';

import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionVideo from '../QuestionVideo';
import QuestionNarrator from '../QuestionNarrator';
import QuestionSubtitle from '../QuestionSubtitle';
import QuestionTitle from '../QuestionTitle';
import { makeSelectSelectedQuestion } from '../../containers/EditInterventionPage/selectors';

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

const renderQuestionDetails = ({ selectedQuestion }) => {
  if (selectedQuestion != null) {
    const {
      id,
      position,
      settings: {
        video,
        image,
        title,
        subtitle,
        // proceed_button: proceedButton,
      } = {},
      narrator: { settings: { animation } = {} } = {},
    } = selectedQuestion || {};

    return (
      <AnswerOuterContainer>
        <AnswerOuterContent>
          {animation && <QuestionNarrator questionId={id} />}
          <Row justify="center" filled>
            <Column mx={50} justify="center">
              {position !== 1 && <Row width="100%" mt={40} />}
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
              <Row>
                <QuestionData />
              </Row>
              <Button my={20} width="180px">
                <FormattedMessage {...messages.nextQuestion} />
              </Button>
              {/* {proceedButton && ( */}
              {/*  <Button my={20} width="180px"> */}
              {/*    <FormattedMessage {...messages.nextQuestion} /> */}
              {/*  </Button> */}
              {/* )} */}
            </Column>
          </Row>
        </AnswerOuterContent>
      </AnswerOuterContainer>
    );
  }

  return <NoContent />;
};

renderQuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(QuestionDetails);
