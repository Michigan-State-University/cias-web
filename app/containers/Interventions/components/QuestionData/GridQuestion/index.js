import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Text from 'components/Text';
import Question from 'models/Intervention/Question';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import { Table, THead, TBody, StyledTR, TD, TH } from 'components/Table';
import { StyledInput } from 'components/Input/StyledInput';
import radio from 'assets/svg/radio-button.svg';

import { themeColors } from 'theme';
import { PlusCircle } from '../../../containers/EditInterventionPage/styled';
import messages from './messages';
import { ADD_ROW, ADD_COLUMN, UPDATE_ROW, UPDATE_COLUMN } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const GridQuestion = ({
  selectedQuestion,
  addRow,
  addColumn,
  updateRow,
  updateColumn,
  intl: { formatMessage },
}) => {
  const {
    payload: { rows, columns },
  } = selectedQuestion.body.data[0];

  return (
    <Box width="100%" px={21} py={14} mt={20}>
      <Row justify="end">
        <HoverableBox px={21} py={14} mb={20} onClick={addColumn}>
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
              <StyledTR>
                <TD />
                {columns.map((column, columnIndex) => (
                  <TH scope="col">
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
                  </TH>
                ))}
              </StyledTR>
            </THead>
            <TBody>
              {rows.map((row, rowIndex) => (
                <StyledTR>
                  <TH scope="row">
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
                  </TH>
                  {columns.map(() => (
                    <TD>
                      <Row align="center" justify="center">
                        <Img src={radio} />
                      </Row>
                    </TD>
                  ))}
                </StyledTR>
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
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  addRow: () => dispatch(updateQuestionData({ type: ADD_ROW, data: {} })),
  addColumn: () => dispatch(updateQuestionData({ type: ADD_COLUMN, data: {} })),
  updateRow: (payload, index) =>
    dispatch(
      updateQuestionData({ type: UPDATE_ROW, data: { payload, index } }),
    ),
  updateColumn: (payload, index) =>
    dispatch(
      updateQuestionData({ type: UPDATE_COLUMN, data: { payload, index } }),
    ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(GridQuestion));
