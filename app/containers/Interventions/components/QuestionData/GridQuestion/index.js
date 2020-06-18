import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import Text from 'components/Text';
import Question from 'models/Intervention/Question';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import { Table, THead, TBody, StripedTR, TD, TH } from 'components/Table';
import { StyledInput } from 'components/Input/StyledInput';
import radio from 'assets/svg/radio-button.svg';
import bin from 'assets/svg/bin-red.svg';

import { themeColors } from 'theme';
import { PlusCircle } from '../../../containers/EditInterventionPage/styled';
import messages from './messages';
import {
  ADD_ROW,
  ADD_COLUMN,
  UPDATE_ROW,
  UPDATE_COLUMN,
  DELETE_ROW,
  DELETE_COLUMN,
} from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const GridQuestion = ({
  selectedQuestion,
  addRow,
  addColumn,
  updateRow,
  updateColumn,
  deleteRow,
  deleteColumn,
  intl: { formatMessage },
}) => {
  const {
    payload: { rows, columns },
  } = selectedQuestion.body.data[0];

  const [hoveredRow, setHoveredRow] = useState(-1);
  const [hoveredColumn, setHoveredColumn] = useState(-1);

  return (
    <Box width="100%" px={21} py={14}>
      <Row justify="end">
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

      <Row align="center" justify="center">
        <Box px={10} overflow="scroll">
          <Table>
            <THead>
              <StripedTR>
                <TD />
                {columns.map((column, columnIndex) => (
                  <TH
                    scope="col"
                    key={`question-${
                      selectedQuestion.id
                    }-col-th-${columnIndex}`}
                    onMouseEnter={() => setHoveredColumn(columnIndex)}
                    onMouseLeave={() => setHoveredColumn(-1)}
                  >
                    <Column align="center">
                      <Box
                        px={8}
                        mb={8}
                        height={35}
                        onClick={() => deleteColumn(columnIndex)}
                        hidden={false}
                        clickable
                      >
                        <Img src={bin} hidden={hoveredColumn !== columnIndex} />
                      </Box>
                      <StyledInput
                        width={110}
                        px={0}
                        py={12}
                        textAlign="center"
                        placeholder={formatMessage(messages.columnPlaceholder, {
                          index: columnIndex + 1,
                        })}
                        value={column.payload}
                        onBlur={value => updateColumn(value, columnIndex)}
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
                    scope="row"
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(-1)}
                  >
                    <Row align="center">
                      <Box
                        px={8}
                        mr={16}
                        width={35}
                        onClick={() => deleteRow(rowIndex)}
                        clickable
                      >
                        <Img src={bin} hidden={hoveredRow !== rowIndex} />
                      </Box>
                      <StyledInput
                        width={110}
                        px={0}
                        py={12}
                        textAlign="center"
                        placeholder={formatMessage(messages.rowPlaceholder, {
                          index: rowIndex + 1,
                        })}
                        value={row.payload}
                        onBlur={value => updateRow(value, rowIndex)}
                      />
                    </Row>
                  </TH>
                  {columns.map((_, columnIndex) => (
                    <TD
                      key={`question-${
                        selectedQuestion.id
                      }-row-cell-${rowIndex}-${columnIndex}`}
                    >
                      <Row align="center" justify="center">
                        <Img src={radio} />
                      </Row>
                    </TD>
                  ))}
                </StripedTR>
              ))}
            </TBody>
          </Table>
        </Box>
      </Row>

      <Row justify="start">
        <HoverableBox px={21} py={14} mt={20} onClick={addRow}>
          <Box>
            <Row align="center">
              <PlusCircle mr={12} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.addRow)}
              </Text>
            </Row>
          </Box>
        </HoverableBox>
      </Row>
    </Box>
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
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = {
  addRow: () => updateQuestionData({ type: ADD_ROW, data: {} }),
  addColumn: () => updateQuestionData({ type: ADD_COLUMN, data: {} }),
  updateRow: (payload, index) =>
    updateQuestionData({ type: UPDATE_ROW, data: { payload, index } }),

  updateColumn: (payload, index) =>
    updateQuestionData({ type: UPDATE_COLUMN, data: { payload, index } }),

  deleteRow: index => updateQuestionData({ type: DELETE_ROW, data: { index } }),
  deleteColumn: index =>
    updateQuestionData({ type: DELETE_COLUMN, data: { index } }),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(GridQuestion));
