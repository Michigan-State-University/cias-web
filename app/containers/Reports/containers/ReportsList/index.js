/**
 *
 * ReportsListPage
 *
 */

import React, { memo, useEffect, useState, useMemo } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import TileMapper from 'components/TileMapper';
import Spinner from 'components/Spinner';
import Loader from 'components/Loader';
import Box from 'components/Box';

import { colors, themeColors } from 'theme';
import {
  REPORTS_PER_PAGE,
  filterOptions,
  sortByOptions,
} from 'global/reducers/generatedReports/constants';
import fetchReportsSaga from 'global/reducers/generatedReports/sagas/fetchReports';
import {
  generatedReportsReducer,
  fetchReportsRequest,
  makeSelectLoader,
  makeSelectReports,
  makeSelectReportsSize,
} from 'global/reducers/generatedReports';

import PaginationHandler from 'containers/UserList/Components/PaginationHelper';
import {
  makeSelectCurrentPage,
  makeSelectCurrentSortOption,
  makeSelectCurrentFilterOption,
} from 'global/reducers/generatedReports/selectors';

import { ReportTile } from '../../components/ReportTile';
import { ReportsFilter } from '../../components/ReportsFilter';
import messages from '../../components/ReportsFilter/messages';

const ReportsList = ({
  intl: { formatMessage },
  reports,
  reportsLoading,
  fetchReports,
  reportsSize,
  disableFilter,
  currentPage,
  currentSortOption,
  currentFilterOption,
}) => {
  const sortOptions = useMemo(
    () =>
      sortByOptions.map(value => ({
        id: value,
        label: formatMessage(messages[value]),
      })),
    [],
  );

  const [displayLoader, setDisplayLoader] = useState(false);

  const innerSetPage = pageNumber => {
    setDisplayLoader(true);
    fetchReports(pageNumber, currentFilterOption, currentSortOption);
  };

  const handleChangeFilter = filter => {
    setDisplayLoader(true);
    fetchReports(currentPage, filter, currentSortOption);
  };

  const handleChangeSort = sort => {
    setDisplayLoader(true);
    fetchReports(currentPage, currentFilterOption, sort);
  };

  const pages = Math.ceil(reportsSize / REPORTS_PER_PAGE);

  useEffect(() => {
    fetchReports(currentPage, currentFilterOption, currentSortOption);
  }, []);

  useEffect(() => {
    if (!reportsLoading) setDisplayLoader(false);
  }, [reportsLoading]);

  const renderReport = (report, itemIndex) => (
    <Row mb={5} width="100%" key={`report-tile-${itemIndex}`}>
      <ReportTile formatMessage={formatMessage} {...report} />
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
      <ReportsFilter
        disableFilter={disableFilter}
        formatMessage={formatMessage}
        changeSort={handleChangeSort}
        changeFilter={handleChangeFilter}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        activeFilters={currentFilterOption}
        activeSort={currentSortOption}
      />
      <Column mb={20}>
        <TileMapper items={reports} component={renderReport} />
      </Column>
      <PaginationHandler
        setPage={innerSetPage}
        page={currentPage}
        pages={pages}
        size={reportsSize}
      />
    </>
  );
};

ReportsList.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object),
  reportsSize: PropTypes.number,
  reportsLoading: PropTypes.bool,
  fetchReports: PropTypes.func,
  intl: intlShape,
  disableFilter: PropTypes.bool,
  currentPage: PropTypes.number,
  currentSortOption: PropTypes.string,
  currentFilterOption: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  reportsSize: makeSelectReportsSize(),
  reportsLoading: makeSelectLoader('fetchReportsLoading'),
  currentPage: makeSelectCurrentPage(),
  currentSortOption: makeSelectCurrentSortOption(),
  currentFilterOption: makeSelectCurrentFilterOption(),
});

const mapDispatchToProps = {
  fetchReports: fetchReportsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectReducer({
    key: 'generatedReports',
    reducer: generatedReportsReducer,
  }),
  injectReducer({ key: 'generatedReports', reducer: generatedReportsReducer }),
  injectSaga({ key: 'reportsSaga', saga: fetchReportsSaga }),
  injectIntl,
  withConnect,
  memo,
)(ReportsList);