import React, { useState } from 'react';
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
import Question from 'models/Intervention/Question';
import Row from 'components/Row';
import Text from 'components/Text';
import bin from 'assets/svg/bin-red.svg';
import globalMessages from 'global/i18n/globalMessages';
import radio from 'assets/svg/radio-button.svg';
import { BadgeInput } from 'components/Input/BadgeInput';
import { StyledInput } from 'components/Input/StyledInput';
import { Table, THead, TBody, StripedTR, TD, TH } from 'components/Table';
import { numericValidator, variableNameValidator } from 'utils/validators';
import { themeColors, colors, elements } from 'theme';
import {
  makeSelectSelectedQuestion,
  updateQuestionData,
} from 'global/reducers/questions';

import messages from './messages';

import {
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_ROW,
  UPDATE_COLUMN,
  DELETE_ROW,
  DELETE_COLUMN,
} from './constants';

const GridQuestion = ({
  selectedQuestion,
  addRow,
  addColumn,
  updateRow,
  updateColumn,
  deleteRow,
  deleteColumn,
  isNarratorTab,
  intl: { formatMessage },
}) => {
  const {
    payload: { rows, columns },
  } = selectedQuestion.body.data[0];

  const [hoveredRow, setHoveredRow] = useState(-1);
  const [hoveredColumn, setHoveredColumn] = useState(-1);

  const getPlaceholder = (name, value) =>
    isNarratorTab ? '' : formatMessage(messages[name], { index: value });

  return (
    <Column
      width="100%"
      overflow="scroll"
      maxHeight={elements.draggableContainerSize}
      maxWidth={elements.draggableContainerSize - 150}
    >
      <Row justify="end" display="flex" hidden={isNarratorTab}>
        <HoverableBox px={21} py={14} onClick={addColumn}>
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

      <Row overflow="scroll">
        <Table overflow="scroll">
          <THead>
            <StripedTR>
              <TD />
              {columns.map((column, columnIndex) => (
                <TH
                  scope="col"
                  key={`question-${selectedQuestion.id}-col-th-${columnIndex}`}
                  onMouseEnter={() => setHoveredColumn(columnIndex)}
                  onMouseLeave={() => setHoveredColumn(-1)}
                >
                  <Column align="center">
                    <Box
                      px={8}
                      mb={8}
                      onClick={() => deleteColumn(columnIndex)}
                      hidden={isNarratorTab}
                      clickable
                      height={35}
                    >
                      <Img src={bin} hidden={hoveredColumn !== columnIndex} />
                    </Box>
                    <Row display="flex" hidden={isNarratorTab} mb={8}>
                      <BadgeInput
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
                    <StyledInput
                      disabled={isNarratorTab}
                      cursor={isNarratorTab ? 'text' : 'pointer'}
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
                  </Column>
                </TH>
              ))}
            </StripedTR>
          </THead>
          <TBody>
            {rows.map((row, rowIndex) => (
              <StripedTR
                key={`question-${selectedQuestion.id}-row-th-${rowIndex}`}
              >
                <TH
                  width="auto"
                  scope="row"
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(-1)}
                >
                  <Row align="center">
                    <Box
                      width={60}
                      onClick={() => deleteRow(rowIndex)}
                      clickable
                      hidden={isNarratorTab}
                    >
                      <Img src={bin} hidden={hoveredRow !== rowIndex} />
                    </Box>
                    <Row align="center" justify="between" width="100%">
                      <Row display="flex" hidden={isNarratorTab} mr={8}>
                        <BadgeInput
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
                        />
                      </Row>
                      <StyledInput
                        disabled={isNarratorTab}
                        cursor={isNarratorTab ? 'text' : 'pointer'}
                        width={110}
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
                    </Row>
                  </Row>
                </TH>
                {columns.map((_, columnIndex) => (
                  <TD
                    key={`question-${
                      selectedQuestion.id
                    }-row-cell-${rowIndex}-${columnIndex}`}
                  >
                    <Row justify="center">
                      <Img src={radio} />
                    </Row>
                  </TD>
                ))}
              </StripedTR>
            ))}
          </TBody>
        </Table>
      </Row>

      <Row justify="start" hidden={isNarratorTab}>
        <HoverableBox px={21} py={14} mt={20} onClick={addRow}>
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
