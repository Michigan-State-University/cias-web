import PropTypes from 'prop-types';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import { RolesColors } from 'models/User/UserRoles';

import { Col, Row, NoMarginRow } from 'components/ReactGridSystem';
import Box from 'components/Box';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import Comment from 'components/Text/Comment';
import Divider from 'components/Divider';
import Circle from 'components/Circle';
import SidePanel from 'components/SidePanel';
import Tooltip from 'components/Tooltip';

import UserDetailsComponent from './UserDetailsComponent';
import UserItem from './UserItem';
import InviteComponent from './InviteComponent';

import { FullWidthContainer } from '../../../styled';
import messages from '../../../messages';

const UserListComponent = ({
  header,
  helper,
  inviteTo,
  onInvite,
  role,
  users,
}) => {
  const { formatMessage } = useIntl();

  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);
  const openInviteForm = () => setIsInviteFormOpen(true);
  const closeInviteForm = useCallback(() => setIsInviteFormOpen(false), []);

  const [selectedUser, setSelectedUser] = useState(null);
  const openUserDetails = useCallback(
    user => () => {
      if (user.active) {
        setSelectedUser(user);
      }
    },
    [],
  );
  const closeUserDetails = useCallback(() => setSelectedUser(null), []);

  const avatarColor = useMemo(() => RolesColors[role], [role]);

  const handleInvite = useCallback(email => onInvite(email, role), [role]);

  return (
    <FullWidthContainer>
      <Row>
        <Col>
          <Divider />
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <NoMarginRow>
            <Comment mr={8}>{header}</Comment>

            <Tooltip id={`UserList-Tooltip-${header}`} text={helper}>
              <Circle
                bg={themeColors.secondary}
                color={colors.white}
                size="16px"
                fontWeight="bold"
                fontSize={11}
                child="?"
              />
            </Tooltip>
          </NoMarginRow>
        </Col>
      </Row>

      <Row mt={16}>
        <Col>
          {users.map((user, index) => (
            <Box
              key={`UserItem-${user.id}-${index}`}
              mb={index === users.length - 1 ? 0 : 8}
            >
              <UserItem
                avatarColor={avatarColor}
                user={user}
                onClick={openUserDetails(user)}
              />
            </Box>
          ))}
        </Col>
      </Row>

      <Row mt={24}>
        <Col>
          <TextButton onClick={openInviteForm}>
            <Text color={themeColors.secondary} fontWeight="bold">
              {formatMessage(messages.addAdminButton)}
            </Text>
          </TextButton>
        </Col>
      </Row>

      <SidePanel isOpen={isInviteFormOpen}>
        <InviteComponent
          inviteTo={inviteTo}
          onCancel={closeInviteForm}
          onInvite={handleInvite}
        />
      </SidePanel>

      <SidePanel isOpen={Boolean(selectedUser)} style={{ width: 350 }}>
        {Boolean(selectedUser) && (
          <UserDetailsComponent
            onCancel={closeUserDetails}
            role={role}
            userId={selectedUser.id}
          />
        )}
      </SidePanel>
    </FullWidthContainer>
  );
};

UserListComponent.propTypes = {
  header: PropTypes.string,
  helper: PropTypes.string,
  inviteTo: PropTypes.string,
  onInvite: PropTypes.func,
  role: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      verified: PropTypes.bool,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      fullName: PropTypes.string,
    }),
  ),
};

export default memo(UserListComponent);
