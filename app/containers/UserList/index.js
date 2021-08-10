/**
 *
 * UserList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import xor from 'lodash/xor';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import { injectReducer, injectSaga } from 'redux-injectors';

import { Container, Row, Col } from 'react-grid-system';

import ActionIcon from 'components/ActionIcon';
import Box from 'components/Box';
import Checkbox from 'components/Checkbox';
import ErrorAlert from 'components/ErrorAlert';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import SearchInput from 'components/Input/SearchInput';
import TextButton from 'components/Button/TextButton';
import UserRoleTile from 'components/UserRoleTile';
import useDebounce from 'utils/useDebounce';
import { Roles } from 'models/User/UserRoles';
import {
  fetchUsers,
  userListSaga,
  UserListReducer,
  makeSelectUserList,
  changeActivateStatusRequest,
  deleteUserFromTeamRequest,
} from 'global/reducers/userList';
import { themeColors } from 'theme';
import { PER_PAGE } from 'global/reducers/userList/constants';
import { makeSelectUser } from 'global/reducers/auth';

import {
  changeErrorValue,
  inviteResearcherRequest,
} from 'containers/InviteResearcher/actions';
import InviteResearcher from '../InviteResearcher';
import UserTable from './Components/UserTable';
import messages from './messages';
import { TeamIdContext } from './Components/utils';

const initialDelay = 500;

function UserList({
  userList: { users, usersSize, usersLoading, usersError, shouldRefetch },
  fetchUsersRequest,
  changeActivateStatus,
  removeUserFromTeam,
  sendInvitation,
  deleteError,
  filterableRoles,
  user: { roles },
  listOnly,
  teamId,
  pageTitle,
}) {
  const { formatMessage } = useIntl();

  const pages = Math.ceil(usersSize / PER_PAGE);

  const [filterText, setFilterText] = useState('');
  const [selectRoles, setSelectRoles] = useState(filterableRoles);
  const [showInactive, setShowInactive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const debouncedFilterText = useDebounce(filterText, initialDelay);

  const clearFilters = selectRoles.length === filterableRoles.length;

  useEffect(() => {
    fetchUsersRequest(
      selectRoles,
      debouncedFilterText,
      page,
      showInactive,
      teamId,
    );
  }, [selectRoles, debouncedFilterText, page, showInactive, teamId]);

  useEffect(() => {
    if (shouldRefetch)
      fetchUsersRequest(
        selectRoles,
        debouncedFilterText,
        page,
        showInactive,
        teamId,
      );
  }, [shouldRefetch]);

  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [usersSize]);

  const toggleRole = (role) => () => {
    const toggledArray = xor(selectRoles, [role]);
    setSelectRoles(toggledArray);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getContent = () => {
    if (usersLoading && users.length === 0) return <Loader />;
    if (usersError) return <ErrorAlert errorText={usersError} />;
    return (
      <div>
        <Container style={{ marginBottom: 40, padding: 0 }} fluid>
          <Row align="center">
            <Col xs={12} xl={6} xxl={5}>
              <Row align="center">
                {filterableRoles.map((role, index) => (
                  <Col key={index} xs="content" style={{ marginBottom: 10 }}>
                    <UserRoleTile
                      role={role}
                      onClick={toggleRole(role)}
                      disabled={!selectRoles.includes(role)}
                    />
                  </Col>
                ))}
                {!clearFilters && (
                  <Col xs={1} style={{ marginBottom: 10 }}>
                    <ActionIcon
                      height={15}
                      width={15}
                      onClick={() => setSelectRoles(filterableRoles)}
                      background="none"
                    />
                  </Col>
                )}
                {clearFilters && <Box width={25} />}
                <Col xs={12} sm={4} style={{ marginBottom: 10 }}>
                  <Box
                    cursor="pointer"
                    onClick={() => setShowInactive(!showInactive)}
                    display="inline-flex"
                    justify="center"
                    align="center"
                  >
                    <Checkbox mr={5} checked={showInactive} />
                    <FormattedMessage {...messages.showInactive} />
                  </Box>
                </Col>
              </Row>
            </Col>
            <Col xs={12} xl={6} xxl={7} style={{ marginBottom: 10 }}>
              <SearchInput
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </Col>
          </Row>
        </Container>
        <TeamIdContext.Provider value={teamId}>
          <UserTable
            formatMessage={formatMessage}
            users={users}
            loading={usersLoading}
            changeActivateStatus={(id, active) =>
              changeActivateStatus(id, active, showInactive)
            }
            removeUserFromTeam={removeUserFromTeam}
            setPage={setPage}
            page={page}
            pages={pages}
          />
        </TeamIdContext.Provider>
      </div>
    );
  };

  if (listOnly) return getContent();

  return (
    <>
      <InviteResearcher
        visible={modalVisible}
        onClose={closeModal}
        sendInvitation={sendInvitation}
        deleteError={deleteError}
      />
      <Box height="100%" overflow="scroll" display="flex" justify="center">
        <Helmet>
          <title>{pageTitle ?? formatMessage(messages.manageAccount)}</title>
        </Helmet>
        <Box mt={30} width="100%" px="10%">
          <Box display="flex" mb={30}>
            <H1 mr={10}>
              <FormattedMessage {...messages.manageAccount} />
            </H1>
            {roles.includes(Roles.admin) && (
              <TextButton
                buttonProps={{
                  color: themeColors.secondary,
                  fontWeight: 'bold',
                }}
                onClick={openModal}
              >
                <FormattedMessage {...messages.inviteResearcher} />
              </TextButton>
            )}
          </Box>
          {getContent()}
        </Box>
      </Box>
    </>
  );
}

UserList.propTypes = {
  fetchUsersRequest: PropTypes.func.isRequired,
  changeActivateStatus: PropTypes.func.isRequired,
  removeUserFromTeam: PropTypes.func.isRequired,
  userList: PropTypes.object,
  user: PropTypes.object,
  listOnly: PropTypes.bool,
  teamId: PropTypes.string,
  deleteError: PropTypes.func,
  sendInvitation: PropTypes.func,
  filterableRoles: PropTypes.arrayOf(PropTypes.string),
  pageTitle: PropTypes.string,
};

UserList.defaultProps = {
  listOnly: false,
  filterableRoles: [
    Roles.participant,
    Roles.researcher,
    Roles.teamAdmin,
    Roles.thirdParty,
  ],
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchUsers,
  changeActivateStatus: changeActivateStatusRequest,
  removeUserFromTeam: deleteUserFromTeamRequest,
  sendInvitation: inviteResearcherRequest,
  deleteError: changeErrorValue,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectReducer({ key: 'userList', reducer: UserListReducer }),
  injectSaga({ key: 'userList', saga: userListSaga }),
  memo,
)(UserList);
