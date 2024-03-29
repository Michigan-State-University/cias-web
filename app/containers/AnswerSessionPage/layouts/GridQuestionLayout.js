import React, { memo, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContainerQuery } from 'react-container-query';
import { useIntl } from 'react-intl';

import { colors, elements } from 'theme';
import useResizeObserver from 'utils/useResizeObserver';

import { containerBreakpoints } from 'components/Container/containerBreakpoints';
import Box from 'components/Box';
import Column from 'components/Column';
import Radio from 'components/Radio';
import Row from 'components/Row';
import { ScrollFogBox } from 'components/Box/ScrollFog';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';
import { HiddenText } from 'components/Text';

import messages from './messages';
import { FirstTH } from './styled';
import { generateGridAnswerId, generateGridQuestionId } from '../utils';

const IS_SMALL_SCREEN = 'IS_SMALL_SCREEN';
const SCROLL_FOG_BOX = 'SCROLL_FOG_BOX';
const FIRST_TH = 'FIRST_TH';

const QUERY = {
  [IS_SMALL_SCREEN]: {
    maxWidth: containerBreakpoints.sm,
  },
};

const GridQuestionLayout = ({
  rows,
  columns,
  check,
  selectedAnswersIndex,
  questionId,
  disabled,
  dynamicElementsDirection,
}) => {
  const { formatMessage } = useIntl();
  const [params, containerRef] = useContainerQuery(QUERY);

  const firstColRef = useRef(null);

  const { width: firstColWidth } = useResizeObserver({
    targetRef: firstColRef,
  });

  const style = useMemo(() => {
    if (params[IS_SMALL_SCREEN]) return {};

    return {
      [SCROLL_FOG_BOX]: {
        marginInlineStart: elements.grid.leftPadding,
        leftMargin: firstColWidth + elements.grid.leftPadding,
      },
      [FIRST_TH]: {
        style: { position: 'sticky', insetInlineStart: 0 },
      },
    };
  }, [params, firstColWidth]);

  const handleClick = (column, name, rowIndex, columnIndex) => () => {
    const { variable: { value } = {} } = column || {};
    check(value, name, rowIndex, columnIndex);
  };

  return (
    <Box width="100%" ref={containerRef} dir={dynamicElementsDirection}>
      <ScrollFogBox
        overflow="scroll"
        paddingInlineEnd={21}
        paddingBlock={14}
        horizontalFogVisible
        verticalFogVisible={false}
        {...style[SCROLL_FOG_BOX]}
      >
        <Table>
          <THead>
            <StripedTR color={colors.catskillWhite} bg={colors.white}>
              <FirstTH ref={firstColRef} scope="col" {...style[FIRST_TH]} />
              {columns.map((column, columnIndex) => (
                <TH
                  scope="col"
                  key={`question-${questionId}-col-th-${columnIndex}`}
                >
                  <Column id={generateGridAnswerId(columnIndex)}>
                    {column.payload}
                  </Column>
                </TH>
              ))}
            </StripedTR>
          </THead>

          <TBody>
            {rows.map((row, rowIndex) => (
              <StripedTR
                key={`question-${questionId}-row-th-${rowIndex}`}
                color={colors.catskillWhite}
                bg={colors.white}
              >
                <FirstTH scope="row" {...style[FIRST_TH]}>
                  <Column
                    maxWidth={elements.grid.firstColWidth}
                    width="max-content"
                    height="inherit"
                    padding={5}
                    id={generateGridQuestionId(rowIndex)}
                  >
                    {row.payload}
                  </Column>
                </FirstTH>

                {columns.map((column, columnIndex) => {
                  const isChecked =
                    selectedAnswersIndex[rowIndex] === columnIndex;

                  const cellId = `cell-${rowIndex}-${columnIndex}`;

                  return (
                    <TD
                      key={`question-${questionId}-row-cell-${rowIndex}-${columnIndex}`}
                    >
                      <Row
                        width="100%"
                        minWidth={elements.grid.colWidth}
                        align="center"
                        justify="center"
                      >
                        <Radio
                          id={cellId}
                          aria-labelledby={`${cellId} ${generateGridQuestionId(
                            rowIndex,
                          )} ${generateGridAnswerId(columnIndex)}`}
                          checked={isChecked}
                          onChange={handleClick(
                            column,
                            row.variable.name,
                            rowIndex,
                            columnIndex,
                          )}
                          disabled={disabled}
                        >
                          <HiddenText>
                            {formatMessage(messages.gridLabel, {
                              questionIndex: rowIndex + 1,
                              answerIndex: columnIndex + 1,
                            })}
                          </HiddenText>
                        </Radio>
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
  disabled: PropTypes.bool,
  dynamicElementsDirection: PropTypes.string,
};

export default memo(GridQuestionLayout);
