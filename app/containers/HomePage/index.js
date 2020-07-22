/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, Fragment } from 'react';
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
import H1 from 'components/H1';
import SingleInterventionPanel from 'components/SingleInterventionPanel';
import Spinner from 'components/Spinner';
import {
  interventionListReducer,
  fetchInterventionsSaga,
  makeSelectInterventionList,
  fetchInterventionsRequest,
} from 'global/reducers/interventionList';

import {
  createInterventionSaga,
  createInterventionRequest,
  makeSelectInterventionLoaders,
} from 'global/reducers/intervention';

import { NewInterventionFloatButton, AddIcon } from './styled';
import messages from './messages';
export function HomePage({
  createIntervention,
  fetchInterventions,
  loaders: { createIntervention: createInterventionLoader },
  interventionList: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
}) {
  useInjectSaga({ key: 'createIntervention', saga: createInterventionSaga });
  useInjectReducer({
    key: 'interventionList',
    reducer: interventionListReducer,
  });
  useInjectSaga({ key: 'getInterventions', saga: fetchInterventionsSaga });

  useEffect(() => {
    fetchInterventions();
  }, []);

  const wrapWithCol = (child, key) => (
    <Col key={`Single-intvention-${key}`} xs={12} sm={6} lg={4} xl={3}>
      {child}
    </Col>
  );

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return (
      <Container>
        <ErrorAlert errorText={fetchInterventionError} />
      </Container>
    );

  return (
    <Fragment>
      <Container>
        <H1 my={35}>
          <FormattedMessage {...messages.myIntervention} />
        </H1>
        <Row>
          {wrapWithCol(
            <SingleInterventionPanel
              clickHandler={createIntervention}
              interventionCreating={createInterventionLoader}
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
      <NewInterventionFloatButton onClick={createIntervention}>
        {!createInterventionLoader && (
          <>
            <AddIcon>+</AddIcon>
            <FormattedMessage {...messages.createIntervention} />
          </>
        )}
        {createInterventionLoader && <Spinner />}
      </NewInterventionFloatButton>
    </Fragment>
  );
}

HomePage.propTypes = {
  intl: PropTypes.object,
  createIntervention: PropTypes.func,
  fetchInterventions: PropTypes.func,
  homePageState: PropTypes.object,
  interventionList: PropTypes.object,
  loaders: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  interventionList: makeSelectInterventionList(),
  loaders: makeSelectInterventionLoaders(),
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
