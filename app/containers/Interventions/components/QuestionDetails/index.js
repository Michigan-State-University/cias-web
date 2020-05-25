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
import ApprovableInput from 'components/Input/ApprovableInput';
import { NumberCircle, BackgroundBox, StyledHoverableBox } from './styled';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from '../../containers/CreateInterventionPage/selectors';

import QuestionData from '../QuestionData';
import messages from './messages';
import { updateQuestionTitle } from '../../containers/CreateInterventionPage/actions';

const QuestionDetails = ({
  selectedQuestion,
  selectedQuestionIndex,
  updateTitle,
  intl: { formatMessage },
}) => (
  <BackgroundBox padding={30} height="100%" display="flex">
    <Column>
      <Row>
        <NumberCircle child={selectedQuestionIndex + 1} />
      </Row>
      <Row justify="center" height="100%" filled>
        <Column sm={10} justify="center">
          <Row width="100%">
            <StyledHoverableBox width="100%" padded>
              <H1>
                <Row>
                  <ApprovableInput
                    height="auto"
                    rows="5"
                    placeholder={formatMessage(messages.placeholder)}
                    value={selectedQuestion.title}
                    type="text"
                    onCheck={updateTitle}
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
  updateTitle: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  selectedQuestionIndex: makeSelectSelectedQuestionIndex(),
});

const mapDispatchToProps = dispatch => ({
  updateTitle: title => dispatch(updateQuestionTitle(title)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(QuestionDetails));
