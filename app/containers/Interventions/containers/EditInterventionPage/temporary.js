import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Row from 'components/Row';
import reducer from './reducer';
import saga from './saga';
import { createInterventionRequest } from './actions';

function CreateInterventionPage({ createIntervention }) {
  useInjectReducer({ key: 'CreateInterventionPage', reducer });
  useInjectSaga({ key: 'CreateInterventionPage', saga });

  useEffect(() => {
    createIntervention();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>test</title>
      </Helmet>
      <Row>Check intervention id in network tab</Row>
    </Fragment>
  );
}

CreateInterventionPage.propTypes = {
  createIntervention: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  createIntervention: () => dispatch(createInterventionRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateInterventionPage);
