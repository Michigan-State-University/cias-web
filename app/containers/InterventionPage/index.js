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

import importIcon from 'assets/svg/import-secondary.svg';

import { statusTypes } from 'models/Status/StatusTypes';

import { colors, fontSizes, themeColors } from 'theme';

import { FEEDBACK_FORM_URL } from 'global/constants';
import {
  createInterventionRequest,
  makeSelectInterventionLoader,
  withCreateInterventionSaga,
} from 'global/reducers/intervention';
import {
  fetchInterventionsRequest,
  makeSelectInterventionsState,
  interventionsReducer,
  fetchInterventionsSaga,
  resetImportModalState,
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
import { InitialRow, StyledLink, StyledNotification } from './styled';
import ImportModalContent from './ImportModalContent';
import ShareFilter from './ShareFilter';

const INITIAL_FETCH_LIMIT = 15;

export function InterventionPage({
  fetchInterventionsRequest: fetchInterventions,
  interventionPageState: {
    interventions,
    interventionsSize,
    loaders: { fetchInterventions: fetchInterventionsLoading },
    errors: { fetchInterventions: fetchInterventionsError },
    shouldRefetch,
    interventionsStates,
  },
  intl: { formatMessage },
  createInterventionRequest: createIntervention,
  createInterventionLoading,
  user,
  editUser,
  resetModalState,
}) {
  const { teamName } = user ?? {};

  const [filterValue, setFilterValue] = useState('');
  const [filterStatus, setFilterStatus] = useState(statusTypes);
  const [filterSharing, setFilterSharing] = useState('');

  const filterData = useMemo(
    () => ({
      statuses: filterStatus,
      name: filterValue,
      ...(filterSharing && { [filterSharing]: true }),
    }),
    [filterValue, filterStatus, filterSharing],
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

  const { openModal: openImportModal, Modal: ImportModal } = useModal({
    type: ModalType.Modal,
    modalContentRenderer: (props) => <ImportModalContent {...props} />,
    props: {
      title: formatMessage(messages.importIntervention),
      width: 520,
    },
  });

  const handleChange = (values) => {
    setFilterStatus(values);
  };

  const handleFeedbackClick = () => {
    editUser({ feedbackCompleted: true });
  };

  const onImportIconClick = () => {
    resetModalState();
    openImportModal();
  };

  const FeedbackNotification = (
    <StyledNotification
      title={formatMessage(messages.feedbackTitle)}
      description={
        <StyledLink
          href={FEEDBACK_FORM_URL}
          target="_blank"
          onClick={handleFeedbackClick}
        >
          {formatMessage(messages.feedbackDescription)}
        </StyledLink>
      }
      onClose={handleFeedbackClick}
    />
  );

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

      <InitialRow fluid style={{ display: 'flex' }}>
        <HelpIconTooltip
          id="dashboard-cdh"
          tooltipContent={formatMessage(messages.myInterventionsHelp)}
        >
          <H1>
            <FormattedMessage {...messages.myInterventions} />
          </H1>
        </HelpIconTooltip>
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
              <ShareFilter
                onChange={setFilterSharing}
                formatMessage={formatMessage}
                active={filterSharing}
              />
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            xxl={4}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Row my={35} justify="start" align="center">
              <StatusFilter
                onChange={handleChange}
                formatMessage={formatMessage}
                active={filterStatus}
              />
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            xxl={4}
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
          elementsStates={interventionsStates}
          newLabel={formatMessage(messages.createIntervention)}
          onCreateCall={createIntervention}
          createLoading={createInterventionLoading}
          onFetchInterventions={handleFetch}
          isLoading={fetchInterventionsLoading}
          filterData={filterData}
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
  interventionPageState: PropTypes.object,
  intl: PropTypes.object,
  createInterventionLoading: PropTypes.bool,
  editUser: PropTypes.func,
  user: PropTypes.object,
  resetModalState: PropTypes.func,
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
  resetModalState: resetImportModalState,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectIntl,
  injectSaga({ key: 'fetchInterventions', saga: fetchInterventionsSaga }),
  injectSaga(withCreateInterventionSaga),
  injectReducer({ key: 'interventions', reducer: interventionsReducer }),
)(InterventionPage);
