/**
 *
 * UserList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';
import Box from 'components/Box';
import Column from 'components/Column';
import {
  fetchUsers,
  userListSaga,
  UserListReducer,
  makeSelectUserList,
} from 'global/reducers/userList';

const columns = ['Email', 'Name', 'Roles'];

export function UserList({
  userList: { users, usersLoading, usersError },
  fetchUsersRequest,
}) {
  useInjectReducer({ key: 'userList', reducer: UserListReducer });
  useInjectSaga({ key: 'userList', saga: userListSaga });

  useEffect(() => {
    fetchUsersRequest();
  }, []);

  const getContent = () => {
    if (usersLoading) return <Loader />;
    if (usersError) return <ErrorAlert errorText={usersError} />;
    return (
      <Box width="900px">
        <Table mb={20}>
          <THead>
            <StripedTR>
              {columns.map((column, columnIndex) => (
                <TH scope="col" key={`col-th-${columnIndex}`}>
                  <Column width={300}>{column}</Column>
                </TH>
              ))}
            </StripedTR>
          </THead>
          <TBody>
            {users.map(({ id, email, full_name: fullName, roles }) => (
              <StripedTR key={`row-th-${id}`}>
                <TD pl={5}>{email}</TD>
                <TD pl={5}>{fullName}</TD>
                <TD pl={5}>{roles.join(' ')}</TD>
              </StripedTR>
            ))}
          </TBody>
        </Table>
      </Box>
    );
  };

  return (
    <Box height="100%" overflow="scroll" display="flex" justify="center">
      <Helmet>
        <title>Users list</title>
        <meta name="description" content="List of users" />
      </Helmet>
      {getContent()}
    </Box>
  );
}

UserList.propTypes = {
  fetchUsersRequest: PropTypes.func.isRequired,
  userList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchUsers,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserList);
