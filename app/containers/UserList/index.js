/**
 *
 * UserList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import xor from 'lodash/xor';

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
import { boxShadows, colors, themeColors } from 'theme';
import { FormattedMessage, injectIntl } from 'react-intl';

import H1 from 'components/H1';
import UserRoleTile from 'components/UserRoleTile';
import TextButton from 'components/Button/TextButton';
import SearchInput from 'components/Input/SearchInput';
import { Roles } from 'models/User/UserRoles';
import Checkbox from 'components/Checkbox';
import messages from './messages';

const columns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.email),
  formatMessage(messages.role),
];
const rolesToFilter = [Roles.participant, Roles.researcher];

export function UserList({
  userList: { users, usersLoading, usersError },
  fetchUsersRequest,
  intl: { formatMessage },
}) {
  useInjectReducer({ key: 'userList', reducer: UserListReducer });
  useInjectSaga({ key: 'userList', saga: userListSaga });
  const [filterText, setFilterText] = useState('');
  const [selectRoles, setSelectRoles] = useState(rolesToFilter);
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    fetchUsersRequest();
  }, []);

  const toggleRole = role => () => {
    const toggledArray = xor(selectRoles, [role]);
    setSelectRoles(toggledArray);
  };

  const getContent = () => {
    if (usersLoading) return <Loader />;
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
        <Table width="100%" mb={20} shadow={boxShadows.selago}>
          <THead>
            <StripedTR>
              {columns(formatMessage).map((column, columnIndex) => (
                <TH
                  bg={colors.white}
                  color={colors.bluewood}
                  opacity={0.6}
                  scope="col"
                  key={`col-th-${columnIndex}`}
                >
                  <Column pl={20} align="start" width={`${100 / 3}%`}>
                    {column}
                  </Column>
                </TH>
              ))}
            </StripedTR>
          </THead>
          <TBody>
            {users.map(({ id, email, full_name: fullName, roles }) => (
              <StripedTR
                hoverBg={colors.linkWater}
                color={colors.white}
                key={`row-th-${id}`}
              >
                <TD pl={20}>{fullName}</TD>
                <TD pl={20}>{email}</TD>
                <TD pl={20}>
                  <UserRoleTile role={roles[0]} />
                </TD>
              </StripedTR>
            ))}
          </TBody>
        </Table>
      </div>
    );
  };

  return (
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
            color={themeColors.secondary}
            onClick={() => console.log('showModal')}
          >
            <FormattedMessage {...messages.inviteResearcher} />
          </TextButton>
        </Box>
        {getContent()}
      </Box>
    </Box>
  );
}

UserList.propTypes = {
  fetchUsersRequest: PropTypes.func.isRequired,
  userList: PropTypes.object,
  intl: PropTypes.object,
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
  injectIntl,
)(UserList);
