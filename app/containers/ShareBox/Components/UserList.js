import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import Spinner from 'components/Spinner';

import userAvatar from 'assets/svg/user.svg';
import { colors, fontSizes, themeColors } from 'theme';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { HoverableRow, StyledTextButton } from '../styled';

const UserList = ({ users, buttons, buttonIsClose, userWithLoading }) => {
  const getActionButtons = (email, id) => {
    const buttonMargin = buttonIsClose ? 15 : null;
    return (
      <Row>
        {userWithLoading.id === id && <Spinner color={themeColors.secondary} />}
        {buttons.map(({ action, disabled, text }, index) => (
          <StyledTextButton
            data-cy={`user-list-action-button-${index}`}
            key={`${text.props.id}-${id}`}
            disabled={!disabled}
            onClick={() => action(id)}
            buttonProps={{
              ml: buttonMargin,
              color: disabled ? themeColors.secondary : colors.grey,
            }}
            loaderProps={{
              ml: buttonMargin,
              alignSelf: buttonIsClose ? null : 'end',
            }}
          >
            {text}
          </StyledTextButton>
        ))}
      </Row>
    );
  };

  return (
    <Column data-cy="user-list">
      {users.map(({ email, id }, index) => (
        <HoverableRow
          data-cy={`user-list-item-${index}`}
          key={`el-user-${email}`}
          align="center"
          justify="between"
          mx={-20}
          px={20}
          py={10}
          borderRadius={5}
          hoverColor={colors.linkWater}
        >
          <Row align="center">
            <Img src={userAvatar} alt="avatar" mr={15} />
            <Text fontSize={fontSizes.regular} lineHeight="270%">
              {email}
            </Text>
            {buttonIsClose &&
              !isNullOrUndefined(id) &&
              getActionButtons(email, id)}
          </Row>
          {!buttonIsClose &&
            !isNullOrUndefined(id) &&
            getActionButtons(email, id)}
        </HoverableRow>
      ))}
    </Column>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  buttonIsClose: PropTypes.bool,
  userWithLoading: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
  }),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.func,
      disabled: PropTypes.bool,
      text: PropTypes.node,
    }),
  ),
};

UserList.defaultProps = {
  buttonIsClose: false,
};

export default UserList;
