import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';

import userAvatar from 'assets/svg/user.svg';
import { colors, fontSizes, themeColors } from 'theme';

import { HoverableRow, StyledTextButton } from '../styled';

const UserList = ({
  users,
  buttonIsClose,
  buttonText,
  buttonAction,
  userWithLoading,
}) => {
  const getActionButton = user => {
    const handleClick = () => buttonAction(user);
    return (
      <StyledTextButton
        loading={userWithLoading.email === user.email}
        onClick={handleClick}
        buttonProps={{
          ml: buttonIsClose ? 15 : null,
          color: themeColors.secondary,
        }}
        loaderProps={{
          ml: buttonIsClose ? 15 : null,
          alignSelf: buttonIsClose ? null : 'end',
        }}
      >
        {buttonText}
      </StyledTextButton>
    );
  };

  return (
    <Column>
      {users.map(user => (
        <HoverableRow
          key={`el-user-${user.email}`}
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
              {user.email}
            </Text>
            {buttonIsClose && getActionButton(user)}
          </Row>
          {!buttonIsClose && getActionButton(user)}
        </HoverableRow>
      ))}
    </Column>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  buttonIsClose: PropTypes.bool,
  buttonText: PropTypes.node,
  buttonAction: PropTypes.func,
  userWithLoading: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string,
  }),
};

UserList.defaultProps = {
  buttonIsClose: false,
};

export default UserList;
