import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Navbar from 'containers/Navbar';
import { makeSelectUser } from 'global/reducers/auth';
import { MainAppContainer } from './styled';

class AppRoute extends Route {
  render() {
    const {
      protectedRoute,
      allowedRoles,
      user,
      navbarProps,
      computedMatch,
      location,
    } = this.props;
    console.log(protectedRoute, computedMatch, user);
    if (!protectedRoute) {
      return super.render();
    }
    if (!user || !user.roles) {
      return <Redirect to="/login" />;
    }
    if (user && allowedRoles.includes(user.roles[0])) {
      return (
        <>
          <Navbar
            navbarProps={navbarProps}
            match={computedMatch}
            location={location}
          />
          <MainAppContainer id="main-app-container">
            {super.render()}
          </MainAppContainer>
        </>
      );
    }
    return super.render();
  }
}

AppRoute.propTypes = {
  protectedRoute: PropTypes.bool,
  logOut: PropTypes.func,
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
