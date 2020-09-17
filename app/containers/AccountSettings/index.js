/**
 *
 * AccountSettings
 *
 */

import React, { Fragment, useState } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import Box from 'components/Box';
import Row from 'components/Row';
import BackButton from 'components/BackButton';
import H1 from 'components/H1';

import { colors, themeColors, boxShadows } from 'theme';
import TimezoneForm from 'containers/AccountSettings/Containers/TimezoneForm';
import messages from './messages';
import FullNameForm from './Containers/FullNameForm';
import PasswordForm from './Containers/PasswordForm';
import AvatarForm from './Containers/AvatarForm';
import EmailForm from './Containers/EmailForm';

import {
  StyledBox,
  StyledColumn,
  StyledRow,
  StyledTextButton,
  StyledInputBox,
} from './styled';

const AccountSettings = ({ intl: { formatMessage } }) => {
  const [passwordReset, setPasswordReset] = useState(false);
  const openReset = () => setPasswordReset(true);
  const closeReset = () => setPasswordReset(false);
  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <PasswordForm
        visible={passwordReset}
        onClose={closeReset}
        formatMessage={formatMessage}
      />
      <StyledBox height="100%" width="100%">
        <Row>
          <BackButton to="/">
            <FormattedMessage {...messages.back} />
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
          <Row>
            <AvatarForm />
          </Row>
          <Row mt={50}>
            <FullNameForm formatMessage={formatMessage} />
          </Row>
          <StyledRow width="100%" align="center" justify="end">
            <StyledInputBox width="50%" mr={20}>
              <EmailForm formatMessage={formatMessage} />
            </StyledInputBox>
            <StyledInputBox>
              <TimezoneForm formatMessage={formatMessage} />
            </StyledInputBox>
            <Box mb={10}>
              <StyledTextButton
                onClick={openReset}
                whiteSpace="nowrap"
                fontWeight="bold"
                fontSize={14}
                color={themeColors.secondary}
              >
                <FormattedMessage {...messages.changePassword} />
              </StyledTextButton>
            </Box>
          </StyledRow>
        </StyledColumn>
      </StyledBox>
    </Fragment>
  );
};

AccountSettings.propTypes = {
  intl: intlShape,
};

export default injectIntl(AccountSettings);
