/**
 *
 * ReportsListPage
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import TileMapper from 'components/TileMapper';
import Spinner from 'components/Spinner';
import Loader from 'components/Loader';
import Box from 'components/Box';

import { colors, themeColors } from 'theme';

import {
  allGeneratedReportsSagas,
  REPORTS_PER_PAGE,
  filterOptions,
  sortByOptions,
  generatedReportsReducer,
  fetchReportsRequest,
  markReportDownloadedRequest,
  makeSelectLoader,
  makeSelectReports,
  makeSelectReportsSize,
  makeSelectCurrentPage,
  makeSelectCurrentSortOption,
  makeSelectCurrentFilterOption,
  generatedReportsReducerKey,
  generatedReportsSagasKey,
} from 'global/reducers/generatedReports';

import PaginationHandler from 'containers/UserList/Components/PaginationHelper';

import { ReportTile } from '../../components/ReportTile';
import { ReportsFilter } from '../../components/ReportsFilter';
import messages from '../../components/ReportsFilter/messages';

const ReportsList = ({ sessionId, disableFilter }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectReducer({
    key: generatedReportsReducerKey,
    reducer: generatedReportsReducer,
  });
  useInjectSaga({
    key: generatedReportsSagasKey,
    saga: allGeneratedReportsSagas,
  });

  const reports = useSelector(makeSelectReports());
  const reportsSize = useSelector(makeSelectReportsSize());
  const reportsLoading = useSelector(makeSelectLoader('fetchReportsLoading'));
  const currentPage = useSelector(makeSelectCurrentPage());
  const currentSortOption = useSelector(makeSelectCurrentSortOption());
  const currentFilterOption = useSelector(makeSelectCurrentFilterOption());

  const sortOptions = useMemo(
    () =>
      sortByOptions.map((value) => ({
        id: value,
        label: formatMessage(messages[value]),
      })),
    [],
  );

  const [displayLoader, setDisplayLoader] = useState(false);

  const innerSetPage = (pageNumber) => {
    setDisplayLoader(true);
    dispatch(
      fetchReportsRequest(pageNumber, null, currentSortOption, sessionId),
    );
  };

  const handleChangeFilter = (filter) => {
    setDisplayLoader(true);
    dispatch(
      fetchReportsRequest(currentPage, filter, currentSortOption, sessionId),
    );
  };

  const handleChangeSort = (sort) => {
    setDisplayLoader(true);
    dispatch(fetchReportsRequest(currentPage, null, sort, sessionId));
  };

  const pages = Math.ceil(reportsSize / REPORTS_PER_PAGE);

  useEffect(() => {
    dispatch(
      fetchReportsRequest(currentPage, null, currentSortOption, sessionId),
    );
  }, []);

  useEffect(() => {
    if (!reportsLoading) setDisplayLoader(false);
  }, [reportsLoading]);

  const markReportDownloaded = (reportId) => {
    dispatch(markReportDownloadedRequest(reportId));
  };

  const renderReport = (report) => (
    <Row mb={5} width="100%" key={`report-tile-${report.id}`}>
      <ReportTile
        formatMessage={formatMessage}
        report={report}
        onFirstDownload={markReportDownloaded}
      />
    </Row>
  );

  if (!reports && reportsLoading)
    return <Spinner color={themeColors.secondary} size={100} />;

  const noContent = !reports?.length;

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
        noContent={noContent}
      />
      <Column mb={40}>
        <TileMapper items={reports} component={renderReport} />
      </Column>
      {!noContent && (
        <PaginationHandler
          setPage={innerSetPage}
          page={currentPage}
          pages={pages}
          size={reportsSize}
        />
      )}
    </>
  );
};

ReportsList.propTypes = {
  disableFilter: PropTypes.bool,
  sessionId: PropTypes.string,
};

export default ReportsList;
