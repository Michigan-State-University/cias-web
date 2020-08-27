import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Column from 'components/Column';
import Row from 'components/Row';
import NoContent from 'components/NoContent';

import ButtonComponent from './ButtonComponent';
import QuestionTypeChooser from '../QuestionTypeChooser';
import { makeSelectCreateQuestionLoader } from '../../containers/EditInterventionPage/selectors';

const EmptyInterventionPage = ({ onCreateQuestion, loading }) => (
  <Row height="100%" width="100%" align="start" justify="center" pt={100}>
    <Column>
      <NoContent />
      <Row width="100%" justify="center" mt={50}>
        <QuestionTypeChooser
          onClick={onCreateQuestion}
          ButtonComponent={props => (
            <ButtonComponent {...props} loading={loading} />
          )}
        />
      </Row>
    </Column>
  </Row>
);

EmptyInterventionPage.propTypes = {
  onCreateQuestion: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectCreateQuestionLoader(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(EmptyInterventionPage);
