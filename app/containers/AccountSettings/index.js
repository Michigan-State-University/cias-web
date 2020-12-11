import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-grid-system';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import BackButton from 'components/BackButton';
import H1 from 'components/H1';
import Profile from './components/Profile';

import NotificationsSettings from './components/NotificationsSettings';
import messages from './messages';
import { StyledBox } from './styled';

function AccountSettings({
  intl: { formatMessage },
  userId,
  formComponents,
  ProfileComponent,
  NotificationsComponent,
}) {
  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <StyledBox height="100%" width="100%">
        <BackButton to={userId ? '/users' : '/'}>
          {userId && <FormattedMessage {...messages.backToUsers} />}
          {!userId && <FormattedMessage {...messages.back} />}
        </BackButton>
        <H1 my={25}>
          <FormattedMessage {...messages.header} />
        </H1>
        <Row>
          {ProfileComponent && (
            <Col xl={7} lg={12}>
              <ProfileComponent userId={userId} {...formComponents} />
            </Col>
          )}
          {NotificationsComponent && (
            <Col xl={5} lg={12}>
              <NotificationsComponent />
            </Col>
          )}
        </Row>
      </StyledBox>
    </>
  );
}

AccountSettings.propTypes = {
  intl: intlShape,
  userId: PropTypes.string,
  formComponents: PropTypes.object,
  ProfileComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  NotificationsComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

AccountSettings.defaultProps = {
  ProfileComponent: Profile,
  NotificationsComponent: NotificationsSettings,
};

export default injectIntl(AccountSettings);
