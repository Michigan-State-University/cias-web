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
import NoContent from 'components/NoContent';

import { colors } from 'theme';
import { NumberCircle, BackgroundBox, StyledHoverableBox } from './styled';
import messages from './messages';

import QuestionData from '../QuestionData';
import QuestionImage from '../QuestionImage';
import QuestionVideo from '../QuestionVideo';
import QuestionNarrator from '../QuestionNarrator';
import {
  makeSelectSelectedQuestion,
  makeSelectSelectedQuestionIndex,
} from '../../containers/EditInterventionPage/selectors';

import { updateQuestionTitle } from '../../containers/EditInterventionPage/actions';

const QuestionDetails = props => (
  <BackgroundBox
    padding={30}
    width="100%"
    height="100%"
    display="flex"
    overflow="scroll"
  >
    {renderQuestionDetails(props)}
  </BackgroundBox>
);

const renderQuestionDetails = ({
  selectedQuestion,
  selectedQuestionIndex,
  updateTitle,
  intl: { formatMessage },
}) => {
  if (selectedQuestion != null) {
    const { video, image } = selectedQuestion.settings;

    const { settings: { animation } = {} } = selectedQuestion.narrator || {};
    return (
      <Column position="relative">
        {animation && <QuestionNarrator />}
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
            <Row>
              <QuestionData />
            </Row>
          </Column>
        </Row>
      </Column>
    );
  }

  return <NoContent />;
};

renderQuestionDetails.propTypes = {
  selectedQuestion: PropTypes.shape(Question),
  selectedQuestionIndex: PropTypes.number.isRequired,
  updateTitle: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
  selectedQuestionIndex: makeSelectSelectedQuestionIndex(),
});

const mapDispatchToProps = {
  updateTitle: title => updateQuestionTitle(title),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(QuestionDetails));
