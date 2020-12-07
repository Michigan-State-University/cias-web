import React, { useEffect } from 'react';
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
  fetchInterventionsRequest,
  makeSelectPendingSessions,
} from 'global/reducers/participantDashboard';

import messages from './messages';
import SessionTile from '../SessionTile';

function PendingSessions({
  pendingSessions,
  error,
  loading,
  fetchInterventions,
}) {
  useEffect(() => {
    fetchInterventions();
  });

  return (
    <Column width="100%" align="start" mt={50}>
      <Row align="center" mb={10}>
        <H1>
          <FormattedMessage {...messages.pendingSessions} />
        </H1>
      </Row>
      {loading && <Loader size={100} type="inline" />}
      {error && <ErrorAlert errorText={error} />}
      {!loading && pendingSessions && (
        <Row justify="end" flexWrap="wrap">
          <TileMapper items={pendingSessions} component={SessionTile} />
        </Row>
      )}
    </Column>
  );
}

PendingSessions.propTypes = {
  pendingSessions: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  fetchInterventions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pendingSessions: makeSelectPendingSessions(),
  error: makeSelectError('fetchInterventionsError'),
  loading: makeSelectLoader('fetchInterventionsLoading'),
});

const mapDispatchToProps = {
  fetchInterventions: fetchInterventionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PendingSessions);
