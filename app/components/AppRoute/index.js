import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Navbar from 'components/Navbar';
import {
  makeSelectIsLoggedIn,
  makeSelectUser,
  logOut,
} from '../../global/reducers/auth';

class AppRoute extends Route {
  render() {
    const { protectedRoute, isLoggedIn, user, logOut: logOutCall } = this.props;
    if (protectedRoute && !isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (isLoggedIn && user) {
      return (
        <>
          <Navbar user={user} logOut={logOutCall} />
          <div style={{ marginTop: 70 }}>{super.render()}</div>
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
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  logOut,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AppRoute);
