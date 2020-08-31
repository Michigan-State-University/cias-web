/**
 *
 * SelectResearchers
 *
 */

import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import remove from 'lodash/remove';

import useFilter from 'utils/useFilter';
import Row from 'components/Row';
import Loader from 'components/Loader';
import Column from 'components/Column';
import Box from 'components/Box';
import Text from 'components/Text';
import { StripedTR, Table, TBody, TD, TH, THead } from 'components/Table';
import Checkbox from 'components/Checkbox';
import { StyledButton } from 'components/Button/StyledButton';
import ErrorAlert from 'components/ErrorAlert';
import search from 'assets/svg/search.svg';
import { Input } from 'components/Input';
import { useInjectReducer } from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { ROLES } from 'global/reducers/auth/constants';
import {
  fetchUsers,
  makeSelectUserList,
  UserListReducer,
  userListSaga,
} from 'global/reducers/userList';
import { copyProblemRequest } from 'global/reducers/problems';

import messages from './messages';

const SelectResearchers = ({
  intl: { formatMessage },
  userList: { users, usersLoading, usersError },
  fetchUsersRequest,
  copyProblemToResearchers,
  problemId,
  onClose,
}) => {
  useInjectReducer({ key: 'userList', reducer: UserListReducer });

  const [selected, setSelected] = useState([]);

  const [finalUsers, filterValue, setFilterValue] = useFilter(
    users,
    'full_name',
  );
  useLayoutEffect(() => {
    fetchUsersRequest([ROLES.researcher]);
  }, []);

  const handleSend = () => {
    copyProblemToResearchers({ problemId, users: selected });
    onClose();
  };

  if (usersLoading)
    return (
      <Box>
        <Loader type="inline" />
      </Box>
    );
  if (usersError)
    return (
      <Box>
        <ErrorAlert errorText={usersError} />
      </Box>
    );
  return (
    <Box>
      <Row pt={10} width="100%">
        <img src={search} alt="Search" />
        <Input
          ml={5}
          width="100%"
          placeholder={formatMessage(messages.find)}
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
        />
        <StyledButton width={200} ml={10} onClick={handleSend}>
          <FormattedMessage {...messages.send} />
        </StyledButton>
      </Row>
      <Table>
        <THead>
          <StripedTR>
            <TH scope="col">
              <Column width={300} pl={10}>
                <Text textAlign="left" fontWeight="bold">
                  <FormattedMessage {...messages.name} />
                </Text>
              </Column>
            </TH>
            <TH scope="col">
              <Column width={300}>
                <Text textAlign="left" fontWeight="bold">
                  <FormattedMessage {...messages.email} />
                </Text>
              </Column>
            </TH>
            <TH scope="col">
              <Column width="100%" />
            </TH>
          </StripedTR>
        </THead>
        <TBody>
          {finalUsers &&
            finalUsers.map(user => {
              const { full_name: fullName, email, id } = user;
              const isChecked = selected.includes(id);
              const handleClick = () => {
                if (!isChecked) setSelected([...selected, id]);
                else setSelected(remove(selected, elem => elem !== id));
              };
              return (
                <StripedTR key={`row-th-${id}`}>
                  <TD pl={10}>{fullName}</TD>
                  <TD>{email}</TD>
                  <TD pr={10}>
                    <Checkbox checked={isChecked} onClick={handleClick} />
                  </TD>
                </StripedTR>
              );
            })}
        </TBody>
      </Table>
    </Box>
  );
};

SelectResearchers.propTypes = {
  intl: PropTypes.object,
  userList: PropTypes.object,
  fetchUsersRequest: PropTypes.func.isRequired,
  copyProblemToResearchers: PropTypes.func,
  problemId: PropTypes.string,
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchUsers,
  copyProblemToResearchers: copyProblemRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userList', saga: userListSaga });

export default compose(
  injectIntl,
  withConnect,
  withSaga,
)(SelectResearchers);