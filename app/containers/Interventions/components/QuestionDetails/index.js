import React from 'react';
import PropTypes from 'prop-types';
import Column from 'components/Column';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H1 from 'components/H1';
import { NumberCircle, BackgroundBox, StyledHoverableBox } from './styled';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from '../../containers/CreateInterventionPage/selectors';

import QuestionData from '../QuestionTypes';

const QuestionDetails = ({ selectedQuestion, selectedQuestionIndex }) => (
  <BackgroundBox padding={30} height="100%" display="flex">
    <Column>
      <Row>
        <NumberCircle child={selectedQuestionIndex + 1} />
      </Row>
      <Row justify="center" height="100%" filled>
        <Column sm={10} align="center" justify="center">
          <Row>
            <StyledHoverableBox padded>
              <H1>{selectedQuestion.title}</H1>
            </StyledHoverableBox>
          </Row>
          <Row>
            <QuestionData />
          </Row>
        </Column>
      </Row>
    </Column>
  </BackgroundBox>
);

QuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  selectedQuestionIndex: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  selectedQuestionIndex: makeSelectSelectedQuestionIndex(),
});

const mapDispatchToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionDetails);
