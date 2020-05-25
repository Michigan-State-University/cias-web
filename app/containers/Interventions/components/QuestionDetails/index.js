import React from 'react';
import PropTypes from 'prop-types';
import Column from 'components/Column';
import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H1 from 'components/H1';
import { injectIntl } from 'react-intl';
import BigInput from 'components/Input/BigInput';
import { NumberCircle, BackgroundBox, StyledHoverableBox } from './styled';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from '../../containers/CreateInterventionPage/selectors';

import QuestionData from '../QuestionTypes';
import messages from './messages';

const QuestionDetails = ({
  selectedQuestion,
  selectedQuestionIndex,
  intl: { formatMessage },
}) => (
  <BackgroundBox padding={30} height="100%" display="flex">
    <Column>
      <Row>
        <NumberCircle child={selectedQuestionIndex + 1} />
      </Row>
      <Row justify="center" height="100%" filled>
        <Column sm={10} align="center" justify="center">
          <Row>
            <StyledHoverableBox padded>
              <H1>
                <Row>
                  <BigInput
                    height="auto"
                    rows="5"
                    placeholder={formatMessage(messages.placeholder)}
                    value={selectedQuestion.title}
                    type="text"
                  />
                </Row>
              </H1>
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
  intl: PropTypes.object,
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

export default injectIntl(compose(withConnect)(QuestionDetails));
