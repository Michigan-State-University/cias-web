import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import bin from 'assets/svg/bin-red.svg';
import globalMessages from 'global/i18n/globalMessages';
import radio from 'assets/svg/radio-button.svg';
import { BadgeInput } from 'components/Input/BadgeInput';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';

import messages from './messages';
import { ADD, UPDATE_ANSWER, REMOVE, UPDATE_VARIABLE } from './constants';
import { PlusCircle } from '../../../containers/EditInterventionPage/styled';
import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const RADIO_MARGIN = 16;
const INPUT_PADDING = 15;

const SingleQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  updateVariable,
  isNarratorTab,
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

  const handleMouseEnter = index => () => {
    if (!isNarratorTab) setHovered(index);
  };
  return (
    <Column mt={10}>
      <Row display="flex" hidden={isNarratorTab} mb={10} ml={24}>
        <BadgeInput
          px={0}
          py={12}
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
      </Row>
      {data.map((value, index) => (
        <Row key={`question-${selectedQuestion.id}-el-${index}`}>
          <HoverableBox
            hoverColor={isNarratorTab ? null : undefined}
            px={21}
            py={14}
            width="100%"
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={() => setHovered(-1)}
            clickable={false}
          >
            <Column>
              <Row align="center" justify="between" mb={isNarratorTab ? 0 : 10}>
                <Row width="90%">
                  <Img ref={radioButtonRef} src={radio} mr={RADIO_MARGIN} />
                  <Box width="100%">
                    <ApprovableInput
                      mr={8}
                      fontSize={18}
                      type="singleline"
                      placeholder={
                        !isNarratorTab
                          ? formatMessage(messages.placeholder, {
                              index: index + 1,
                            })
                          : ''
                      }
                      value={value.payload}
                      onCheck={newTitle =>
                        updateAnswer(index, { ...value, payload: newTitle })
                      }
                      richText
                      disabled={isNarratorTab}
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
              <Row align="center" display="flex" hidden={isNarratorTab}>
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
                  placeholder={
                    !isNarratorTab
                      ? formatMessage(globalMessages.variables.emptyBadge, {
                          index: index + 1,
                        })
                      : ''
                  }
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
      <Row display="flex" hidden={isNarratorTab}>
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
  isNarratorTab: PropTypes.bool,
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
