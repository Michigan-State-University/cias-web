/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col } from 'react-grid-system';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import SingleInterventionPanel from 'components/SingleInterventionPanel';
import Spinner from 'components/Spinner';
import {
  interventionListReducer,
  interventionListSaga,
  makeSelectInterventionList,
  fetchInterventionsRequest,
} from 'global/reducers/interventionList';

import {
  HomePageContainer,
  NewInterventionFloatButton,
  AddIcon,
} from './styled';
import messages from './messages';
import { createInterventionRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectDashboardPage } from './selectors';

export function HomePage({
  createIntervention,
  fetchInterventions,
  homePageState: {
    loaders: { interventionCreating },
  },
  interventionList: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
}) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({
    key: 'interventionList',
    reducer: interventionListReducer,
  });
  useInjectSaga({ key: 'interventionList', saga: interventionListSaga });

  useEffect(() => {
    fetchInterventions();
  }, []);

  const wrapWithCol = (child, key) => (
    <Col key={`Single-intvention-${key}`} xs={12} sm={6} lg={4} xl={3}>
      {child}
    </Col>
  );

  if (fetchInterventionLoading) return <Loader />;
  return (
    <HomePageContainer>
      <h2>
        <FormattedMessage {...messages.myIntervention} />
      </h2>
      <Container>
        <Row>
          {wrapWithCol(
            <SingleInterventionPanel
              clickHandler={createIntervention}
              interventionCreating={interventionCreating}
            />,
            'new',
          )}
          {interventions.map(intervention =>
            wrapWithCol(
              <SingleInterventionPanel intervention={intervention} />,
              intervention.id,
            ),
          )}
        </Row>
      </Container>
      {fetchInterventionError && (
        <ErrorAlert errorText={fetchInterventionError} />
      )}
      <NewInterventionFloatButton onClick={createIntervention}>
        {!interventionCreating && (
          <>
            <AddIcon>+</AddIcon>
            <FormattedMessage {...messages.createIntervention} />
          </>
        )}
        {interventionCreating && <Spinner />}
      </NewInterventionFloatButton>
    </HomePageContainer>
  );
}

HomePage.propTypes = {
  intl: PropTypes.object,
  createIntervention: PropTypes.func,
  fetchInterventions: PropTypes.func,
  homePageState: PropTypes.object,
  interventionList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePageState: makeSelectDashboardPage(),
  interventionList: makeSelectInterventionList(),
});

const mapDispatchToProps = {
  createIntervention: createInterventionRequest,
  fetchInterventions: fetchInterventionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
