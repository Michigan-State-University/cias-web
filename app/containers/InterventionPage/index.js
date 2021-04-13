/**
 *
 * InterventionPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Row, Col } from 'react-grid-system';
import { Markup } from 'interweave';

import SingleTile from 'containers/SingleTile';
import Text from 'components/Text';
import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import TileRenderer from 'components/TileRenderer';
import SearchInput from 'components/Input/SearchInput';
import Notification from 'components/Notification';

import useFilter from 'utils/useFilter';
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

import { colors, fontSizes, themeColors } from 'theme';
import StatusFilter from './StatusFilter';
import messages from './messages';
import { InitialRow } from './styled';

export function InterventionPage({
  fetchInterventionsRequest: fetchInterventions,
  interventionPageState: {
    interventions,
    fetchInterventionLoading,
    fetchInterventionError,
  },
  intl: { formatMessage },
  createInterventionRequest: createIntervention,
  createInterventionLoading,
  user,
  editUser,
}) {
  useInjectReducer({ key: 'interventions', reducer: interventionsReducer });
  useInjectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga });
  useInjectSaga({ key: 'createIntervention', saga: createInterventionSaga });

  const { teamName } = user ?? {};

  const [valueFilteredInterventions, filterValue, setFilterValue] = useFilter(
    interventions,
    'name',
    {},
  );

  const [finalInterventions, filterStatus, setFilterStatus] = useFilter(
    valueFilteredInterventions,
    'status',
    { initialDelay: 0, initialValue: statusTypes },
  );

  useEffect(() => {
    fetchInterventions();
  }, []);

  const handleChange = value => () => {
    if (filterStatus.includes(value))
      setFilterStatus(filterStatus.filter(el => el !== value));
    else setFilterStatus([...filterStatus, value]);
  };

  const handleFilterStatus = e => {
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    handleChange(value)();
  };

  const handleClearFilters = () => {
    setFilterStatus(statusTypes);
  };

  const mapIntervention = intervention => (
    <SingleTile
      tileData={intervention}
      link={`/interventions/${intervention.id}/`}
    />
  );

  const handleFeedbackClick = () => {
    editUser({ feedbackCompleted: true });
  };

  const FeedbackNotification = (
    <Notification
      title={formatMessage(messages.feedbackTitle)}
      description={
        <a
          style={{ color: themeColors.secondary }}
          href={GOOGLE_FORM_URL}
          target="_blank"
          onClick={handleFeedbackClick}
        >
          {formatMessage(messages.feedbackDescription)}
        </a>
      }
      onClose={handleFeedbackClick}
      style={{ position: 'absolute', right: '0px' }}
    />
  );

  if (fetchInterventionLoading) return <Loader />;
  if (fetchInterventionError)
    return <ErrorAlert errorText={fetchInterventionError} fullPage />;

  if (!finalInterventions.length && !interventions.length) {
    return (
      <AppContainer>
        {!user.feedbackCompleted && FeedbackNotification}
        {teamName && (
          <InitialRow fluid>
            <Text color={colors.manatee} fontSize={fontSizes.regular} mt={50}>
              <Markup
                content={formatMessage(messages.teamName, { teamName })}
                noWrap
              />
            </Text>
          </InitialRow>
        )}
        <H1 my={35}>
          <FormattedMessage {...messages.noInterventions} />
        </H1>
        <TileRenderer
          containerKey="intervention"
          newLabel={formatMessage(messages.createIntervention)}
          onCreateCall={createIntervention}
          createLoading={createInterventionLoading}
        />
      </AppContainer>
    );
  }
  return (
    <AppContainer>
      {!user.feedbackCompleted && FeedbackNotification}
      {teamName && (
        <InitialRow fluid>
          <Text color={colors.manatee} fontSize={fontSizes.regular} mt={50}>
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
                  onChange={e => setFilterValue(e.target.value)}
                  placeholder={formatMessage(messages.filter)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </InitialRow>
      {filterValue && finalInterventions.length === 0 && (
        <h3>
          <FormattedMessage {...messages.noFilterResults} />
        </h3>
      )}
      <TileRenderer
        containerKey="intervention"
        elements={finalInterventions}
        mapFunction={mapIntervention}
        newLabel={formatMessage(messages.createIntervention)}
        onCreateCall={createIntervention}
        createLoading={createInterventionLoading}
      />
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(InterventionPage);
