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
import Text from 'components/Text';
import StyledLink from 'components/StyledLink';

import { themeColors } from 'theme';
import {
  makeSelectLatestReport,
  makeSelectError,
  makeSelectLoader,
  fetchLatestReportRequest,
} from 'global/reducers/generatedReports';

import { ReportTile } from '../ReportTile';
import messages from './messages';

function LatestReport({ latestReport, error, loading, fetchLatestReport }) {
  useEffect(() => {
    fetchLatestReport();
  });

  return (
    <Column width="100%" align="start" mt={50}>
      <Row align="center" mb={10}>
        <H1>
          <FormattedMessage {...messages.latestReport} />
        </H1>
        <StyledLink to="/reports">
          <Text ml={12} fontWeight="bold" color={themeColors.secondary}>
            <FormattedMessage {...messages.allReports} />
          </Text>
        </StyledLink>
      </Row>
      {loading && <Loader size={100} type="inline" />}
      {error && <ErrorAlert errorText={error} />}
      {latestReport && (
        <Row justify="end" flexWrap="wrap" width="100%">
          <ReportTile {...latestReport} />
        </Row>
      )}
    </Column>
  );
}

LatestReport.propTypes = {
  latestReport: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
  fetchLatestReport: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  latestReport: makeSelectLatestReport(),
  error: makeSelectError('fetchLatestReportError'),
  loading: makeSelectLoader('fetchLatestReportLoading'),
});

const mapDispatchToProps = {
  fetchLatestReport: fetchLatestReportRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LatestReport);
