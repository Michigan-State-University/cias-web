import React, { useState, useRef, useEffect } from 'react';
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

import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE, UPDATE_VARIABLE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { PlusCircle } from '../../../containers/EditInterventionPage/styled';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const RADIO_MARGIN = 16;
const INPUT_PADDING = 15;

const SingleQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  updateVariable,
  intl: { formatMessage },
}) => {
  const radioButtonRef = useRef(null);

  const [hovered, setHovered] = useState(-1);
  const [leftMargin, setLeftMargin] = useState(0);

  useEffect(() => {
    if (radioButtonRef.current)
      setLeftMargin(
        radioButtonRef.current.width + RADIO_MARGIN + INPUT_PADDING,
      );
  }, [radioButtonRef.current]);

  const { data, variable } = selectedQuestion.body;

  return (
    <Column mt={10}>
      <BadgeInput
        px={0}
        py={12}
        mb={10}
        ml={24}
        textAlign="center"
        keyboard="tel"
        validator={variableNameValidator}
        placeholder={formatMessage(
          globalMessages.variables.variableNamePlaceholder,
        )}
        value={variable.name}
        color={colors.jungleGreen}
        onBlur={val => updateVariable(val)}
      />
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
            <Column>
              <Row align="center" justify="between" mb={10}>
                <Row width="90%">
                  <Img ref={radioButtonRef} src={radio} mr={RADIO_MARGIN} />
                  <Box width="100%">
                    <ApprovableInput
                      mr={8}
                      fontSize={18}
                      type="singleline"
                      placeholder={formatMessage(messages.placeholder, {
                        index: index + 1,
                      })}
                      value={value.payload}
                      onCheck={newTitle =>
                        updateAnswer(index, { ...value, payload: newTitle })
                      }
                      richText
                    />
                  </Box>
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
              <Row align="center">
                <Text
                  ml={`${leftMargin}px`}
                  mr={8}
                  fontWeight="bold"
                  color={colors.azure}
                >
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
  updateVariable: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  addAnswer: () => updateQuestionData({ type: ADD }),
  updateAnswer: (index, value) =>
    updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),
  updateVariable: name =>
    updateQuestionData({ type: UPDATE_VARIABLE, data: { name } }),
  removeAnswer: index => updateQuestionData({ type: REMOVE, data: { index } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(SingleQuestion));
