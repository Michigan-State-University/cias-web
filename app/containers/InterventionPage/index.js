/**
 *
 * InterventionPage
 *
 */

import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Row, Col } from 'react-grid-system';
import { Markup } from 'interweave';

import Text from 'components/Text';
import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import TileRenderer from 'components/TileRenderer';
import SearchInput from 'components/Input/SearchInput';
import Box from 'components/Box';

import { statusTypes } from 'models/Status/StatusTypes';

import {
  createInterventionRequest,
  createInterventionSaga,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';
import {
  fetchInterventionsRequest,
  makeSelectInterventionsState,
  interventionsReducer,
  fetchInterventionsSaga,
} from 'global/reducers/interventions';
import { editUserRequest, makeSelectUser } from 'global/reducers/auth';
import { GOOGLE_FORM_URL } from 'global/constants';

import { colors, fontSizes } from 'theme';
import StatusFilter from './StatusFilter';
import messages from './messages';
import { InitialRow, StyledLink, StyledNotification } from './styled';

const INITIAL_FETCH_LIMIT = 15;

export function InterventionPage({
  fetchInterventionsRequest: fetchInterventions,
  interventionPageState: {
    interventions,
    interventionsSize,
    fetchInterventionLoading,
    fetchInterventionError,
    shouldRefetch,
  },
  intl: { formatMessage },
  createInterventionRequest: createIntervention,
  createInterventionLoading,
  user,
  editUser,
}) {
  const { teamName } = user ?? {};

  const [filterValue, setFilterValue] = useState('');
  const [filterStatus, setFilterStatus] = useState(statusTypes);

  const filterData = useMemo(
    () => ({ statuses: filterStatus, name: filterValue }),
    [filterValue, filterStatus],
  );

  useEffect(() => {
    handleFetch(0, INITIAL_FETCH_LIMIT);
  }, [filterData]);

  useEffect(() => {
    if (shouldRefetch) handleFetch(0, INITIAL_FETCH_LIMIT);
  }, [shouldRefetch]);

  const handleFetch = (startIndex, stopIndex) => {
    const realStartIndex = Math.max(startIndex - 1, 0);
    const realStopIndex = stopIndex;

    fetchInterventions({
      paginationData: {
        startIndex: realStartIndex,
        endIndex: realStopIndex,
      },
      filterData,
    });
  };

  const handleChange = (value) => () => {
    if (filterStatus.includes(value))
      setFilterStatus(filterStatus.filter((el) => el !== value));
    else setFilterStatus([...filterStatus, value]);
  };

  const handleFilterStatus = (e) => {
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    handleChange(value)();
  };

  const handleClearFilters = () => {
    setFilterStatus(statusTypes);
  };

  const handleFeedbackClick = () => {
    editUser({ feedbackCompleted: true });
  };

  const FeedbackNotification = (
    <StyledNotification
      title={formatMessage(messages.feedbackTitle)}
      description={
        <StyledLink
          href={GOOGLE_FORM_URL}
          target="_blank"
          onClick={handleFeedbackClick}
        >
          {formatMessage(messages.feedbackDescription)}
        </StyledLink>
      }
      onClose={handleFeedbackClick}
    />
  );

  if (fetchInterventionError)
    return <ErrorAlert errorText={fetchInterventionError} fullPage />;

  return (
    <AppContainer
      height="100% !important"
      display="flex"
      direction="column"
      overflow="clip"
    >
      {!user.feedbackCompleted && FeedbackNotification}

      {teamName && (
        <InitialRow fluid>
          <Text color={colors.manatee} fontSize={fontSizes.regular}>
            <Markup
              content={formatMessage(messages.teamName, { teamName })}
              noWrap
            />
          </Text>
        </InitialRow>
      )}

      <InitialRow fluid>
        <H1 mt={35}>
          <FormattedMessage {...messages.myInterventions} />
        </H1>
      </InitialRow>

      <InitialRow fluid>
        <Row>
          <Col
            xs={12}
            md={6}
            xxl={4}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row my={35} justify="start" align="center">
              <StatusFilter
                onClick={handleFilterStatus}
                formatMessage={formatMessage}
                active={filterStatus}
                onClear={handleClearFilters}
              />
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            xxl={8}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row align="center">
              <Col>
                <SearchInput
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder={formatMessage(messages.filter)}
                  aria-label={formatMessage(messages.searchInterventionsLabel)}
                  debounceTime={300}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </InitialRow>

      {interventionsSize === 0 && (
        <h3>
          <FormattedMessage {...messages.noFilterResults} />
        </h3>
      )}

      <Box filled>
        <TileRenderer
          containerKey="intervention"
          elements={interventions}
          newLabel={formatMessage(messages.createIntervention)}
          onCreateCall={createIntervention}
          createLoading={createInterventionLoading}
          onFetchInterventions={handleFetch}
          isLoading={fetchInterventionLoading}
          filterData={filterData}
          infiniteLoader={{ itemCount: interventionsSize }}
        />
      </Box>
    </AppContainer>
  );
}

InterventionPage.propTypes = {
  fetchInterventionsRequest: PropTypes.func.isRequired,
  createInterventionRequest: PropTypes.func,
  interventionPageState: PropTypes.object,
  intl: PropTypes.object,
  createInterventionLoading: PropTypes.bool,
  editUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  interventionPageState: makeSelectInterventionsState(),
  createInterventionLoading: makeSelectInterventionLoader(
    'createInterventionLoading',
  ),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  fetchInterventionsRequest,
  createInterventionRequest,
  editUser: editUserRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectIntl,
  injectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga }),
  injectSaga({ key: 'createIntervention', saga: createInterventionSaga }),
  injectReducer({ key: 'interventions', reducer: interventionsReducer }),
)(InterventionPage);
