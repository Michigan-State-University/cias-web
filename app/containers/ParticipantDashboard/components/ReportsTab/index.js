/**
 *
 * ReportsPage
 *
 */

import React, { Fragment, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';

import Column from 'components/Column';
import AppContainer from 'components/Container';
import Row from 'components/Row';
import TileMapper from 'components/TileMapper';
import Spinner from 'components/Spinner';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import Box from 'components/Box';

import { colors, themeColors } from 'theme';
import { REPORTS_PER_PAGE } from 'global/reducers/generatedReports/constants';
import fetchReportsSaga from 'global/reducers/generatedReports/sagas/fetchReports';
import {
  generatedReportsReducer,
  fetchReportsRequest,
  makeSelectLoader,
  makeSelectReports,
  makeSelectReportsSize,
} from 'global/reducers/generatedReports';

import PaginationHandler from 'containers/UserList/Components/PaginationHelper'; // TODO: make it generic later
import { ReportTile } from '../ReportTile';
import messages from './messages';

export const ReportsPage = ({
  reports,
  reportsLoading,
  fetchReports,
  reportsSize,
  intl: { formatMessage },
}) => {
  useInjectSaga({ key: 'reportsSaga', saga: fetchReportsSaga });
  useInjectReducer({
    key: 'generatedReports',
    reducer: generatedReportsReducer,
  });

  const [page, setPage] = useState(1);
  const [displayLoader, setDisplayLoader] = useState(false);

  const innerSetPage = (pageNumber) => {
    setDisplayLoader(true);
    setPage(pageNumber);
  };

  const pages = Math.ceil(reportsSize / REPORTS_PER_PAGE);

  useEffect(() => {
    fetchReports(page);
  }, [page]);

  useEffect(() => {
    if (!reportsLoading) setDisplayLoader(false);
  }, [reportsLoading]);

  const renderReport = (report, itemIndex) => (
    <Row mb={5} width="100%" key={`report-tile-${itemIndex}`}>
      <ReportTile {...report} />
    </Row>
  );

  if (!reports && reportsLoading)
    return <Spinner color={themeColors.secondary} size={100} />;

  return (
    <>
      {displayLoader && (
        <Box
          bg={colors.white}
          bgOpacity={0.5}
          height="100%"
          width="100%"
          position="fixed"
          zIndex={100}
        >
          <Loader type="inline" color={themeColors.secondary} size={100} />
        </Box>
      )}
      <AppContainer>
        <H1 my={30}>{formatMessage(messages.header)}</H1>
        <Column mb={20}>
          <TileMapper items={reports} component={renderReport} />
        </Column>
        <PaginationHandler
          setPage={innerSetPage}
          page={page}
          pages={pages}
          size={reportsSize}
        />
      </AppContainer>
    </>
  );
};

ReportsPage.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object),
  reportsSize: PropTypes.number,
  reportsLoading: PropTypes.bool,
  fetchReports: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  reportsSize: makeSelectReportsSize(),
  reportsLoading: makeSelectLoader('fetchReportsLoading'),
});

const mapDispatchToProps = {
  fetchReports: fetchReportsRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, memo)(ReportsPage);
