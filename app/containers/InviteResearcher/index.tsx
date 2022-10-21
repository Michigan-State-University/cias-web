import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import xor from 'lodash/xor';

import { emailValidator } from 'utils/validators/emailValidator';
import { Roles } from 'models/User/RolesManager';
import globalMessages from 'global/i18n/globalMessages';
import { colors, themeColors } from 'theme';

import Button from 'components/Button';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Modal from 'components/Modal';
import H3 from 'components/H3';
import Text, { Comment } from 'components/Text';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import Box from 'components/Box';

import InvitationList from './Containers/InvitationList';
import inviteResearcherReducer from './reducer';
import messages from './messages';
import { inviteResearcherSaga } from './sagas';
import { makeSelectInviteState } from './selectors';

type Props = {
  visible: boolean;
  onClose: () => void;
  sendInvitation: (email: string, roles?: Roles[]) => void;
  deleteError?: (error: string, value: Nullable<string>) => void;
  inviteOnly?: boolean;
  availableRoles?: Roles[];
  titleMessage?: { id: string; defaultMessage: string };
  modalDescription?: string;
};

const InviteResearcher = ({
  visible,
  onClose,
  sendInvitation,
  deleteError,
  inviteOnly,
  availableRoles = [Roles.Researcher],
  titleMessage = messages.modalTitle,
  modalDescription,
}: Props) => {
  const { formatMessage } = useIntl();

  const [email, setEmail] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);

  const toggleRole = (role: Roles) => () => {
    setSelectedRoles(xor(selectedRoles, [role]));
  };

  // @ts-ignore
  useInjectReducer({ key: 'invitations', reducer: inviteResearcherReducer });
  useInjectSaga({ key: 'inviteResearcher', saga: inviteResearcherSaga });
  const { loading, error: apiError } = useSelector(makeSelectInviteState());

  const handleClose = () => {
    if (deleteError) deleteError('invite', null);
    onClose();
  };

  const isEmailValid = useMemo(
    () => email.length === 0 || emailValidator(email),
    [email],
  );

  const areRolesValid = useMemo(
    () => availableRoles.length === 1 || selectedRoles.length > 0,
    [availableRoles, selectedRoles],
  );

  const inviteUser = () => {
    if (isEmailValid && areRolesValid) {
      sendInvitation(email, selectedRoles);
      setEmail('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      inviteUser();
    }
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      title={formatMessage(titleMessage)}
      minWidth={450}
    >
      {modalDescription && (
        <>
          <Comment>{modalDescription}</Comment>
          <Box
            height="1px"
            width="100%"
            mt={16}
            mb={40}
            bg={colors.lightDivider}
          />
        </>
      )}
      <Column>
        {!modalDescription && (
          <H3 mb={20}>
            <FormattedMessage {...messages.sendInvite} />
          </H3>
        )}
        <Column width="100%" mb={35}>
          <Text mb={10} fontSize={14} id="user-email-label">
            <FormattedMessage {...messages.sectionTitle} />
          </Text>
          <Input
            aria-labelledby="user-email-label"
            maxWidth="none"
            width="100%"
            transparent={false}
            bg={colors.linkWater}
            placeholder={formatMessage(messages.inputPlaceholder)}
            value={email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {!isEmailValid && (
            <Text mt={5} color={themeColors.warning} fontWeight="bold">
              {formatMessage(messages.invalidEmail)}
            </Text>
          )}
        </Column>

        {availableRoles.length > 1 && (
          <>
            <Text fontSize={14} fontWeight="bold" mb={8}>
              {formatMessage(messages.userRole)}
            </Text>
            <Comment mb={24}>{formatMessage(messages.userRoleComment)}</Comment>
            <Box display="flex" gap="24px">
              {availableRoles.map((role) => (
                <Checkbox
                  key={`role-checkbox-${role}`}
                  checked={selectedRoles.includes(role)}
                  onChange={toggleRole(role)}
                  id={`role-checkbox-${role}`}
                >
                  {/* @ts-ignore */}
                  {formatMessage(globalMessages.roles[role])}
                </Checkbox>
              ))}
            </Box>
          </>
        )}
        {!inviteOnly && <InvitationList />}
        {/* @ts-ignore */}
        <Button
          width={260}
          alignSelf="center"
          mt={45}
          mb={5}
          loading={loading}
          onClick={inviteUser}
          disabled={email.length === 0 || !isEmailValid || !areRolesValid}
        >
          <FormattedMessage {...messages.buttonText} />
        </Button>
        {apiError && <ErrorAlert errorText={apiError} mt={25} />}
      </Column>
    </Modal>
  );
};

export default InviteResearcher;
