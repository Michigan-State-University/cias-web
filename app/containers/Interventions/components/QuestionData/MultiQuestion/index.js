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
import PlusCircle from 'components/Circle/PlusCircle';
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import bin from 'assets/svg/bin-red.svg';
import checkbox from 'assets/svg/checkbox.svg';
import globalMessages from 'global/i18n/globalMessages';
import { BadgeInput } from 'components/Input/BadgeInput';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import { canEdit } from 'models/Status/statusPermissions';

import messages from './messages';
import { ADD, UPDATE, REMOVE } from './constants';

const CHECKBOX_MARGIN = 16;
const INPUT_PADDING = 15;

const MultiQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  isNarratorTab,
  problemStatus,
  intl: { formatMessage },
}) => {
  const checkboxButtonRef = useRef(null);

  const [hovered, setHovered] = useState(-1);
  const [leftMargin, setLeftMargin] = useState(0);

  useEffect(() => {
    if (checkboxButtonRef.current)
      setLeftMargin(
        checkboxButtonRef.current.width + CHECKBOX_MARGIN + INPUT_PADDING,
      );
  }, [checkboxButtonRef.current]);

  const editingPossible = canEdit(problemStatus);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = index => () => {
    if (!isNarratorTabOrEditNotPossible) setHovered(index);
  };

  return (
    <Column mt={10}>
      {selectedQuestion.body.data.map((value, index) => (
        <Row key={`question-${selectedQuestion.id}-el-${index}`}>
          <HoverableBox
            hoverColor={isNarratorTabOrEditNotPossible ? null : undefined}
            px={21}
            py={14}
            width="100%"
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={() => setHovered(-1)}
            clickable={false}
          >
            <Column>
              <Row
                align="center"
                justify="between"
                mb={isNarratorTabOrEditNotPossible ? 0 : 10}
              >
                <Row width="90%">
                  <Img
                    ref={checkboxButtonRef}
                    src={checkbox}
                    mr={CHECKBOX_MARGIN}
                  />
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
                      disabled={isNarratorTabOrEditNotPossible}
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
                <BadgeInput
                  disabled={!editingPossible}
                  px={0}
                  py={12}
                  ml={`${leftMargin}px`}
                  mr={10}
                  textAlign="center"
                  validator={variableNameValidator}
                  placeholder={formatMessage(
                    globalMessages.variables.variableNamePlaceholder,
                  )}
                  value={value.variable.name}
                  color={colors.jungleGreen}
                  onBlur={val =>
                    updateAnswer(index, {
                      ...value,
                      variable: { ...value.variable, name: val },
                    })
                  }
                />
                <BadgeInput
                  disabled={!editingPossible}
                  px={0}
                  py={12}
                  textAlign="center"
                  validator={numericValidator}
                  keyboard="tel"
                  placeholder={formatMessage(
                    globalMessages.variables.variableScorePlaceholder,
                  )}
                  value={value.variable.value}
                  color={colors.azure}
                  onBlur={val =>
                    updateAnswer(index, {
                      ...value,
                      variable: { ...value.variable, value: val },
                    })
                  }
                />
              </Row>
            </Column>
          </HoverableBox>
        </Row>
      ))}
      <Row display="flex" hidden={isNarratorTabOrEditNotPossible}>
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
  isNarratorTab: PropTypes.bool,
  problemStatus: PropTypes.string,
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
