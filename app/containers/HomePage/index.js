/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { Button } from 'components/Button';

import { HomePageContainer } from './styled';
import messages from './messages';
import { createInterventionRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectInterventionCreatingLoader } from './selectors';

export function HomePage({
  intl: { formatMessage },
  createIntervention,
  interventionCreating,
}) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  return (
    <HomePageContainer>
      <Button
        loading={interventionCreating}
        onClick={createIntervention}
        title={formatMessage(messages.createIntervention)}
      />
    </HomePageContainer>
  );
}

HomePage.propTypes = {
  intl: PropTypes.object,
  createIntervention: PropTypes.func,
  interventionCreating: PropTypes.bool,
};

const withIntl = injectIntl(HomePage);

const mapStateToProps = createStructuredSelector({
  interventionCreating: makeSelectInterventionCreatingLoader(),
});

const mapDispatchToProps = {
  createIntervention: createInterventionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withIntl);
