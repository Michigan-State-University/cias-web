import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import bin from 'assets/svg/bin-red.svg';
import checkbox from 'assets/svg/checkbox.svg';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors } from 'theme';

import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import Text from 'components/Text';
import OriginalTextHover from 'components/OriginalTextHover';
import { BadgeInput } from 'components/Input/BadgeInput';
import { DndSortable } from 'components/DragAndDrop';

import messages from './messages';
import { ADD, UPDATE, REMOVE } from './constants';
import { reorderAnswersAction } from './actions';

const CHECKBOX_MARGIN = 16;
const INPUT_PADDING = 15;

const MultiQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  reorderAnswers,
  isNarratorTab,
  editingPossible,
  intl: { formatMessage },
  dynamicElementsDirection,
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

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = (index) => () => {
    if (!isNarratorTabOrEditNotPossible) setHovered(index);
  };

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderAnswers(items);
  };

  return (
    <Column mt={10}>
      <DndSortable
        onDragEnd={onDragEnd}
        items={selectedQuestion.body.data}
        selector={null}
      >
        {({ item, index, dragHandleProps }) => (
          <Row>
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
                  dir={dynamicElementsDirection}
                >
                  <Row width="90%">
                    {!isNarratorTabOrEditNotPossible && (
                      <Img
                        alt={formatMessage(messages.reorderIconAlt, {
                          index,
                        })}
                        marginInlineEnd={10}
                        src={ReorderIcon}
                        disabled={false}
                        cursor="grab"
                        {...dragHandleProps}
                      />
                    )}

                    <Img
                      ref={checkboxButtonRef}
                      src={checkbox}
                      marginInlineEnd={CHECKBOX_MARGIN}
                    />
                    <OriginalTextHover
                      id={`question-${selectedQuestion.id}-answer-${index}`}
                      text={item?.original_text}
                      hidden={isNarratorTab}
                    >
                      <FlexibleWidthApprovableInput
                        fontSize={18}
                        type="singleline"
                        placeholder={formatMessage(messages.placeholder, {
                          index: index + 1,
                        })}
                        value={item.payload}
                        onCheck={(newTitle) =>
                          updateAnswer(index, { ...item, payload: newTitle })
                        }
                        richText
                        disabled={isNarratorTabOrEditNotPossible}
                        emptyWidth={105}
                      />
                    </OriginalTextHover>
                  </Row>
                  <Row>
                    <Box
                      onClick={() => removeAnswer(index)}
                      hidden={hovered !== index}
                      clickable
                    >
                      <Img src={bin} marginInlineEnd={16} />
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
                      globalMessages.variableNamePlaceholder,
                    )}
                    value={item.variable.name}
                    color={colors.jungleGreen}
                    onBlur={(val) =>
                      updateAnswer(index, {
                        ...item,
                        variable: { ...item.variable, name: val },
                      })
                    }
                    autoComplete="off"
                  />
                  <BadgeInput
                    disabled={!editingPossible}
                    px={0}
                    py={12}
                    textAlign="center"
                    validator={numericValidator}
                    keyboard="tel"
                    placeholder={formatMessage(
                      globalMessages.variableScorePlaceholder,
                    )}
                    value={item.variable.value}
                    color={colors.azure}
                    onBlur={(val) =>
                      updateAnswer(index, {
                        ...item,
                        variable: { ...item.variable, value: val },
                      })
                    }
                  />
                </Row>
              </Column>
            </HoverableBox>
          </Row>
        )}
      </DndSortable>
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
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  reorderAnswers: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  editingPossible: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = (dispatch) => ({
  addAnswer: () => dispatch(updateQuestionData({ type: ADD })),
  updateAnswer: (index, value) =>
    dispatch(updateQuestionData({ type: UPDATE, data: { index, value } })),
  removeAnswer: (index) =>
    dispatch(updateQuestionData({ type: REMOVE, data: { index } })),
  reorderAnswers: (items) => dispatch(reorderAnswersAction(items)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(MultiQuestion));
