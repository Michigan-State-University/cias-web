import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { DragEndEvent } from '@dnd-kit/core';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import radio from 'assets/svg/radio-button.svg';
import bin from 'assets/svg/bin-red.svg';

import {
  makeSelectSelectedQuestion,
  updateQuestionData,
  makeSelectHenryFordInitialScreenExists,
} from 'global/reducers/questions';
import globalMessages from 'global/i18n/globalMessages';
import { hfhValueValidator, numericValidator } from 'utils/validators';
import { canEdit } from 'models/Status/statusPermissions';
import { RootState } from 'global/reducers';
import { HenryFordQuestionDTO } from 'models/Question';
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
import { CommonQuestionProps } from '../types';

const RADIO_MARGIN = 16;
const INPUT_PADDING = 15;

type Props = CommonQuestionProps;

const HenryFordQuestion = ({ isNarratorTab, interventionStatus }: Props) => {
  const { formatMessage } = useIntl();

  const selectedQuestion = useSelector<RootState, HenryFordQuestionDTO>(
    makeSelectSelectedQuestion(),
  );

  const henryFordInitialScreenExists = useSelector(
    makeSelectHenryFordInitialScreenExists(),
  );

  const dispatch = useDispatch();

  const addAnswer = () => dispatch(updateQuestionData({ type: ADD }));

  const updateAnswer = (index: number, value: any) =>
    dispatch(
      updateQuestionData({ type: UPDATE_ANSWER, data: { index, value } }),
    );

  const removeAnswer = (index: number) =>
    dispatch(updateQuestionData({ type: REMOVE, data: { index } }));

  const radioButtonRef = useRef<Nullable<HTMLImageElement>>(null);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [leftMargin, setLeftMargin] = useState(0);

  useEffect(() => {
    if (radioButtonRef.current)
      setLeftMargin(
        radioButtonRef.current.width + RADIO_MARGIN + INPUT_PADDING,
      );
  }, [radioButtonRef.current]);

  const { data } = selectedQuestion.body;

  const editingPossible = canEdit(interventionStatus);
  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const handleMouseEnter = (index: number) => () => {
    if (!isNarratorTabOrEditNotPossible) setHoveredIndex(index);
  };

  const onDragEnd = (
    _: DragEndEvent,
    items: HenryFordQuestionDTO['body']['data'],
    hasChanged: boolean,
  ) => {
    if (!hasChanged) return;

    dispatch(reorderAnswersAction(items));
  };

  return (
    <Column mt={10}>
      <DndSortable onDragEnd={onDragEnd} items={data} selector={null}>
        {({ item, index, dragHandleProps }) => {
          const onUpdateAnswer = (
            updateValue: Partial<HenryFordQuestionDTO['body']['data'][0]>,
          ) => updateAnswer(index, { ...item, ...updateValue });
          return (
            <Row>
              <HoverableBox
                hoverColor={isNarratorTabOrEditNotPossible ? null : undefined}
                px={21}
                py={14}
                width="100%"
                onMouseEnter={handleMouseEnter(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                clickable={false}
              >
                <Column>
                  <Row
                    align="center"
                    justify="between"
                    mb={isNarratorTabOrEditNotPossible ? 0 : 10}
                  >
                    <Row width="90%">
                      {!isNarratorTabOrEditNotPossible && (
                        <Img
                          alt={formatMessage(messages.reorderIconAlt, {
                            index,
                          })}
                          mr={10}
                          src={ReorderIcon}
                          disabled={false}
                          cursor="grab"
                          {...dragHandleProps}
                        />
                      )}

                      <Img ref={radioButtonRef} src={radio} mr={RADIO_MARGIN} />
                      <OriginalTextHover
                        text={item?.original_text || ''}
                        hidden={isNarratorTab}
                        id={`answer-${index}`}
                      >
                        <FlexibleWidthApprovableInput
                          mr={8}
                          fontSize={18}
                          type="singleline"
                          placeholder={formatMessage(messages.placeholder, {
                            index: index + 1,
                          })}
                          value={item.payload}
                          onCheck={(payload: string) =>
                            onUpdateAnswer({ payload })
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
                        hidden={hoveredIndex !== index}
                        clickable
                      >
                        <Img src={bin} mr={16} />
                      </Box>
                    </Row>
                  </Row>
                  <Row align="center" hidden={isNarratorTab}>
                    <BadgeInput
                      data-cy={`score-${index}-input`}
                      ml={`${leftMargin}px`}
                      disabled={!editingPossible}
                      px={0}
                      py={12}
                      textAlign="center"
                      validator={numericValidator}
                      keyboard="tel"
                      placeholder={formatMessage(
                        // @ts-ignore
                        globalMessages.variables.variableScorePlaceholder,
                      )}
                      value={item.value}
                      color={colors.azure}
                      onBlur={(value: string) => onUpdateAnswer({ value })}
                    />
                    <BadgeInput
                      ml={10}
                      disabled={
                        !editingPossible || !henryFordInitialScreenExists
                      }
                      px={0}
                      py={12}
                      textAlign="center"
                      placeholder={formatMessage(
                        // @ts-ignore
                        globalMessages.variables.hfhValuePlaceholder,
                      )}
                      value={item.hfh_value}
                      color={colors.kleinBlue}
                      bg={colors.titanWhite}
                      validator={hfhValueValidator}
                      bgOpacity={1}
                      onBlur={(hfhValue: string) =>
                        onUpdateAnswer({ hfh_value: hfhValue })
                      }
                    />
                  </Row>
                </Column>
              </HoverableBox>
            </Row>
          );
        }}
      </DndSortable>
      <Row hidden={isNarratorTabOrEditNotPossible}>
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

export default HenryFordQuestion;
