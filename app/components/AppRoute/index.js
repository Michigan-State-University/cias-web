import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-grid-system';

import {
  canDisplayLeftSidebar,
  canUseQuickExit,
} from 'models/User/RolesManager';

import { arraysOverlap } from 'utils/arrayUtils';
import LocalStorageService from 'utils/localStorageService';
import { getRedirectPathFromQueryParams } from 'utils/router';

import { makeSelectUser } from 'global/reducers/auth';
import { makeSelectNavbarHeight } from 'global/reducers/globalState';
import { RoutePath, REDIRECT_QUERY_KEY } from 'global/constants';

import Sidebar from 'containers/Sidebar';
import Navbar from 'containers/Navbar';
import QuickExit from 'components/QuickExit';

import { MainAppContainer, PageContainer, RowBelowNavbar } from './styled';

class AppRoute extends Route {
  render() {
    const {
      props: {
        protectedRoute,
        allowedRoles,
        user,
        navbarProps,
        sidebarProps,
        computedMatch,
        location,
        disableQuickExit,
        unauthorizedUsersOnly,
        navbarHeight,
      },
    } = this;

    const render = () => (
      <>
        {!disableQuickExit &&
          user?.quickExitEnabled &&
          canUseQuickExit(user?.roles) && (
            <QuickExit beforeQuickExit={LocalStorageService.clearUserData} />
          )}
        {super.render()}
      </>
    );

    if (user && unauthorizedUsersOnly) {
      const redirectPath = getRedirectPathFromQueryParams(location.search);
      return <Redirect to={redirectPath} />;
    }

    if (!protectedRoute) {
      return render();
    }

    if (!user || !user.roles) {
      const queryParams = new URLSearchParams(location.search);

      queryParams.append(
        REDIRECT_QUERY_KEY,
        encodeURIComponent(location.pathname),
      );

      if (location.pathname === RoutePath.DASHBOARD)
        return <Redirect to={`${RoutePath.LOGIN}${location.search}`} />;

      return (
        <Redirect to={`${RoutePath.FORBIDDEN}?${queryParams.toString()}`} />
      );
    }

    if (user && arraysOverlap(allowedRoles, user.roles)) {
      const isSidebarVisible =
        Boolean(sidebarProps) && canDisplayLeftSidebar(user?.roles);

      return (
        <>
          <PageContainer fluid>
            <Row nogutter>
              <Navbar
                navbarProps={navbarProps}
                match={computedMatch}
                location={location}
              />
            </Row>
            <RowBelowNavbar nogutter>
              {isSidebarVisible && (
                <Col width="content">
                  <Sidebar
                    sidebarProps={sidebarProps}
                    match={computedMatch}
                    location={location}
                  />
                </Col>
              )}
              <Col>
                <MainAppContainer
                  id="main-app-container"
                  $isSidebarVisible={isSidebarVisible}
                  $navbarHeight={navbarHeight}
                >
                  {render()}
                </MainAppContainer>
              </Col>
            </RowBelowNavbar>
          </PageContainer>
        </>
      );
    }

    if (user && !arraysOverlap(allowedRoles, user.roles))
      return <Redirect to={RoutePath.FORBIDDEN} />;

    return render();
  }
}

AppRoute.propTypes = {
  protectedRoute: PropTypes.bool,
  logOut: PropTypes.func,
  disableQuickExit: PropTypes.bool,
  navbarHeight: PropTypes.number,
};

AppRoute.defaultProps = {
  protectedRoute: false,
  allowedRoles: [],
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  navbarHeight: makeSelectNavbarHeight(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AppRoute);
