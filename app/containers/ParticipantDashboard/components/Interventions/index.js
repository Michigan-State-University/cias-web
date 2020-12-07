import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Column from 'components/Column';
import H1 from 'components/H1';
import Row from 'components/Row';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import TileMapper from 'components/TileMapper';

import {
  makeSelectError,
  makeSelectLoader,
  makeSelectInterventions,
} from 'global/reducers/participantDashboard';

import messages from './messages';
import InterventionCollapse from '../InterventionCollapse';

function Interventions({ interventions, error, loading }) {
  return (
    <Column align="start" mt={35} filled>
      <Row align="center" ml={12} mb={24}>
        <H1>
          <FormattedMessage {...messages.interventions} />
        </H1>
      </Row>
      {loading && <Loader size={100} type="inline" />}
      {error && <ErrorAlert errorText={error} />}
      {!loading && interventions && (
        <Row justify="center" flexWrap="wrap" width="100%">
          <TileMapper
            items={interventions}
            component={(props, index) => (
              <InterventionCollapse
                /* eslint-disable-next-line react/prop-types */
                key={`Intervention-Collapse-${props.id}`}
                itemIndex={index}
                {...props}
              />
            )}
          />
        </Row>
      )}
    </Column>
  );
}

Interventions.propTypes = {
  interventions: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  fetchInterventions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  interventions: makeSelectInterventions(),
  error: makeSelectError('fetchInterventionsError'),
  loading: makeSelectLoader('fetchInterventionsLoading'),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Interventions);
