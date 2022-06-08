import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-grid-system';

import { makeSelectUser, REDIRECT_QUERY_KEY } from 'global/reducers/auth';
import { RolePermissions } from 'models/User/RolePermissions';
import { arraysOverlap } from 'utils/arrayUtils';
import LocalStorageService from 'utils/localStorageService';

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
      },
    } = this;

    const render = () => (
      <>
        {!disableQuickExit && user?.quickExitEnabled && (
          <QuickExit beforeQuickExit={LocalStorageService.clearUserData} />
        )}
        {super.render()}
      </>
    );

    const rolePermissions = RolePermissions(user?.roles);

    if (!protectedRoute) {
      return render();
    }
    if (!user || !user.roles) {
      const queryParams = new URLSearchParams(location.search);

      queryParams.append(
        REDIRECT_QUERY_KEY,
        encodeURIComponent(location.pathname),
      );

      if (location.pathname === '/') return <Redirect to="/login" />;

      return <Redirect to={`/no-access?${queryParams.toString()}`} />;
    }

    if (user && arraysOverlap(allowedRoles, user.roles)) {
      const isSidebarVisible =
        Boolean(sidebarProps) && rolePermissions.canDisplayLeftSidebar;

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
                >
                  {render()}
                </MainAppContainer>
              </Col>
            </RowBelowNavbar>
          </PageContainer>
        </>
      );
    }

    if (user && !allowedRoles.includes(user.roles[0]))
      return <Redirect to="/no-access" />;

    return render();
  }
}

AppRoute.propTypes = {
  protectedRoute: PropTypes.bool,
  logOut: PropTypes.func,
  disableQuickExit: PropTypes.bool,
};

AppRoute.defaultProps = {
  protectedRoute: false,
  allowedRoles: [],
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AppRoute);
