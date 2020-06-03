import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import Row from 'components/Row';
import H1 from 'components/H1';
import ApprovableInput from 'components/Input/ApprovableInput';
import Question from 'models/Intervention/Question';

import { colors } from 'theme';
import { NumberCircle, BackgroundBox, StyledHoverableBox } from './styled';
import messages from './messages';

import QuestionData from '../QuestionData';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from '../../containers/EditInterventionPage/selectors';

import { updateQuestionTitle } from '../../containers/EditInterventionPage/actions';

const QuestionDetails = ({
  selectedQuestion,
  selectedQuestionIndex,
  updateTitle,
  intl: { formatMessage },
}) => (
  <BackgroundBox padding={30} height="100%" display="flex" overflow="scroll">
    {selectedQuestion != null ? (
      <Column>
        <Row>
          <NumberCircle
            color={colors.white}
            child={selectedQuestionIndex + 1}
          />
        </Row>
        <Row justify="center" filled>
          <Column sm={10} justify="center">
            <Row width="100%">
              <StyledHoverableBox width="100%" padded>
                <H1>
                  <Row>
                    <ApprovableInput
                      height="auto"
                      rows="4"
                      placeholder={formatMessage(messages.placeholder)}
                      value={selectedQuestion.title}
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
    ) : null}
  </BackgroundBox>
);

QuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
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
