/**
 *
 * AccountSettings
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';
import H2 from 'components/H2';
import { themeColors, colors, boxShadows } from 'theme';

import messages from './messages';
import WrappedFullNameForm from './Containers/WrappedFullNameForm';
import WrappedPasswordForm from './Containers/WrappedPasswordForm';
import WrappedAvatarForm from './Containers/WrappedAvatarForm';
import WrappedTimezoneForm from './Containers/WrappedTimezoneForm';
import WrappedPhoneNumberForm from './Containers/WrappedPhoneNumberForm';

import { StyledRow, TextButton, StyledTimezoneBox } from './styled';

const Profile = (props) => {
  const {
    intl: { formatMessage },
    PasswordComponent,
    AvatarComponent,
    FullNameComponent,
    TimezoneComponent,
    DeactivationComponent,
    PhoneNumberComponent,
    CatMhSettingsComponent,
    userId,
  } = props;
  const [passwordReset, setPasswordReset] = useState(false);
  const openReset = () => setPasswordReset(true);
  const closeReset = () => setPasswordReset(false);
  return (
    <Box bg={colors.white} padding={30} shadow={boxShadows.selago} mt={20}>
      {PasswordComponent && (
        <PasswordComponent
          userId={userId}
          visible={passwordReset}
          onClose={closeReset}
          formatMessage={formatMessage}
        />
      )}
      <H2 mb={20}>
        <FormattedMessage {...messages.header} />
      </H2>
      <Row display="flex" justify="between" align="center">
        {AvatarComponent && (
          <div>
            <AvatarComponent userId={userId} />
          </div>
        )}
        {DeactivationComponent && (
          <div>
            <DeactivationComponent userId={userId} />
          </div>
        )}
      </Row>
      <Row mt={50}>
        {FullNameComponent && (
          <FullNameComponent userId={userId} formatMessage={formatMessage} />
        )}
      </Row>
      <StyledRow width="100%" align="start" justify="start">
        {TimezoneComponent && (
          <StyledTimezoneBox>
            <TimezoneComponent userId={userId} formatMessage={formatMessage} />
          </StyledTimezoneBox>
        )}
      </StyledRow>
      <StyledRow width="100%" align="start" justify="start">
        {PhoneNumberComponent && (
          <WrappedPhoneNumberForm
            userId={userId}
            formatMessage={formatMessage}
          />
        )}
      </StyledRow>
      <StyledRow width="100%" align="start" justify="start">
        {CatMhSettingsComponent && <CatMhSettingsComponent />}
      </StyledRow>
      <StyledRow width="100%" align="center" justify="end">
        {PasswordComponent && (
          <Column width="33%" align="center">
            <TextButton
              onClick={openReset}
              whiteSpace="nowrap"
              fontWeight="bold"
              fontSize={14}
              color={themeColors.secondary}
            >
              <FormattedMessage {...messages.changePassword} />
            </TextButton>
          </Column>
        )}
      </StyledRow>
    </Box>
  );
};

Profile.propTypes = {
  intl: PropTypes.shape(IntlShape),
  userId: PropTypes.string,
  PasswordComponent: PropTypes.object,
  AvatarComponent: PropTypes.object,
  FullNameComponent: PropTypes.object,
  EmailComponent: PropTypes.object,
  TimezoneComponent: PropTypes.object,
  DeactivationComponent: PropTypes.object,
  PhoneNumberComponent: PropTypes.object,
  CatMhSettingsComponent: PropTypes.object,
};

Profile.defaultProps = {
  PasswordComponent: WrappedPasswordForm,
  AvatarComponent: WrappedAvatarForm,
  FullNameComponent: WrappedFullNameForm,
  TimezoneComponent: WrappedTimezoneForm,
  PhoneNumberComponent: WrappedPhoneNumberForm,
  DeactivationComponent: null,
  CatMhSettingsComponent: null,
};

export default injectIntl(Profile);
