import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Column from 'components/Column';
import NoContent from 'components/NoContent';
import Row from 'components/Row';
import { makeSelectLoader } from 'global/reducers/questions';

import ButtonComponent from './ButtonComponent';
import QuestionTypeChooser from '../QuestionTypeChooser';

/**
 * The component is not temporarily used in the application due to the addition of a finish screen.
 * If there are no further changes, it can be deleted.
 */
const EmptyInterventionPage = ({ onCreateQuestion, loading, disabled }) => (
  <Row height="100%" width="100%" align="start" justify="center" pt={100}>
    <Column>
      <NoContent />
      <Row width="100%" justify="center" mt={50}>
        <QuestionTypeChooser
          onClick={onCreateQuestion}
          ButtonComponent={React.forwardRef((props, ref) => (
            <ButtonComponent
              disabled={disabled}
              {...props}
              loading={loading}
              ref={ref}
            />
          ))}
        />
      </Row>
    </Column>
  </Row>
);

EmptyInterventionPage.propTypes = {
  onCreateQuestion: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoader('createQuestionLoading'),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(EmptyInterventionPage);
