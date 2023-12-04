import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import radio from 'assets/svg/radio-button.svg';
import bin from 'assets/svg/bin-red.svg';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { numericValidator } from 'utils/validators';
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
import { ADD, UPDATE_ANSWER, REMOVE } from './constants';
import { reorderAnswersAction } from './actions';

const RADIO_MARGIN = 16;
const INPUT_PADDING = 15;

const SingleQuestion = ({
  selectedQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  reorderAnswers,
  isNarratorTab,
  intl: { formatMessage },
  editingPossible,
  dynamicElementsDirection,
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

  const { data } = selectedQuestion.body;

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = (index) => () => {
    if (!isNarratorTabOrEditNotPossible) setHovered(index);
  };

  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderAnswers(items);
  };

  return (
    <Column marginBlockStart={10}>
      <DndSortable onDragEnd={onDragEnd} items={data} selector={null}>
        {({ item, index, dragHandleProps }) => (
          <Row dir={dynamicElementsDirection}>
            <HoverableBox
              hoverColor={isNarratorTabOrEditNotPossible ? null : undefined}
              paddingInline={21}
              paddingBlock={14}
              width="100%"
              onMouseEnter={handleMouseEnter(index)}
              onMouseLeave={() => setHovered(-1)}
              clickable={false}
            >
              <Column>
                <Row
                  align="center"
                  justify="between"
                  marginBlockEnd={isNarratorTabOrEditNotPossible ? 0 : 10}
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
                      ref={radioButtonRef}
                      src={radio}
                      marginInlineEnd={RADIO_MARGIN}
                    />
                    <OriginalTextHover
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
                <Row align="center" hidden={isNarratorTab}>
                  <Row marginInlineStart={`${leftMargin}px`}>
                    <BadgeInput
                      data-cy={`score-${index}-input`}
                      disabled={!editingPossible}
                      paddingInline={0}
                      paddingBlock={12}
                      textAlign="center"
                      validator={numericValidator}
                      keyboard="tel"
                      placeholder={
                        !isNarratorTab
                          ? formatMessage(
                              globalMessages.variableScorePlaceholder,
                            )
                          : ''
                      }
                      value={item.value}
                      color={colors.azure}
                      onBlur={(val) =>
                        updateAnswer(index, {
                          ...item,
                          value: val,
                        })
                      }
                    />
                  </Row>
                </Row>
              </Column>
            </HoverableBox>
          </Row>
        )}
      </DndSortable>
      <Row hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox paddingInline={21} paddingBlock={14} onClick={addAnswer}>
          <Box>
            <Row align="center">
              <PlusCircle marginInlineEnd={12} />
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

const mapDispatchToProps = {
  addAnswer: () => updateQuestionData({ type: ADD }),
  updateAnswer: (index, value) =>
    updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),
  removeAnswer: (index) =>
    updateQuestionData({ type: REMOVE, data: { index } }),
  reorderAnswers: reorderAnswersAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(SingleQuestion));
