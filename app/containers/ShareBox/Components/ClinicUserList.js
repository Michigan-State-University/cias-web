import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/Box';
import H3 from 'components/H3';
import { colors } from 'theme';
import UserList from './UserList';
const ClinicUserList = ({ clinicList, userInvites, buttons, emailLoading }) => (
  <>
    {clinicList.map(({ label, value }) => {
      const clinicInvites = userInvites[value];
      if (!clinicInvites) return null;
      return (
        <Box key={`Session-invitation-clinic-${value}`}>
          <H3>{label}</H3>
          <UserList
            buttons={buttons}
            users={clinicInvites}
            userWithLoading={emailLoading}
          />
          <Box
            width="100%"
            pt={20}
            mt={20}
            borderTop={`1px solid ${colors.botticelli}`}
          />
        </Box>
      );
    })}
  </>
);

ClinicUserList.propTypes = {
  clinicList: PropTypes.array,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.func,
      disabled: PropTypes.bool,
      text: PropTypes.node,
    }),
  ),
  userInvites: PropTypes.object,
  emailLoading: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
  }),
};

export default ClinicUserList;
