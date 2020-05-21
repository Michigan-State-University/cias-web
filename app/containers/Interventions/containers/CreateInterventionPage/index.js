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
import Intervention from 'models/Intervention/Intervention';
import { makeSelectIntervention } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BaseEditableIntervention from '../../components/BaseEditableIntervention';

function CreateInterventionPage(props) {
  useInjectReducer({ key: 'createInterventionPage', reducer });
  useInjectSaga({ key: 'createInterventionPage', saga });

  return (
    <Fragment>
      <Helmet>
        <title>{props.intl.formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <BaseEditableIntervention {...props} />
    </Fragment>
  );
}

CreateInterventionPage.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
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
