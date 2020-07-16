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

import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionVideo from '../QuestionVideo';
import QuestionNarrator from '../QuestionNarrator';
import QuestionSubtitle from '../QuestionSubtitle';
import QuestionTitle from '../QuestionTitle';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from '../../containers/EditInterventionPage/selectors';

import { editQuestionRequest } from '../../containers/EditInterventionPage/actions';
import messages from './messages';

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
      <Column position="relative" zIndex={0}>
        {animation && <QuestionNarrator questionId={id} />}
        <Row justify="center" filled>
          <Column sm={10} justify="center">
            {title && (
              <Row width="100%">
                <QuestionTitle />
              </Row>
            )}
            {subtitle && (
              <Row mt={22}>
                <QuestionSubtitle />
              </Row>
            )}
            {video && (
              <Row mt={22}>
                <QuestionVideo />
              </Row>
            )}
            {image && (
              <Row mt={22}>
                <QuestionImage />
              </Row>
            )}
            <Row mt={22}>
              <QuestionData />
            </Row>
            {proceedButton && (
              <Button width="180px" mt={40} hoverable>
                <FormattedMessage {...messages.nextQuestion} />
              </Button>
            )}
          </Column>
        </Row>
      </Column>
    );
  }

  return <NoContent />;
};

renderQuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  selectedQuestionIndex: makeSelectSelectedQuestionIndex(),
});

const mapDispatchToProps = {
  updateTitle: editQuestionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionDetails);
