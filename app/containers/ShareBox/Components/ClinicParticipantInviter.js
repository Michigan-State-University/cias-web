import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
import Select from 'components/Select';
import { colors } from 'theme';
import ChipsInput from './ChipsInput';
import messages from '../messages';

const ClinicParticipantInviter = ({
  formatMessage,
  selectClinics,
  updateInvitation,
  invitation,
}) => {
  const { emails: invitationEmails, healthClinicId } = invitation;
  const [emails, setEmails] = useState(invitationEmails);
  const [selectedClinic, setSelectedClinic] = useState(healthClinicId);

  useEffect(() => {
    setEmails(invitationEmails);
    setSelectedClinic(healthClinicId);
  }, [invitation]);

  useEffect(() => {
    if (selectedClinic && selectedClinic.value && emails.length !== 0) {
      updateInvitation({ emails, healthClinic: selectedClinic });
    }
  }, [selectedClinic, emails]);

  console.log(selectedClinic);
  return (
    <Row display="flex" align="center" mb={10}>
      <ChipsInput
        placeholder={formatMessage(messages.emailOrganizationPlaceholder)}
        value={emails}
        setValue={setEmails}
      />
      <Select
        height={50}
        width="75%"
        ml={10}
        selectProps={{
          bg: colors.zirkon,
          isDisabled: !selectClinics || selectClinics.length === 0,
          options: selectClinics,
          value: selectedClinic,
          onChange: setSelectedClinic,
          placeholder: formatMessage(messages.selectClinic),
          noOptionsMessage: () => formatMessage(messages.notFound),
        }}
      />
    </Row>
  );
};

ClinicParticipantInviter.propTypes = {
  formatMessage: PropTypes.func,
  updateInvitation: PropTypes.func,
  selectClinics: PropTypes.array,
  invitation: PropTypes.shape({
    emails: PropTypes.array,
    healthClinicId: PropTypes.string,
  }),
};

export default ClinicParticipantInviter;
