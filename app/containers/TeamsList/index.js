/**
 *
 * TeamsList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, IntlShape, FormattedMessage } from 'react-intl';

import { Container, Row, Col } from 'react-grid-system';

import Box from 'components/Box';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import SearchInput from 'components/Input/SearchInput';
import TextButton from 'components/Button/TextButton';
import {
  fetchTeamsRequest,
  teamListSaga,
  TeamListReducer,
  makeSelectTeamList,
  deleteTeamRequest,
} from 'global/reducers/teamList';
import { themeColors } from 'theme';
import { PER_PAGE } from 'global/reducers/userList/constants';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { useRoleManager } from 'models/User/RolesManager';
import { TeamListContext } from './Components/utils';
import CreateTeam from './Components/CreateTeam';
import TeamsTable from './Components/TeamsTable';
import messages from './messages';

const initialDelay = 500;

function TeamsList({
  teamList: {
    teams,
    teamsSize,
    shouldRefetch,
    loaders: { teamsLoading },
    errors: { teamsFetchError },
  },
  fetchTeams,
  deleteTeam,
  intl: { formatMessage },
}) {
  useInjectReducer({ key: 'teamList', reducer: TeamListReducer });
  useInjectSaga({ key: 'teamList', saga: teamListSaga });
  const pages = Math.ceil(teamsSize / PER_PAGE);
  const { isAdmin } = useRoleManager();

  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTeams(filterText, page);
  }, [filterText, page]);

  useEffect(() => {
    if (shouldRefetch) fetchTeams(filterText, page);
  }, [shouldRefetch]);

  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [teamsSize]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getContent = () => {
    if (teamsLoading && teams.length === 0) return <Loader />;
    if (teamsFetchError) return <ErrorAlert errorText={teamsFetchError} />;
    return (
      <div>
        <Container style={{ marginBottom: 40, padding: 0 }} fluid>
          <Row align="center">
            <Col xs={12} sm={6} lg={4} xxl={3} style={{ marginBottom: 10 }}>
              <SearchInput
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                debounceTime={initialDelay}
                placeholder={formatMessage(messages.searchPlaceholder)}
                aria-label={formatMessage(messages.searchPlaceholder)}
              />
            </Col>
          </Row>
        </Container>
        <TeamListContext.Provider value={{ isAdmin }}>
          <TeamsTable
            formatMessage={formatMessage}
            teams={teams}
            loading={teamsLoading}
            setPage={setPage}
            page={page}
            pages={pages}
            deleteTeam={deleteTeam}
          />
        </TeamListContext.Provider>
      </div>
    );
  };

  return (
    <>
      <CreateTeam visible={modalVisible} onClose={closeModal} />
      <Box height="100%" overflow="scroll" display="flex" justify="center">
        <Helmet>
          <title>{formatMessage(messages.pageTitle)}</title>
          <meta name="description" content="List of teams" />
        </Helmet>
        <Box mt={64} width="100%" px="10%">
          <Box display="flex" mb={30}>
            <H1 mr={10}>
              <FormattedMessage {...messages.manageTeams} />
            </H1>
            {isAdmin && (
              <TextButton
                buttonProps={{
                  color: themeColors.secondary,
                  fontWeight: 'bold',
                }}
                onClick={openModal}
              >
                <FormattedMessage {...messages.createTeam} />
              </TextButton>
            )}
          </Box>
          {getContent()}
        </Box>
      </Box>
    </>
  );
}

TeamsList.propTypes = {
  fetchTeams: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  teamList: PropTypes.object,
  intl: PropTypes.shape(IntlShape),
};

const mapStateToProps = createStructuredSelector({
  teamList: makeSelectTeamList(),
});

const mapDispatchToProps = {
  fetchTeams: fetchTeamsRequest,
  deleteTeam: deleteTeamRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectIntl)(TeamsList);
