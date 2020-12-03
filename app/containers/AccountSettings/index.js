/**
 *
 * AccountSettings
 *
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import Row from 'components/Row';
import BackButton from 'components/BackButton';
import H1 from 'components/H1';
import Column from 'components/Column';
import { colors, themeColors, boxShadows } from 'theme';
import messages from './messages';

import WrappedFullNameForm from './Containers/WrappedFullNameForm';
import WrappedPasswordForm from './Containers/WrappedPasswordForm';
import WrappedAvatarForm from './Containers/WrappedAvatarForm';
import WrappedTimezoneForm from './Containers/WrappedTimezoneForm';

import {
  StyledBox,
  StyledColumn,
  StyledRow,
  TextButton,
  StyledTimezoneBox,
} from './styled';

const AccountSettings = props => {
  const {
    intl: { formatMessage },
    PasswordComponent,
    AvatarComponent,
    FullNameComponent,
    TimezoneComponent,
    DeactivationComponent,
    userId,
  } = props;
  const [passwordReset, setPasswordReset] = useState(false);
  const openReset = () => setPasswordReset(true);
  const closeReset = () => setPasswordReset(false);
  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      {PasswordComponent && (
        <PasswordComponent
          userId={userId}
          visible={passwordReset}
          onClose={closeReset}
          formatMessage={formatMessage}
        />
      )}
      <StyledBox height="100%" width="100%">
        <Row>
          <BackButton to={userId ? '/users' : '/'}>
            {userId && <FormattedMessage {...messages.backToUsers} />}
            {!userId && <FormattedMessage {...messages.back} />}
          </BackButton>
        </Row>
        <H1 my={25}>
          <FormattedMessage {...messages.header} />
        </H1>
        <StyledColumn
          bg={colors.white}
          xlg={7}
          borderRadius={5}
          shadow={boxShadows.selago}
        >
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
              <FullNameComponent
                userId={userId}
                formatMessage={formatMessage}
              />
            )}
          </Row>
          <StyledRow width="100%" align="center" justify="start">
            {TimezoneComponent && (
              <StyledTimezoneBox>
                <TimezoneComponent
                  userId={userId}
                  formatMessage={formatMessage}
                />
              </StyledTimezoneBox>
            )}
            {PasswordComponent && (
              <Column mb={10} width="50%" align="center">
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
        </StyledColumn>
      </StyledBox>
    </Fragment>
  );
};

AccountSettings.propTypes = {
  intl: intlShape,
  userId: PropTypes.string,
  PasswordComponent: PropTypes.object,
  AvatarComponent: PropTypes.object,
  FullNameComponent: PropTypes.object,
  EmailComponent: PropTypes.object,
  TimezoneComponent: PropTypes.object,
  DeactivationComponent: PropTypes.object,
};

AccountSettings.defaultProps = {
  PasswordComponent: WrappedPasswordForm,
  AvatarComponent: WrappedAvatarForm,
  FullNameComponent: WrappedFullNameForm,
  TimezoneComponent: WrappedTimezoneForm,
  DeactivationComponent: null,
};

export default injectIntl(AccountSettings);
