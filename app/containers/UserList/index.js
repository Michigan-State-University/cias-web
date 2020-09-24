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
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

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
import H1 from 'components/H1';
import UserRoleTile from 'components/UserRoleTile';
import StyledTextButton from 'components/Button/StyledTextButton';
import SearchInput from 'components/Input/SearchInput';
import Text from 'components/Text';
import Checkbox from 'components/Checkbox';
import ConfirmationBox from 'components/ConfirmationBox';
import CloseIcon from 'components/CloseIcon';
import Row from 'components/Row';

import {
  fetchUsers,
  userListSaga,
  UserListReducer,
  makeSelectUserList,
  changeActivateStatusRequest,
} from 'global/reducers/userList';
import { boxShadows, colors, themeColors } from 'theme';

import { Roles } from 'models/User/UserRoles';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import useDebounce from 'utils/useDebounce';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { ternary } from 'utils/ternary';

import messages from './messages';
import PaginationHandler from './Components/PaginationHelper';

const columns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.email),
  formatMessage(messages.role),
  null,
];
const rolesToFilter = [Roles.participant, Roles.researcher, Roles.admin];
const initialDelay = 500;

export function UserList({
  userList: { users, usersLoading, usersError },
  fetchUsersRequest,
  changeActivateStatus,
  intl: { formatMessage },
  history,
}) {
  useInjectReducer({ key: 'userList', reducer: UserListReducer });
  useInjectSaga({ key: 'userList', saga: userListSaga });

  const [filterText, setFilterText] = useState('');
  const [selectRoles, setSelectRoles] = useState(rolesToFilter);
  const [showInactive, setShowInactive] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState({});
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

  const handleClick = id => () => history.push(`/profile/${id}`);

  const handleOpenDeactivateModal = user => setDeactivateModal(user);
  const handleDeactivate = () => {
    const { deactivated, id } = deactivateModal;
    changeActivateStatus(id, !deactivated);
    setDeactivateModal({});
  };

  const contentText = () => {
    const { email, fullName } = deactivateModal || {};
    return (
      <>
        <Text textAlign="center" fontWeight="bold">
          {fullName}
        </Text>
        <Text textAlign="center">{email}</Text>
      </>
    );
  };
  const modalDescription = ternary(
    deactivateModal.deactivated,
    formatMessage(messages.activateAccountConfirm),
    formatMessage(messages.deactivateAccountConfirm),
  );

  const getContent = () => {
    if (usersLoading && users.length === 0) return <Loader />;
    if (usersError) return <ErrorAlert errorText={usersError} />;
    return (
      <div>
        <ConfirmationBox
          visible={!isNullOrUndefined(deactivateModal.id)}
          onClose={() => setDeactivateModal({})}
          description={modalDescription}
          content={contentText()}
          confirmAction={handleDeactivate}
        />
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
                    width="auto"
                  >
                    <Column pl={20} align="start">
                      {column}
                    </Column>
                  </TH>
                ))}
              </StripedTR>
            </THead>
            <TBody>
              {users.map(({ id, email, fullName, roles, deactivated }) => (
                <StripedTR
                  lastItemHoverable
                  cursor="pointer"
                  hoverBg={colors.linkWater}
                  color={colors.white}
                  key={`row-th-${id}`}
                  textColor={deactivated ? colors.grey : colors.black}
                  onClick={handleClick(id)}
                >
                  <TD pl={20}>{fullName}</TD>
                  <TD pl={20}>{email}</TD>
                  <TD pl={20}>
                    <UserRoleTile role={roles[0]} disabled={deactivated} />
                  </TD>
                  <TD>
                    <Row width="100%" justify="end" pr={20}>
                      <StyledTextButton
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenDeactivateModal({
                            id,
                            email,
                            fullName,
                            deactivated,
                          });
                        }}
                      >
                        <Text color={colors.flamingo} fontWeight="bold">
                          {deactivated
                            ? formatMessage(messages.activateAccount)
                            : formatMessage(messages.deactivateAccount)}
                        </Text>
                      </StyledTextButton>
                    </Row>
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
  changeActivateStatus: PropTypes.func.isRequired,
  userList: PropTypes.object,
  intl: PropTypes.object,
  history: PropTypes.object,
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
  withRouter,
)(UserList);
