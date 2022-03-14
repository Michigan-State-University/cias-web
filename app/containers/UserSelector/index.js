/**
 *
 * UserSelector
 *
 */

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Row from 'components/Row';
import Loader from 'components/Loader';
import Box from 'components/Box';
import ErrorAlert from 'components/ErrorAlert';
import { injectSaga, injectReducer } from 'redux-injectors';

import {
  fetchUsersSelector,
  makeSelectUserList,
  UserListReducer,
  userListSaga,
} from 'global/reducers/userList';

import Select from 'components/Select';
import { Roles } from 'models/User/UserRoles';
import messages from './messages';

const UserSelector = ({
  intl: { formatMessage },
  userList: {
    usersSelector,
    usersSelectorLoading,
    usersSelectorError,
    shouldRefetch,
  },
  fetchUsersRequest,
  onSelect,
  selectedUserId,
  rolesToInclude,
  additionalUsers = [],
  disabled,
}) => {
  useEffect(() => {
    fetchUsersRequest(rolesToInclude);
  }, []);

  useEffect(() => {
    if (shouldRefetch) fetchUsersRequest(rolesToInclude);
  }, [shouldRefetch]);

  const options = useMemo(
    () =>
      uniqBy(additionalUsers.concat(usersSelector), 'id').map(
        ({ email, id }) => ({ value: id, label: email }),
      ),
    [usersSelector, additionalUsers],
  );

  const selectedValue = useMemo(
    () => options.find(({ value }) => value === selectedUserId),
    [selectedUserId],
  );

  const handleOnSelect = ({ value }) => {
    onSelect(usersSelector.find(({ id }) => id === value));
  };

  if (usersSelectorLoading)
    return (
      <Box>
        <Loader type="inline" />
      </Box>
    );
  if (usersSelectorError)
    return (
      <Box>
        <ErrorAlert errorText={usersSelectorError} />
      </Box>
    );
  return (
    <Box width="100%" data-private>
      <Row pt={10} width="100%">
        <Select
          width="100%"
          selectProps={{
            isDisabled: disabled,
            options,
            value: selectedValue,
            onChange: handleOnSelect,
            placeholder: formatMessage(messages.inputPlaceholder),
            noOptionsMessage: () => formatMessage(messages.noUsersMessage),
          }}
        />
      </Row>
    </Box>
  );
};

UserSelector.propTypes = {
  intl: PropTypes.object,
  userList: PropTypes.object,
  fetchUsersRequest: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  selectedUserId: PropTypes.string,
  disabled: PropTypes.bool,
  rolesToInclude: PropTypes.arrayOf(PropTypes.string),
  additionalUsers: PropTypes.arrayOf(PropTypes.object),
};

UserSelector.defaultProps = {
  rolesToInclude: Roles.allRoles,
};

const mapStateToProps = createStructuredSelector({
  userList: makeSelectUserList(),
});

const mapDispatchToProps = {
  fetchUsersRequest: fetchUsersSelector,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userList', saga: userListSaga });
const withReducer = injectReducer({
  key: 'userList',
  reducer: UserListReducer,
});

export default compose(
  injectIntl,
  withConnect,
  withSaga,
  withReducer,
)(UserSelector);
