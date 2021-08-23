import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'redux-injectors';

import { UserDto } from 'models/User/UserDto';
import {
  makeSelectUser,
  editOtherUserRequest,
  editSingleUserSaga,
} from 'global/reducers/user';

import Switch from 'components/Switch';
import Box from 'components/Box';
import Text from 'components/Text';

import messages from '../messages';

type Props = {
  userState: {
    user: UserDto;
  };
  editUser: (userData: {
    userId: string;
    abilityToCreateCatMh: boolean;
  }) => void;
};

const WrappedCatMhSetting = ({
  userState: { user },
  editUser,
}: Props): JSX.Element | null => {
  useInjectSaga({ key: 'editSingleUser', saga: editSingleUserSaga });

  const { formatMessage } = useIntl();

  if (!user) {
    return null;
  }

  const { abilityToCreateCatMh, id: userId } = user;

  const editUserCall = () =>
    editUser({ userId, abilityToCreateCatMh: !abilityToCreateCatMh });

  return (
    <Box display="flex" align="center">
      <Switch
        disabled={false}
        id="ability-to-create-cat-mh"
        checked={abilityToCreateCatMh}
        onToggle={editUserCall}
      />
      <Text ml={10}>{formatMessage(messages.canCreateCatMhSession)}</Text>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editOtherUserRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WrappedCatMhSetting);
