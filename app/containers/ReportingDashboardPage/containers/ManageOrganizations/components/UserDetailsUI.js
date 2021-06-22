import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { borders, colors, themeColors } from 'theme';

import { RolesColors } from 'models/User/UserRoles';

import { Col, Row, Container } from 'components/ReactGridSystem';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import LabelledInput from 'components/Input/LabelledInput';
import Badge from 'components/Badge';
import Box from 'components/Box';
import Circle from 'components/Circle';
import Tooltip from 'components/Tooltip';
import UserAvatar from 'components/UserAvatar';

import messages from '../../../messages';

const UserDetailsUI = ({
  user,
  roleHeader,
  roleHelper,
  onStatusChange,
  onEdit,
  role,
  onCancel,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Row align="center" justify="between" mb={30} nogutter>
        <Col>
          <TextButton onClick={onCancel}>
            <Text color={themeColors.secondary} fontWeight="bold">
              {formatMessage(messages.userGoBack)}
            </Text>
          </TextButton>

          <Box
            bg={colors.bluewood}
            borderRadius={borders.borderRadius}
            padding={8}
          >
            <Container>
              <Row align="center">
                <Text fontWeight="bold" color={colors.white} mr={10}>
                  {roleHeader}
                </Text>
                <Tooltip id={`UserDetails-Tooltip-${role}`} text={roleHelper}>
                  <Circle
                    bg={themeColors.secondary}
                    color={colors.white}
                    size="16px"
                    fontWeight="bold"
                    fontSize={11}
                    child="?"
                  />
                </Tooltip>
              </Row>
            </Container>
          </Box>
        </Col>
        <Col width="content">
          <UserAvatar
            avatar={user.avatar}
            backgroundColor={RolesColors[role]}
            firstName={user.firstName}
            height={76}
            lastName={user.lastName}
            mr={10}
            width={76}
          />
        </Col>
      </Row>

      <LabelledInput
        mb={30}
        label={formatMessage(messages.userFirstNameLabel)}
        placeholder={formatMessage(messages.userFirstNamePlaceholder)}
        onBlur={onEdit('firstName', true)}
        value={user.firstName}
      />

      <LabelledInput
        mb={30}
        label={formatMessage(messages.userLastNameLabel)}
        placeholder={formatMessage(messages.userLastNamePlaceholder)}
        onBlur={onEdit('lastName', true)}
        value={user.lastName}
      />

      <LabelledInput
        mb={30}
        label={formatMessage(messages.userRoleLabel)}
        placeholder={formatMessage(messages.userRolePlaceholder)}
        onBlur={onEdit('description')}
        value={user.description}
      />

      <LabelledInput
        mb={30}
        label={formatMessage(messages.userEmailLabel)}
        placeholder={formatMessage(messages.userEmailPlaceholder)}
        onBlur={undefined}
        inputProps={{ disabled: true }}
        value={user.email}
      />

      <Row>
        <Col>
          <Badge
            color={themeColors.warning}
            onClick={onStatusChange}
            bgWithOpacity
            clickable
          >
            {user.active
              ? formatMessage(messages.userDeactivate)
              : formatMessage(messages.userActivate)}
          </Badge>
        </Col>
      </Row>
    </>
  );
};

UserDetailsUI.propTypes = {
  onCancel: PropTypes.func,
  onEdit: PropTypes.func,
  onStatusChange: PropTypes.func,
  role: PropTypes.string,
  roleHeader: PropTypes.string,
  roleHelper: PropTypes.string,
  user: PropTypes.object,
};

export default memo(UserDetailsUI);
