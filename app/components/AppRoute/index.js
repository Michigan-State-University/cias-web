import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Navbar from 'containers/Navbar';
import { elements } from 'theme';
import { makeSelectIsLoggedIn } from '../../global/reducers/auth';

class AppRoute extends Route {
  render() {
    const { protectedRoute, isLoggedIn } = this.props;
    if (protectedRoute && !isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (isLoggedIn) {
      return (
        <>
          <Navbar {...this.props} />
          <div
            style={{
              marginTop: 70,
              height: `calc(100vh - ${elements.navbarHeight}px)`,
            }}
          >
            {super.render()}
          </div>
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
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AppRoute);
