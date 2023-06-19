import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-grid-system';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useLocation } from 'react-router-dom';

import { makeSelectUser } from 'global/reducers/auth';
import { RoutePath } from 'global/constants';

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
  authUser: { roles },
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const buttonMessage = useMemo(() => {
    if (queryParams.has('teamId'))
      return <FormattedMessage {...messages.backToTeamDetails} />;

    if (userId) return <FormattedMessage {...messages.backToUsers} />;

    return <FormattedMessage {...messages.back} />;
  }, [roles, userId]);

  const redirectUrl = useMemo(() => {
    if (queryParams.has('teamId')) return `/teams/${queryParams.get('teamId')}`;

    if (userId) return '/users';

    return RoutePath.DASHBOARD;
  }, [roles, userId]);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <StyledBox height="100%" width="100%">
        <BackButton link to={redirectUrl}>
          {buttonMessage}
        </BackButton>
        <H1 mt={16} mb={24}>
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
  intl: PropTypes.shape(IntlShape),
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

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo, injectIntl)(AccountSettings);
