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

import Question from 'models/Session/Question';
import scrollByRef from 'utils/scrollByRef';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors, elements } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import { canEdit } from 'models/Status/statusPermissions';
import useResizeObserver from 'utils/useResizeObserver';
import messages from './messages';

import { FirstTH } from './styled';

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
  interventionStatus,
  intl: { formatMessage },
}) => {
  const {
    payload: { rows, columns },
  } = selectedQuestion.body.data[0];

  const [hoveredRow, setHoveredRow] = useState(-1);
  const [hoveredColumn, setHoveredColumn] = useState(-1);

  const editingPossible = canEdit(interventionStatus);
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

  return (
    <Column width="100%" maxWidth={elements.draggableContainerSize}>
      <Row justify="end" display="flex" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox px={21} py={14} onClick={handleAddColumn}>
          <Box>
            <Row align="center">
              <PlusCircle mr={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addColumn)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>

      <Box width="100%">
        <ScrollFogBox
          overflow="scroll"
          pr={21}
          py={14}
          ml={isNarratorTab && elements.grid.leftPadding}
          horizontalFogVisible={isNarratorTab}
          verticalFogVisible={false}
          leftMargin={firstColWidth + elements.grid.leftPadding}
        >
          <Table>
            <THead>
              <StripedTR color={colors.catskillWhite} bg={colors.zirkon}>
                <FirstTH
                  ref={firstColRef}
                  left={elements.grid.leftPadding}
                  isFixed={isNarratorTab}
                  scope="col"
                />
                {columns.map((column, columnIndex) => (
                  <TH
                    scope="col"
                    key={`question-${
                      selectedQuestion.id
                    }-col-th-${columnIndex}`}
                    onMouseEnter={() => setHoveredColumn(columnIndex)}
                    onMouseLeave={() => setHoveredColumn(-1)}
                  >
                    <Column
                      align="center"
                      width={isNarratorTab ? elements.grid.colWidth : '100%'}
                    >
                      <Box
                        px={8}
                        mb={8}
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
                      <Row display="flex" hidden={isNarratorTab} mb={8}>
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
                          value={column.variable.value}
                          color={colors.azure}
                          onBlur={val =>
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
                        <StyledInput
                          disabled={isNarratorTabOrEditNotPossible}
                          cursor={
                            isNarratorTabOrEditNotPossible ? 'text' : 'pointer'
                          }
                          width={110}
                          px={0}
                          py={12}
                          textAlign="center"
                          placeholder={getPlaceholder(
                            'columnPlaceholder',
                            columnIndex + 1,
                          )}
                          value={column.payload}
                          onBlur={value =>
                            updateColumn({ payload: value }, columnIndex)
                          }
                        />
                      )}
                    </Column>
                  </TH>
                ))}
                <td ref={containerRightRef} />
              </StripedTR>
            </THead>
            <TBody>
              {rows.map((row, rowIndex) => (
                <StripedTR
                  key={`question-${selectedQuestion.id}-row-th-${rowIndex}`}
                  color={colors.catskillWhite}
                  bg={colors.zirkon}
                >
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
                      <Row align="center" justify="between" width="100%">
                        <Row display="flex" hidden={isNarratorTab} mr={8}>
                          <BadgeInput
                            disabled={!editingPossible}
                            px={0}
                            py={12}
                            textAlign="center"
                            validator={variableNameValidator}
                            placeholder={formatMessage(
                              globalMessages.variables.variableNamePlaceholder,
                            )}
                            value={row.variable.name}
                            color={colors.jungleGreen}
                            onBlur={val =>
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
                            px={0}
                            py={12}
                            textAlign="center"
                            placeholder={getPlaceholder(
                              'rowPlaceholder',
                              rowIndex + 1,
                            )}
                            value={row.payload}
                            onBlur={value =>
                              updateRow({ payload: value }, rowIndex)
                            }
                          />
                        )}
                      </Row>
                    </Row>
                  </FirstTH>
                  {columns.map((_, columnIndex) => (
                    <TD
                      height="inherit"
                      key={`question-${
                        selectedQuestion.id
                      }-row-cell-${rowIndex}-${columnIndex}`}
                    >
                      <Row justify="center" align="center">
                        <Img src={radio} />
                      </Row>
                    </TD>
                  ))}
                </StripedTR>
              ))}
            </TBody>
          </Table>
        </ScrollFogBox>
      </Box>

      <Row justify="start" hidden={isNarratorTabOrEditNotPossible}>
        <HoverableBox px={21} py={14} mt={20} onClick={handleAddRow}>
          <Box>
            <Row align="center" display="flex">
              <PlusCircle mr={12} />
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
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  addRow: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  isNarratorTab: PropTypes.bool,
  interventionStatus: PropTypes.string,
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

  deleteRow: index => updateQuestionData({ type: DELETE_ROW, data: { index } }),
  deleteColumn: index =>
    updateQuestionData({ type: DELETE_COLUMN, data: { index } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(GridQuestion));
