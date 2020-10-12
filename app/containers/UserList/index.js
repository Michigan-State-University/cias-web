/**
 *
 * UserList
 *
 */

import React, { memo, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import xor from 'lodash/xor';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

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
} from 'global/reducers/userList';
import { themeColors } from 'theme';
import { PER_PAGE } from 'global/reducers/userList/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import InviteResearcher from '../InviteResearcher';
import UserTable from './Components/UserTable';
import messages from './messages';

const rolesToFilter = [Roles.participant, Roles.researcher];
const initialDelay = 500;

function UserList({
  userList: { users, usersSize, usersLoading, usersError },
  fetchUsersRequest,
  changeActivateStatus,
  intl: { formatMessage },
}) {
  useInjectReducer({ key: 'userList', reducer: UserListReducer });
  useInjectSaga({ key: 'userList', saga: userListSaga });

  const pages = Math.ceil(usersSize / PER_PAGE);

  const [filterText, setFilterText] = useState('');
  const [selectRoles, setSelectRoles] = useState(rolesToFilter);
  const [showInactive, setShowInactive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const debouncedFilterText = useDebounce(filterText, initialDelay);

  const clearFilters = selectRoles.length === rolesToFilter.length;

  useEffect(() => {
    fetchUsersRequest(selectRoles, debouncedFilterText, page, showInactive);
  }, [selectRoles, debouncedFilterText, page, showInactive]);

  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [usersSize]);

  const toggleRole = role => () => {
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
        <Box display="flex" justify="between" mb={40}>
          <Box display="flex" align="center">
            <Box display="inline-block" width="100%">
              <Box display="flex" align="center">
                {rolesToFilter.map((role, index) => (
                  <UserRoleTile
                    role={role}
                    key={index}
                    onClick={toggleRole(role)}
                    disabled={!selectRoles.includes(role)}
                  />
                ))}
                {!clearFilters && (
                  <ActionIcon
                    height={15}
                    width={15}
                    mr={10}
                    onClick={() => setSelectRoles(rolesToFilter)}
                    background="none"
                  />
                )}
                {clearFilters && <Box width={25} />}
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
              </Box>
            </Box>
          </Box>
          <SearchInput
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </Box>
        <UserTable
          formatMessage={formatMessage}
          users={users}
          loading={usersLoading}
          changeActivateStatus={(id, active) =>
            changeActivateStatus(id, active, showInactive)
          }
          setPage={setPage}
          page={page}
          pages={pages}
        />
      </div>
    );
  };

  return (
    <Fragment>
      <InviteResearcher visible={modalVisible} onClose={closeModal} />
      <Box height="100%" overflow="scroll" display="flex" justify="center">
        <Helmet>
          <title>Users list</title>
          <meta name="description" content="List of users" />
        </Helmet>
        <Box mt={30} width="100%" px="10%">
          <Box display="flex" mb={30}>
            <H1 mr={10}>
              <FormattedMessage {...messages.manageAccount} />
            </H1>
            <TextButton
              buttonProps={{ color: themeColors.secondary, fontWeight: 'bold' }}
              onClick={openModal}
            >
              <FormattedMessage {...messages.inviteResearcher} />
            </TextButton>
          </Box>
          {getContent()}
        </Box>
      </Box>
    </Fragment>
  );
}

UserList.propTypes = {
  fetchUsersRequest: PropTypes.func.isRequired,
  changeActivateStatus: PropTypes.func.isRequired,
  userList: PropTypes.object,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchUsers,
  changeActivateStatus: changeActivateStatusRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(UserList);
