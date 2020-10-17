import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Column from 'components/Column';
import Radio from 'components/Radio';
import Row from 'components/Row';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';

import { colors, elements } from 'theme';

import useComponentSize from 'utils/useComponentSize';
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

  const firstColRef = useRef(null);

  const { width: firstColWidth } = useComponentSize(firstColRef);

  return (
    <Box width="100%">
      <ScrollFogBox
        overflow="scroll"
        pr={21}
        py={14}
        ml={elements.grid.leftPadding}
        horizontalFogVisible
        verticalFogVisible={false}
        leftMargin={firstColWidth + elements.grid.leftPadding}
      >
        <Table>
          <THead>
            <StripedTR color={colors.catskillWhite} bg={colors.zirkon}>
              <FirstTH
                ref={firstColRef}
                left={elements.grid.leftPadding}
                scope="col"
              />
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
              <StripedTR
                key={`question-${questionId}-row-th-${rowIndex}`}
                color={colors.catskillWhite}
                bg={colors.zirkon}
              >
                <FirstTH left={elements.grid.leftPadding} scope="row">
                  <Column
                    maxWidth={elements.grid.firstColWidth}
                    width="max-content"
                    height="inherit"
                    justify="center"
                    padding={5}
                  >
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
                        width={elements.grid.colWidth}
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
      </ScrollFogBox>
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
