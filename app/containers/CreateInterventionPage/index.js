/**
 *
 * CreateInterventionPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCreateInterventionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Row from '../../components/Row';
import Column from '../../components/Column';

function CreateInterventionPage({ intl: { formatMessage } }) {
  useInjectReducer({ key: 'createInterventionPage', reducer });
  useInjectSaga({ key: 'createInterventionPage', saga });

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row>
        <Column>col1</Column>
        <Column>col2</Column>
      </Row>
    </Fragment>
  );
}

CreateInterventionPage.propTypes = {
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  createInterventionPage: makeSelectCreateInterventionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(CreateInterventionPage));
