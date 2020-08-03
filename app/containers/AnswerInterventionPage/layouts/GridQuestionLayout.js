import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Column from 'components/Column';
import Radio from 'components/Radio';
import Row from 'components/Row';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';

const GridQuestionLayout = ({
  rows,
  columns,
  check,
  selectedAnswersIndex,
  questionId,
}) => {
  const handleClick = (column, name, rowIndex, columnIndex) => () => {
    const { payload, variable: { value } = {} } = column || {};
    check(payload, value, name, rowIndex, columnIndex);
  };
  return (
    <Row align="center" justify="center" width="100%">
      <Box overflow="scroll" px={21} py={14}>
        <Table>
          <THead>
            <StripedTR>
              <TH scope="col" />
              {columns.map((column, columnIndex) => (
                <TH
                  scope="col"
                  key={`question-${questionId}-col-th-${columnIndex}`}
                >
                  <Column>{column.payload}</Column>
                </TH>
              ))}
            </StripedTR>
          </THead>
          <TBody>
            {rows.map((row, rowIndex) => (
              <StripedTR key={`question-${questionId}-row-th-${rowIndex}`}>
                <TH scope="row">
                  <Column>{row.payload}</Column>
                </TH>
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
    </Row>
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
