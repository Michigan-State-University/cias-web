import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import ApprovableInput from 'components/Input/ApprovableInput';
import Text from 'components/Text';
import { BadgeInput } from 'components/Input/BadgeInput';
import radio from 'assets/svg/radio-button.svg';
import bin from 'assets/svg/bin-red.svg';

import { numericValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE } from './constants';

import SingleQuestionVariable from './variable';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { PlusCircle } from '../../../containers/EditInterventionPage/styled';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const SingleQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  intl: { formatMessage },
}) => {
  const [hovered, setHovered] = useState(-1);

  const { data, variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <Box mb={10}>
        <SingleQuestionVariable variableName={variable.name} />
      </Box>
      {data.map((value, index) => (
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
                <Column justify="center">
                  <Img src={radio} mr={16} />
                </Column>
                <Column>
                  <Row mb={10}>
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
                  <Row align="center">
                    <Text mr={8} fontWeight="bold" color={colors.azure}>
                      {formatMessage(globalMessages.variables.value)}
                    </Text>
                    <BadgeInput
                      px={0}
                      py={12}
                      textAlign="center"
                      validator={numericValidator}
                      keyboard="tel"
                      placeholder={formatMessage(
                        globalMessages.variables.variableScorePlaceholder,
                      )}
                      value={value.value}
                      color={colors.azure}
                      onBlur={val =>
                        updateAnswer(index, {
                          ...value,
                          value: val,
                        })
                      }
                    />
                  </Row>
                </Column>
              </Row>

              <Column align="end">
                <Box
                  onClick={() => removeAnswer(index)}
                  hidden={hovered !== index}
                  clickable
                >
                  <Img src={bin} mr={16} />
                </Box>
              </Column>
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

SingleQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  addAnswer: () => updateQuestionData({ type: ADD }),
  updateAnswer: (index, value) =>
    updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),

  removeAnswer: index => updateQuestionData({ type: REMOVE, data: { index } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(SingleQuestion));
