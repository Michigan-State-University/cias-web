import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useInjectSaga } from 'redux-injectors';

import {
  makeSelectUser,
  editOtherUserRequest,
  editSingleUserSaga,
} from 'global/reducers/user';

import Switch, { LabelPosition } from 'components/Switch';
import Box from 'components/Box';
import Text from 'components/Text';

import messages from '../messages';

const WrappedCatMhSetting = (): JSX.Element | null => {
  useInjectSaga({ key: 'editSingleUser', saga: editSingleUserSaga });

  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { user } = useSelector(makeSelectUser());

  if (!user) {
    return null;
  }

  const { abilityToCreateCatMh, id: userId } = user;

  const editUserCall = () =>
    dispatch(
      editOtherUserRequest({
        userId,
        abilityToCreateCatMh: !abilityToCreateCatMh,
      }),
    );

  return (
    <Box display="flex" align="center">
      <Switch
        disabled={false}
        id="ability-to-create-cat-mh"
        checked={abilityToCreateCatMh}
        onToggle={editUserCall}
        labelPosition={LabelPosition.Right}
      >
        <Text ml={10}>{formatMessage(messages.canCreateCatMhSession)}</Text>
      </Switch>
    </Box>
  );
};

export default WrappedCatMhSetting;
