import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import Text from 'components/Text';
import bin from 'assets/svg/bin-red.svg';
import globalMessages from 'global/i18n/globalMessages';
import radio from 'assets/svg/radio-button.svg';
import { BadgeInput } from 'components/Input/BadgeInput';
import { StyledInput } from 'components/Input/StyledInput';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import { Table, THead, TBody, StripedTR, TD, TH } from 'components/Table';
import OriginalTextHover from 'components/OriginalTextHover';
import { DndSortable } from 'components/DragAndDrop';

import scrollByRef from 'utils/scrollByRef';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors, elements } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';
import useResizeObserver from 'utils/useResizeObserver';

import ReorderIcon from 'assets/svg/reorder-hand.svg';

import messages from './messages';
import { FirstTH } from './styled';
import { reorderRowsAction, reorderColumnsAction } from './actions';

import {
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_ROW,
  UPDATE_COLUMN,
  DELETE_ROW,
  DELETE_COLUMN,
} from './constants';

const MINIMAL_COLUMNS_LENGTH = 2;
const MINIMAL_ROWS_LENGTH = 1;

const GridQuestion = ({
  selectedQuestion,
  addRow,
  addColumn,
  updateRow,
  updateColumn,
  deleteRow,
  deleteColumn,
  isNarratorTab,
  reorderRows,
  reorderColumns,
  editingPossible,
  dynamicElementsDirection,
  intl: { formatMessage },
}) => {
  const {
    payload: { rows, columns },
  } = selectedQuestion.body.data[0];

  const [hoveredRow, setHoveredRow] = useState(-1);
  const [hoveredColumn, setHoveredColumn] = useState(-1);

  const isNarratorTabOrEditNotPossible = isNarratorTab || !editingPossible;

  const containerRightRef = useRef(null);
  const containerBottomRef = useRef(null);

  const firstColRef = useRef(null);

  const { width: firstColWidth } = useResizeObserver({
    targetRef: firstColRef,
  });

  const handleAddColumn = async () => {
    await addColumn();
    scrollByRef(containerRightRef, {
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  const handleAddRow = async () => {
    await addRow();
    scrollByRef(containerBottomRef, { behavior: 'smooth' });
  };

  const getPlaceholder = (name, value) =>
    isNarratorTab ? '' : formatMessage(messages[name], { index: value });

  const onRowsDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderRows(items);
  };

  const onColumnsDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    reorderColumns(items);
  };

  return (
    <Column width="100%" maxWidth={elements.draggableContainerSize}>
      <Row justify="end" display="flex" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox
          paddingInline={21}
          paddingBlock={14}
          onClick={handleAddColumn}
        >
          <Box>
            <Row align="center">
              <PlusCircle marginInlineEnd={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addColumn)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>

      <Box width="100%" dir={dynamicElementsDirection}>
        <ScrollFogBox
          overflow="scroll"
          paddingInlineEnd={21}
          paddingBlock={14}
          marginInlineStart={isNarratorTab && elements.grid.leftPadding}
          horizontalFogVisible={isNarratorTab}
          verticalFogVisible={false}
          leftMargin={firstColWidth + elements.grid.leftPadding}
        >
          <Table>
            <THead>
              <StripedTR color={colors.catskillWhite} bg={colors.white}>
                <FirstTH
                  ref={firstColRef}
                  left={elements.grid.leftPadding}
                  isFixed={isNarratorTab}
                  scope="col"
                />
                <DndSortable
                  onDragEnd={onColumnsDragEnd}
                  items={columns}
                  selector={null}
                  itemTag={TH}
                  itemProps={{
                    scope: 'col',
                  }}
                  overlayProps={{
                    overlayWrapperTag: 'table',
                    renderOverlayInPortal: true,
                    overlayInternalWrapper: (children) => (
                      <thead>
                        <tr>
                          <TH>{children}</TH>
                        </tr>
                      </thead>
                    ),
                  }}
                >
                  {({ item: column, index: columnIndex, dragHandleProps }) => (
                    <div
                      onMouseEnter={() => setHoveredColumn(columnIndex)}
                      onMouseLeave={() => setHoveredColumn(-1)}
                    >
                      <Column
                        align="center"
                        width={isNarratorTab ? elements.grid.colWidth : '100%'}
                      >
                        <Box
                          paddingInline={8}
                          marginBlockEnd={8}
                          hidden={isNarratorTabOrEditNotPossible}
                          height={35}
                        >
                          <Img
                            clickable
                            onClick={() => deleteColumn(columnIndex)}
                            src={bin}
                            hidden={
                              columns.length <= MINIMAL_COLUMNS_LENGTH ||
                              hoveredColumn !== columnIndex
                            }
                          />
                        </Box>
                        {!isNarratorTabOrEditNotPossible && (
                          <Img
                            alt={formatMessage(messages.reorderIconAlt, {
                              index: columnIndex,
                            })}
                            src={ReorderIcon}
                            disabled={false}
                            cursor="grab"
                            marginBlockEnd={10}
                            marginBlockStart={20}
                            {...dragHandleProps}
                          />
                        )}
                        <Row
                          display="flex"
                          hidden={isNarratorTab}
                          marginBlockEnd={8}
                        >
                          <BadgeInput
                            disabled={!editingPossible}
                            paddingInline={0}
                            paddingBlock={12}
                            textAlign="center"
                            validator={numericValidator}
                            keyboard="tel"
                            placeholder={formatMessage(
                              globalMessages.variableScorePlaceholder,
                            )}
                            value={column.variable.value}
                            color={colors.azure}
                            onBlur={(val) =>
                              updateColumn(
                                { variable: { value: val } },
                                columnIndex,
                              )
                            }
                          />
                        </Row>
                        {isNarratorTab ? (
                          <Column
                            width={elements.grid.colWidth}
                            height="inherit"
                            justify="center"
                          >
                            {column.payload}
                          </Column>
                        ) : (
                          <OriginalTextHover
                            id={`question-${selectedQuestion.id}-column-${columnIndex}`}
                            text={column?.original_text}
                            hidden={isNarratorTab}
                            direction="column"
                            gap={8}
                          >
                            <StyledInput
                              disabled={isNarratorTabOrEditNotPossible}
                              cursor={
                                isNarratorTabOrEditNotPossible
                                  ? 'text'
                                  : 'pointer'
                              }
                              width={110}
                              paddingInline={0}
                              paddingBlock={12}
                              textAlign="center"
                              placeholder={getPlaceholder(
                                'columnPlaceholder',
                                columnIndex + 1,
                              )}
                              value={column.payload}
                              onBlur={(value) =>
                                updateColumn({ payload: value }, columnIndex)
                              }
                            />
                          </OriginalTextHover>
                        )}
                      </Column>
                    </div>
                  )}
                </DndSortable>
                <td ref={containerRightRef} />
              </StripedTR>
            </THead>
            <TBody>
              <DndSortable
                onDragEnd={onRowsDragEnd}
                items={rows}
                selector={null}
                itemTag={StripedTR}
                itemProps={{
                  color: colors.catskillWhite,
                  bg: colors.white,
                }}
                overlayProps={{
                  overlayWrapperTag: 'table',
                  renderOverlayInPortal: true,
                  overlayInternalWrapper: (children) => (
                    <tbody>
                      <StripedTR>{children}</StripedTR>
                    </tbody>
                  ),
                }}
              >
                {({ item: row, index: rowIndex, dragHandleProps }) => (
                  <>
                    <FirstTH
                      left={elements.grid.leftPadding}
                      isFixed={isNarratorTab}
                      scope="row"
                      onMouseEnter={() => setHoveredRow(rowIndex)}
                      onMouseLeave={() => setHoveredRow(-1)}
                    >
                      <Row align="center" height="100%" padding={5}>
                        <Box width={60} hidden={isNarratorTabOrEditNotPossible}>
                          <Img
                            clickable
                            onClick={() => deleteRow(rowIndex)}
                            src={bin}
                            hidden={
                              rows.length <= MINIMAL_ROWS_LENGTH ||
                              hoveredRow !== rowIndex
                            }
                          />
                          {rowIndex === rows.length - 1 && (
                            <div ref={containerBottomRef} />
                          )}
                        </Box>
                        {!isNarratorTabOrEditNotPossible && (
                          <Img
                            alt={formatMessage(messages.reorderIconAlt, {
                              index: rowIndex,
                            })}
                            marginInlineStart={20}
                            marginInlineEnd={10}
                            src={ReorderIcon}
                            disabled={false}
                            cursor="grab"
                            {...dragHandleProps}
                          />
                        )}
                        <Row align="center" justify="between" width="100%">
                          <Row
                            display="flex"
                            hidden={isNarratorTab}
                            marginInlineEnd={8}
                          >
                            <BadgeInput
                              disabled={!editingPossible}
                              paddingInline={0}
                              paddingBlock={12}
                              textAlign="center"
                              validator={variableNameValidator}
                              placeholder={formatMessage(
                                globalMessages.variableNamePlaceholder,
                              )}
                              value={row.variable.name}
                              color={colors.jungleGreen}
                              onBlur={(val) =>
                                updateRow({ variable: { name: val } }, rowIndex)
                              }
                              autoComplete="off"
                            />
                          </Row>
                          {isNarratorTab ? (
                            <Column
                              maxWidth={elements.grid.firstColWidth}
                              width="max-content"
                              height="inherit"
                              justify="center"
                            >
                              {row.payload}
                            </Column>
                          ) : (
                            <OriginalTextHover
                              id={`question-${selectedQuestion.id}-row-${rowIndex}`}
                              text={row?.original_text}
                              hidden={isNarratorTab}
                              width="100%"
                            >
                              <StyledInput
                                type="multiline"
                                rows="2"
                                disabled={isNarratorTabOrEditNotPossible}
                                cursor={
                                  isNarratorTabOrEditNotPossible
                                    ? 'text'
                                    : 'pointer'
                                }
                                width={elements.grid.firstColWidth}
                                paddingInline={0}
                                paddingBlock={12}
                                textAlign="center"
                                placeholder={getPlaceholder(
                                  'rowPlaceholder',
                                  rowIndex + 1,
                                )}
                                value={row.payload}
                                onBlur={(value) =>
                                  updateRow({ payload: value }, rowIndex)
                                }
                              />
                            </OriginalTextHover>
                          )}
                        </Row>
                      </Row>
                    </FirstTH>
                    {columns.map((_, columnIndex) => (
                      <TD
                        height="inherit"
                        key={`question-${selectedQuestion.id}-row-cell-${rowIndex}-${columnIndex}`}
                      >
                        <Row justify="center" align="center">
                          <Img src={radio} />
                        </Row>
                      </TD>
                    ))}
                  </>
                )}
              </DndSortable>
            </TBody>
          </Table>
        </ScrollFogBox>
      </Box>

      <Row justify="start" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox
          paddingInline={21}
          paddingBlock={14}
          marginBlockStart={20}
          onClick={handleAddRow}
        >
          <Box>
            <Row align="center" display="flex">
              <PlusCircle marginInlineEnd={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addRow)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>
    </Column>
  );
};

GridQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  addRow: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  editingPossible: PropTypes.bool,
  reorderRows: PropTypes.func,
  reorderColumns: PropTypes.func,
  dynamicElementsDirection: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  addRow: () => updateQuestionData({ type: ADD_ROW, data: {} }),
  addColumn: () => updateQuestionData({ type: ADD_COLUMN, data: {} }),
  updateRow: (value, index) =>
    updateQuestionData({ type: UPDATE_ROW, data: { value, index } }),

  updateColumn: (value, index) =>
    updateQuestionData({ type: UPDATE_COLUMN, data: { value, index } }),

  deleteRow: (index) =>
    updateQuestionData({ type: DELETE_ROW, data: { index } }),
  deleteColumn: (index) =>
    updateQuestionData({ type: DELETE_COLUMN, data: { index } }),
  reorderRows: (items) => reorderRowsAction(items),
  reorderColumns: (items) => reorderColumnsAction(items),
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default injectIntl(compose(withConnect)(GridQuestion));
