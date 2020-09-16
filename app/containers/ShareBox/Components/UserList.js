import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/Column';
import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import Spinner from 'components/Spinner';
import Box from 'components/Box';

import userAvatar from 'assets/svg/user.svg';
import { colors, fontSizes, themeColors } from 'theme';

import { StyledTextButton, HoverableRow } from '../styled';

const UserList = ({
  emails,
  buttonIsClose,
  buttonText,
  buttonAction,
  resendLoading,
}) => {
  const { loading, email: loadingEmail } = resendLoading || {};

  const getActionButton = email => {
    if (loading && loadingEmail === email)
      return <Spinner color={themeColors.secondary} />;
    return (
      <StyledTextButton
        onClick={() => buttonAction([email])}
        fontWeight="bold"
        ml={buttonIsClose ? 15 : null}
      >
        {buttonText}
      </StyledTextButton>
    );
  };

  return (
    <Column>
      {emails.map(email => (
        <HoverableRow
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
            <Box>{buttonIsClose && getActionButton(email)}</Box>
          </Row>
          <Box>{!buttonIsClose && getActionButton(email)}</Box>
        </HoverableRow>
      ))}
    </Column>
  );
};

UserList.propTypes = {
  emails: PropTypes.array,
  buttonIsClose: PropTypes.bool,
  buttonText: PropTypes.node,
  buttonAction: PropTypes.func,
  resendLoading: PropTypes.object,
};

UserList.defaultProps = {
  buttonIsClose: false,
};

export default UserList;
