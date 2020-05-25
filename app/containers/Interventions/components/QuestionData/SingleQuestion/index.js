import React from 'react';
import PropTypes from 'prop-types';
import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import Text from 'components/Text';
import { injectIntl } from 'react-intl';
import radio from 'assets/svg/radio-button.svg';
import { makeSelectSelectedQuestion } from '../../../containers/CreateInterventionPage/selectors';
import { PlusCircle } from '../../../containers/CreateInterventionPage/styled';
import { themeColors } from '../../../../../theme/colors';
import messages from './messages';
import { updateQuestionData } from '../../../containers/CreateInterventionPage/actions';
import ApprovableInput from '../../../../../components/Input/ApprovableInput';
import { ADD, UPDATE } from './constants';

const SingleQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  intl: { formatMessage },
}) => (
  <Column>
    {Object.entries(selectedQuestion.body).map(([, value], index) => (
      <Row>
        <HoverableBox px={21} py={14}>
          <Row>
            <Img src={radio} mr={16} />
            <ApprovableInput
              placeholder={formatMessage(messages.placeholder)}
              value={value}
              onCheck={newVal => updateAnswer(index, newVal)}
            />
          </Row>
        </HoverableBox>
      </Row>
    ))}
    <Row>
      <HoverableBox px={21} py={14} onClick={addAnswer}>
        <Box>
          <Row align="center">
            <PlusCircle mr={12} />
            <Text fontWeight="bold" color={themeColors.secondary}>
              {formatMessage(messages.addAnswer)}
            </Text>
          </Row>
        </Box>
      </HoverableBox>
    </Row>
  </Column>
);

SingleQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  addAnswer: () => dispatch(updateQuestionData({ type: ADD })),
  updateAnswer: (index, value) =>
    dispatch(updateQuestionData({ type: UPDATE, data: { index, value } })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(SingleQuestion));
