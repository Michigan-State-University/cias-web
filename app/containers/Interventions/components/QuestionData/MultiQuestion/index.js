import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import bin from 'assets/svg/bin-red.svg';
import checkbox from 'assets/svg/checkbox.svg';

import { themeColors } from 'theme';
import messages from './messages';
import { ADD, UPDATE, REMOVE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { PlusCircle } from '../../../containers/EditInterventionPage/styled';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const MultiQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  intl: { formatMessage },
}) => {
  const [hovered, setHovered] = useState(-1);

  return (
    <Column>
      {selectedQuestion.body.data.map((value, index) => (
        <Row key={`question-${selectedQuestion.id}-el-${index}`}>
          <HoverableBox
            px={21}
            py={14}
            width="100%"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(-1)}
            clickable={false}
          >
            <Row justify="between" align="center">
              <Row>
                <Img src={checkbox} mr={16} />
                <ApprovableInput
                  mr={8}
                  type="singleline"
                  placeholder={formatMessage(messages.placeholder)}
                  value={value.payload}
                  onCheck={newTitle =>
                    updateAnswer(index, { ...value, payload: newTitle })
                  }
                />
              </Row>
              <Row>
                <Box
                  onClick={() => removeAnswer(index)}
                  hidden={hovered !== index}
                  clickable
                >
                  <Img src={bin} mr={16} />
                </Box>
              </Row>
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
};

MultiQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  addAnswer: () => dispatch(updateQuestionData({ type: ADD })),
  updateAnswer: (index, value) =>
    dispatch(updateQuestionData({ type: UPDATE, data: { index, value } })),
  removeAnswer: index =>
    dispatch(updateQuestionData({ type: REMOVE, data: { index } })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(MultiQuestion));
