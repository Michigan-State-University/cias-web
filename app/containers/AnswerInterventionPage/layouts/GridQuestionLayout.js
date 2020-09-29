import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Column from 'components/Column';
import Radio from 'components/Radio';
import Row from 'components/Row';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';

import { elements } from 'theme';

import { FirstTH } from './styled';

const GridQuestionLayout = ({
  rows,
  columns,
  check,
  selectedAnswersIndex,
  questionId,
}) => {
  const handleClick = (column, name, rowIndex, columnIndex) => () => {
    const { variable: { value } = {} } = column || {};
    check(value, name, rowIndex, columnIndex);
  };
  return (
    <Box width="100%">
      <Box
        overflow="scroll"
        pr={21}
        py={14}
        ml={elements.grid.colWidth + elements.grid.leftPadding}
      >
        <Table>
          <THead>
            <StripedTR>
              <FirstTH left={elements.grid.leftPadding} scope="col" />
              {columns.map((column, columnIndex) => (
                <TH
                  scope="col"
                  key={`question-${questionId}-col-th-${columnIndex}`}
                >
                  <Column width="inherit">{column.payload}</Column>
                </TH>
              ))}
            </StripedTR>
          </THead>
          <TBody>
            {rows.map((row, rowIndex) => (
              <StripedTR key={`question-${questionId}-row-th-${rowIndex}`}>
                <FirstTH left={elements.grid.leftPadding} scope="row">
                  <Column width="inherit" height="inherit" justify="center">
                    {row.payload}
                  </Column>
                </FirstTH>
                {columns.map((column, columnIndex) => {
                  const isChecked =
                    selectedAnswersIndex[rowIndex] === columnIndex;
                  return (
                    <TD
                      key={`question-${questionId}-row-cell-${rowIndex}-${columnIndex}`}
                    >
                      <Row
                        align="center"
                        justify="center"
                        onClick={handleClick(
                          column,
                          row.variable.name,
                          rowIndex,
                          columnIndex,
                        )}
                      >
                        <Radio checked={isChecked} />
                      </Row>
                    </TD>
                  );
                })}
              </StripedTR>
            ))}
          </TBody>
        </Table>
      </Box>
    </Box>
  );
};

GridQuestionLayout.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  check: PropTypes.func,
  selectedAnswersIndex: PropTypes.object,
  questionId: PropTypes.string,
};

export default GridQuestionLayout;
