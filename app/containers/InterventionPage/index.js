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
import { injectReducer, injectSaga } from 'redux-injectors';
import { Row, Col } from 'react-grid-system';
import { Markup } from 'interweave';

import importIcon from 'assets/svg/import-secondary.svg';

import { colors, fontSizes, themeColors } from 'theme';

import { isInterventionExportFeatureEnabled } from 'utils/env';

import {
  createInterventionRequest,
  makeSelectInterventionLoader,
  withCreateInterventionSaga,
} from 'global/reducers/intervention';
import {
  fetchInterventionsRequest,
  makeSelectInterventionsReducerState,
  withFetchInterventionsSaga,
  resetImportModalState,
  withInterventionsReducer,
  changeMainDashboardFilterData as changeMainDashboardFilterDataAction,
} from 'global/reducers/interventions';
import { editUserRequest, makeSelectUser } from 'global/reducers/auth';

import Text from 'components/Text';
import AppContainer from 'components/Container';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import TileRenderer from 'components/TileRenderer';
import SearchInput from 'components/Input/SearchInput';
import Box from 'components/Box';
import Img from 'components/Img';
import { ModalType, useModal } from 'components/Modal';
import { TextButton } from 'components/Button';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import StatusFilter from './StatusFilter';
import messages from './messages';
import { InitialRow } from './styled';
import ImportModalContent from './ImportModalContent';
import ShareFilter from './ShareFilter';
import { SharedFilter } from './StarredFilter';

const INITIAL_FETCH_LIMIT = 15;

export function InterventionPage({
  fetchInterventionsRequest: fetchInterventions,
  interventionsReducerState: {
    interventions,
    interventionsSize,
    loaders: { fetchInterventions: fetchInterventionsLoading },
    errors: { fetchInterventions: fetchInterventionsError },
    shouldRefetch,
    interventionsStates,
    mainDashboardFilterData,
  },
  intl: { formatMessage },
  createInterventionRequest: createIntervention,
  createInterventionLoading,
  user,
  resetModalState,
  changeMainDashboardFilterData,
}) {
  const { teamName } = user ?? {};

  const { name, statuses, sharing, starred } = mainDashboardFilterData;

  const handleSharingFilterChange = (value) => {
    changeMainDashboardFilterData({ sharing: value });
  };

  const handleStatusesFilterChange = (value) => {
    changeMainDashboardFilterData({ statuses: value });
  };

  const handleStarredFilterChange = (value) => {
    changeMainDashboardFilterData({ starred: value });
  };

  const handleNameFilterChange = (event) => {
    changeMainDashboardFilterData({ name: event.target.value.trim() });
  };

  useEffect(() => {
    handleFetch(0, INITIAL_FETCH_LIMIT);
  }, [mainDashboardFilterData]);

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
      filterData: mainDashboardFilterData,
    });
  };

  const { openModal: openImportModal, Modal: ImportModal } = useModal({
    type: ModalType.Modal,
    modalContentRenderer: (props) => <ImportModalContent {...props} />,
    props: {
      title: formatMessage(messages.importIntervention),
      width: 520,
    },
  });

  const onImportIconClick = () => {
    resetModalState();
    openImportModal();
  };

  if (fetchInterventionsError)
    return <ErrorAlert errorText={fetchInterventionsError} fullPage />;

  return (
    <AppContainer
      height="100% !important"
      display="flex"
      direction="column"
      overflow="clip"
      pt={54}
    >
      <ImportModal />

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

      <InitialRow fluid style={{ display: 'flex' }}>
        <HelpIconTooltip
          id="dashboard-cdh"
          tooltipContent={formatMessage(messages.myInterventionsHelp)}
        >
          <H1>
            <FormattedMessage {...messages.myInterventions} />
          </H1>
        </HelpIconTooltip>
        {isInterventionExportFeatureEnabled && (
          <>
            <Box mx={24} width={2} height="100%" bg={colors.linkWater} />

            <TextButton
              buttonProps={{ display: 'flex', align: 'center' }}
              onClick={onImportIconClick}
            >
              <Img
                src={importIcon}
                alt={formatMessage(messages.importIntervention)}
                mr={8}
                mb={2}
              />
              <Text color={themeColors.secondary} fontWeight="bold">
                {formatMessage(messages.importIntervention)}
              </Text>
            </TextButton>
          </>
        )}
      </InitialRow>

      <InitialRow fluid>
        <Row>
          <Col
            xs={12}
            md={6}
            xxl={4}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row justify="start" align="center">
              <ShareFilter
                onChange={handleSharingFilterChange}
                formatMessage={formatMessage}
                active={sharing}
              />
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            xxl={4}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row justify="start" align="center">
              <StatusFilter
                onChange={handleStatusesFilterChange}
                formatMessage={formatMessage}
                active={statuses}
              />
            </Row>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={3}
            xxl={2}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row justify="start" align="center" style={{ height: '100%' }}>
              <SharedFilter
                value={starred}
                onChange={handleStarredFilterChange}
              />
            </Row>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={3}
            xxl={2}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row align="center">
              <Col>
                <SearchInput
                  value={name}
                  onChange={handleNameFilterChange}
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
          elementsStates={interventionsStates}
          newLabel={formatMessage(messages.createIntervention)}
          onCreateCall={createIntervention}
          createLoading={createInterventionLoading}
          onFetchInterventions={handleFetch}
          isLoading={fetchInterventionsLoading}
          filterData={mainDashboardFilterData}
          infiniteLoader={{
            itemCount: interventionsSize,
            minimumBatchSize: 50,
          }}
        />
      </Box>
    </AppContainer>
  );
}

InterventionPage.propTypes = {
  fetchInterventionsRequest: PropTypes.func.isRequired,
  createInterventionRequest: PropTypes.func,
  interventionsReducerState: PropTypes.object,
  intl: PropTypes.object,
  createInterventionLoading: PropTypes.bool,
  editUser: PropTypes.func,
  user: PropTypes.object,
  resetModalState: PropTypes.func,
  changeMainDashboardFilterData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  interventionsReducerState: makeSelectInterventionsReducerState(),
  createInterventionLoading: makeSelectInterventionLoader(
    'createInterventionLoading',
  ),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  fetchInterventionsRequest,
  createInterventionRequest,
  editUser: editUserRequest,
  resetModalState: resetImportModalState,
  changeMainDashboardFilterData: changeMainDashboardFilterDataAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectIntl,
  injectSaga(withFetchInterventionsSaga),
  injectSaga(withCreateInterventionSaga),
  injectReducer(withInterventionsReducer),
)(InterventionPage);
