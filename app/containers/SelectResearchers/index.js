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
import trim from 'lodash/trim';

import { colors } from 'theme';
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
import SearchInput from 'components/Input/SearchInput';
import { injectSaga, injectReducer } from 'redux-injectors';

import { Roles } from 'models/User/UserRoles';
import {
  makeSelectUserList,
  UserListReducer,
  userListSaga,
  fetchResearchersRequest,
} from 'global/reducers/userList';

import { makeSelectUser } from 'global/reducers/auth';
import { ternary } from 'utils/ternary';
import messages from './messages';

const SelectResearchers = ({
  intl: { formatMessage },
  userList: {
    researchersSelector,
    researchersSelectorLoading,
    researchersSelectorError,
  },
  fetchUsersRequest,
  onClose,
  user: { id: currentUserId },
  onResearchersSelected,
}) => {
  const [selected, setSelected] = useState([]);

  const [finalUsers, filterValue, setFilterValue] = useFilter(
    researchersSelector.filter(({ id }) => id !== currentUserId),
    'fullName',
    {},
  );
  useLayoutEffect(() => {
    fetchUsersRequest([Roles.researcher]);
  }, []);

  const handleSend = () => {
    onResearchersSelected(selected);
    onClose();
  };

  const getDisplayName = fullName => {
    const trimmedFullName = trim(fullName);
    return ternary(
      trimmedFullName,
      trimmedFullName,
      <Text color={colors.flamingo}>
        {formatMessage(messages.waitingForActivation)}
      </Text>,
    );
  };

  if (researchersSelectorLoading)
    return (
      <Box>
        <Loader type="inline" />
      </Box>
    );
  if (researchersSelectorError)
    return (
      <Box>
        <ErrorAlert errorText={researchersSelectorError} />
      </Box>
    );
  return (
    <Box>
      <Row pt={10} width="100%">
        <SearchInput
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
              const { fullName, email, id } = user;
              const isChecked = selected.includes(id);
              const handleClick = () => {
                if (!isChecked) setSelected([...selected, id]);
                else setSelected(remove(selected, elem => elem !== id));
              };
              return (
                <StripedTR key={`row-th-${id}`}>
                  <TD pl={10}>{getDisplayName(fullName)}</TD>
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
  user: PropTypes.object,
  fetchUsersRequest: PropTypes.func.isRequired,
  copyInterventionToResearchers: PropTypes.func,
  interventionId: PropTypes.string,
  onClose: PropTypes.func,
  onResearchersSelected: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchResearchersRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'userList',
  reducer: UserListReducer,
});
const withSaga = injectSaga({ key: 'userList', saga: userListSaga });

export default compose(
  injectIntl,
  withConnect,
  withReducer,
  withSaga,
)(SelectResearchers);
