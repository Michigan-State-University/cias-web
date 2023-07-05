import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import { Markup } from 'interweave';

import { themeColors } from 'theme';
import { Roles } from 'models/User/RolesManager';

import FormikCheckbox from 'components/FormikCheckbox';
import Text from 'components/Text';
import Modal from 'components/Modal';

import messages from './messages';
import { TermsAndConditions } from './styled';

type Props = {
  role?: Roles;
};

const TermsCheckbox = ({ role }: Props) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { formatMessage } = useIntl();

  const termsAndConditionsText =
    role === Roles.Participant || !role
      ? formatMessage(messages.termsAndConditionsParticipantText)
      : formatMessage(messages.termsAndConditionsOtherRolesText);

  return (
    <>
      <Modal
        visible={showTermsModal}
        title={formatMessage(messages.termsAndConditions)}
        onClose={() => setShowTermsModal(false)}
        maxWidth="80%"
      >
        <TermsAndConditions>
          <Markup content={termsAndConditionsText} noWrap />
        </TermsAndConditions>
      </Modal>
      <FormikCheckbox formikKey="terms">
        {formatMessage(messages.accept)}
        <Text
          clickable
          ml={3}
          lineHeight="1.5em"
          fontWeight="bold"
          color={themeColors.secondary}
          onClick={() => {
            setShowTermsModal(true);
          }}
        >
          {formatMessage(messages.termsAndConditions)}
        </Text>
      </FormikCheckbox>
    </>
  );
};

export default TermsCheckbox;
