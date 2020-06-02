import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Question from 'models/Intervention/Question';
import ApprovableInput from 'components/Input/ApprovableInput';
import Box from 'components/Box';
import Img from 'components/Img';
import { Table, THead, TBody, TR, TD, TH } from 'components/Table';
import radio from 'assets/svg/radio-button.svg';

import { colors } from 'theme/colors';
import messages from './messages';
import { UPDATE } from './constants';

import { makeSelectSelectedQuestion } from '../../../containers/EditInterventionPage/selectors';
import { updateQuestionData } from '../../../containers/EditInterventionPage/actions';

const GridQuestion = ({
  selectedQuestion,
  updateAnswer,
  intl: { formatMessage },
}) => {
  const {
    variable,
    payload: { rows, columns },
  } = selectedQuestion.body.data[0];
  return (
    <Box width="100%" px={21} py={14} mt={20}>
      <Table>
        <THead>
          <TR>
            <TD />
            {columns.map((column, columnIndex) => (
              <TH scope="col">{column.payload}</TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {rows.map((row, rowIndex) => (
            <TR>
              <TH scope="row">{row.payload}</TH>
              {columns.map((column, columnIndex) => (
                <TD>
                  <Row align="center" justify="center">
                    <Img src={radio} />
                  </Row>
                </TD>
              ))}
            </TR>
          ))}
        </TBody>
      </Table>
    </Box>
  );
};

GridQuestion.propTypes = {
  selectedQuestion: PropTypes.shape(Question).isRequired,
  intl: PropTypes.object.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const mapDispatchToProps = dispatch => ({
  updateAnswer: value =>
    dispatch(updateQuestionData({ type: UPDATE, data: { value } })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(GridQuestion));
