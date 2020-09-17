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
import {
  StripedTR,
  TableLoading,
  TBody,
  TD,
  TH,
  THead,
} from 'components/Table';
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
import StyledTextButton from 'components/Button/StyledTextButton';
import SearchInput from 'components/Input/SearchInput';
import { Roles } from 'models/User/UserRoles';
import Checkbox from 'components/Checkbox';
import useDebounce from 'utils/useDebounce';
import CloseIcon from 'components/CloseIcon';
import messages from './messages';
import PaginationHandler from './Components/PaginationHelper';

const columns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.email),
  formatMessage(messages.role),
];
const rolesToFilter = [Roles.participant, Roles.researcher, Roles.admin];
const initialDelay = 500;

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
  const [page, setPage] = useState(1);
  const debouncedFilterText = useDebounce(filterText, initialDelay);

  const clearFilters = selectRoles.length === rolesToFilter.length;

  useEffect(() => {
    fetchUsersRequest(selectRoles, debouncedFilterText, page);
  }, [selectRoles, debouncedFilterText, page]);

  const toggleRole = role => () => {
    const toggledArray = xor(selectRoles, [role]);
    setSelectRoles(toggledArray);
  };

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
                  <CloseIcon
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
        {users.length === 0 && (
          <H1>
            <FormattedMessage {...messages.noUsers} />
          </H1>
        )}
        {users.length !== 0 && (
          <TableLoading
            loading={usersLoading}
            width="100%"
            mb={20}
            shadow={boxShadows.selago}
          >
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
                    <Column
                      pl={20}
                      align="start"
                      width={`${100 / columns.length}%`}
                    >
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
          </TableLoading>
        )}
        <PaginationHandler
          setPage={setPage}
          page={page}
          userSize={users.length}
        />
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
          <StyledTextButton
            color={themeColors.secondary}
            onClick={() => console.log('showModal')}
          >
            <FormattedMessage {...messages.inviteResearcher} />
          </StyledTextButton>
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
