import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-grid-system';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import BackButton from 'components/BackButton';
import H1 from 'components/H1';
import { Roles } from 'models/User/UserRoles';
import { makeSelectUser } from 'global/reducers/auth';

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
  authUser: { roles },
}) {
  const isTeamAdmin = roles.includes(Roles.teamAdmin);

  const buttonMessage = useMemo(() => {
    if (isTeamAdmin && userId)
      return <FormattedMessage {...messages.backToMyTeam} />;

    if (userId) return <FormattedMessage {...messages.backToUsers} />;

    return <FormattedMessage {...messages.back} />;
  }, [roles, userId]);

  const redirectUrl = useMemo(() => {
    if (isTeamAdmin && userId) return '/my-team';

    if (userId) return '/users';

    return '/';
  }, [roles, userId]);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <StyledBox height="100%" width="100%">
        <BackButton to={redirectUrl}>{buttonMessage}</BackButton>
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
  roles: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.shape({ roles: PropTypes.arrayOf(PropTypes.string) }),
};

AccountSettings.defaultProps = {
  ProfileComponent: Profile,
  NotificationsComponent: NotificationsSettings,
};

const mapStateToProps = createStructuredSelector({
  authUser: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(AccountSettings);
